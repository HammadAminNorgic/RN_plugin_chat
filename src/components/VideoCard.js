import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {widthPercentageToDP as wp} from './Helpers';
import ResponsiveText from './ResponsiveText';
// import Fonts from '../themes/Fonts';

class VideoCard extends React.Component {
  render() {
    const {
      thumbnail,
      duration,
      title,
      time,
      comments,
      likes,
      views,
    } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('SinglePost', {
              mediaType: 'Video',
              postBodyData:
                'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            })
          }
          style={styles.thumbnailContainer}>
          <Image
            source={
              thumbnail
                ? {uri: thumbnail}
                : require('../assets/images/placeholderthumbnail.jpg')
            }
            style={styles.thumbnail}
          />
          <ResponsiveText style={styles.duration}>{duration}</ResponsiveText>
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('SinglePost', {

                mediaType: 'Video',
                postBodyData: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

              })
            }>
            <ResponsiveText style={styles.titleText}>
              {title.length < 50 ? title : `${title.substring(0, 50)}...`}
            </ResponsiveText>
          </TouchableOpacity>
          <ResponsiveText style={styles.time}>{time}</ResponsiveText>
          <View style={styles.likeCommentContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LikedBy')}>
              <View style={styles.likeContainer}>
                <Image
                  source={require('../assets/icons/heart.png')}
                  style={styles.heart}
                />
                <ResponsiveText style={styles.like}>{likes}</ResponsiveText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Comments')}>
              <View style={styles.likeContainer}>
                <Image
                  source={require('../assets/icons/comment.png')}
                  style={styles.heart}
                />
                <ResponsiveText style={styles.like}>{comments}</ResponsiveText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Viewers')}>
              <View style={styles.likeContainer}>
                <ResponsiveText style={styles.like}>
                  {views}. views
                </ResponsiveText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default VideoCard;

const styles = {
  container: {
    // height: wp('30'),
    marginBottom: wp('4'),
    flexDirection: 'row',
  },
  thumbnailContainer: {
    height: wp('26'),
    width: wp('40'),
    borderRadius: wp('2'),
    backgroundColor: 'black',
  },
  thumbnail: {
    height: wp('26'),
    width: wp('40'),
    borderRadius: wp('2'),
    backgroundColor: '#F2F2F2',
    // resizeMode:'contain'
  },
  duration: {
    backgroundColor: '#3A3A3A',
    color: 'white',
    position: 'absolute',
    bottom: wp('1.5'),
    right: wp('2'),
    paddingHorizontal: wp('2'),
    paddingVertical: wp('1'),
    borderRadius: wp('1.5'),
    fontSize: 2.8,
  },
  detailsContainer: {
    flexGrow: 1,
    marginLeft: wp('2.5'),
    paddingVertical: wp('0.3'),
    justifyContent: 'space-between',
    maxWidth: wp('50'),
  },
  titleText: {
    // maxHeight: wp('9'),
    color: '#3A3A3A',
    fontSize: 3.9,
    // fontFamily: Fonts.SourceSansProRegular,
  },
  time: {
    maxHeight: wp('9'),
    color: '#9D9D9D',
    fontSize: 3.2,
    // fontFamily: Fonts.SourceSansProRegular,
  },
  likeCommentContainer: {
    height: wp('8'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heart: {
    height: wp('4'),
    width: wp('4'),
    resizeMode: 'contain',
    marginRight: wp('1.5'),
  },
  like: {
    // fontFamily: Fonts.SourceSansProSemiBold,
    color: '#8A8A8A',
    maxWidth: wp('20'),
  },
};
