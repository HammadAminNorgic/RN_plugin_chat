import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity,Image} from 'react-native';
import {widthPercentageToDP as wp} from './Helpers';
// import {Image} from 'react-native-animatable';
import ResponsiveText from './ResponsiveText';
// import Fonts from '../themes/Fonts';
import SubReplyCard from './SubReplyCard';

class CommentsReplyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.props.liked,
      openSubReply: false,
      likes: this.props.likes,
    };
  }

  subReply = (item, subitem) => {
    this.props.trackId(item, subitem);
  };

  render() {
    const {name, avatar, username, reply, subReplies} = this.props;
    const {liked, likes} = this.state;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.ImageContainer}>
            <ImageBackground
              source={require('../assets/images/placeholder.png')}
              style={styles.placeholderImage}>
              <Image source={{uri: avatar}} style={styles.profileImage} />
            </ImageBackground>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.replyHeader}>
              <ResponsiveText style={styles.name}>{name}</ResponsiveText>
              <ResponsiveText style={styles.userName}>
                @{username}
              </ResponsiveText>
            </View>
            <ResponsiveText style={styles.replyText}>{reply}</ResponsiveText>
            {!this.props.hideReply && (
              <TouchableOpacity
                onPress={() => this.subReply(this.props.item, null)}
                style={styles.replyIconContainer}>
                <Image
                  source={require('../assets/icons/comment.png')}
                  style={styles.commentIcon}
                />
                <ResponsiveText style={styles.replyLabel}>Reply</ResponsiveText>
              </TouchableOpacity>
            )}
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
              {liked ? parseInt(likes) + 1 : likes}
            </ResponsiveText>
          </TouchableOpacity>
        </View>
        {subReplies.length > 0 &&
          !this.props.hideReply &&
          subReplies.map((item) => (
            <SubReplyCard
              item={item}
              subReply={(item) => this.subReply(this.props.item, item)}
            />
          ))}
      </>
    );
  }
}

export default CommentsReplyCard;

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
  },
};
