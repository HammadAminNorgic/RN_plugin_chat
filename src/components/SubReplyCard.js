import React from 'react';
import {View, Text, TouchableOpacity,Image} from 'react-native';
// import {} from 'react-native-animatable';
import {widthPercentageToDP as wp} from './Helpers';
import ResponsiveText from './ResponsiveText';
// import Fonts from '../themes/Fonts';
// import {parse} from 'react-native-svg';

class SubReplyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
    };
  }
  render() {
    const {item, subReply} = this.props;
    const {liked} = this.state;
    return (
      <View style={styles.subReplyContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: item.avatar}} style={styles.subReplyAvatar} />
          <View style={{marginLeft: 10, maxWidth: wp('45')}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ResponsiveText style={styles.name}>{item.name}</ResponsiveText>
              <ResponsiveText style={styles.userName}>
                @{item.username}
              </ResponsiveText>
            </View>
            <ResponsiveText style={styles.replyText}>
              {item.reply}
            </ResponsiveText>
            <TouchableOpacity
              onPress={() => subReply(this.props.item)}
              style={styles.replyIconContainer}>
              <Image
                source={require('../assets/icons/comment.png')}
                style={styles.commentIcon}
              />
              <ResponsiveText style={styles.replyLabel}>Reply</ResponsiveText>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.setState((prev) => ({liked: !prev.liked}))}
          style={styles.LikeIconContainer}>
          <Image
            source={
              liked
                ? require('../assets/icons/heart.png')
                : require('../assets/icons/heart_outline.png')
            }
            style={[styles.heart]}
          />
          <ResponsiveText style={styles.likesCount}>
            {liked ? parseInt(item.likes) + 1 : item.likes}
          </ResponsiveText>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SubReplyCard;

const styles = {
  container: {
    marginBottom: wp('3'),
    flexDirection: 'row',
    // backgroundColor: 'grey',
  },
  ImageContainer: {
    height: wp('12'),
    width: wp('12'),
    borderRadius: wp('12'),
    overflow: 'hidden',
  },
  placeholderImage: {
    height: wp('12'),
    width: wp('12'),
    borderRadius: wp('12'),
  },
  profileImage: {
    height: wp('12'),
    width: wp('12'),
    borderRadius: wp('12'),
  },
  LikeIconContainer: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    height: wp('5'),
    width: wp('5'),
    resizeMode: 'contain',
  },
  contentContainer: {
    maxWidth: '70%',
    marginLeft: wp('2'),
    paddingTop: wp('1'),
  },
  name: {
    // fontFamily: Fonts.SourceSansProRegular,
    color: 'black',
    fontSize: 4.4,
    marginRight: wp('1'),
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp('1'),
  },
  userName: {
    // fontFamily: Fonts.SourceSansProRegular,
    color: '#0089FF',
    fontSize: 3.3,
  },
  replyText: {
    // fontFamily: Fonts.SourceSansProRegular,
    fontSize: 3.3,
    color: '#828282',
  },
  replyIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp('2'),
  },
  commentIcon: {
    height: wp('3.5'),
    width: wp('3.5'),
    resizeMode: 'contain',
  },
  replyLabel: {
    // fontFamily: Fonts.OpenSansSemiBold,
    color: '#BDBDBD',
    fontSize: 2.9,
    marginLeft: wp('2'),
  },
  likesCount: {
    // fontFamily: Fonts.OpenSansSemiBold,
    color: '#BDBDBD',
    fontSize: 3.1,
  },
  subReplyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginLeft: 50,
  },
  subReplyAvatar: {
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: 'grey',
  },
};
