import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {widthPercentageToDP as wp} from './Helpers';
import ResponsiveText from './ResponsiveText';
// import Fonts from '../themes/Fonts';
// import Video from 'react-native-video';
// import VideoPlayer from 'react-native-video-player';

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOptionOpen: false,
      showVideoView: true,
      hideViews: false,
      isLiked: true,
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.postMenu !== prevProps.postMenu) {
      this.toggleMenu();
    }
  }
  toggleMenu = () => {
    this.setState({
      isOptionOpen: false,
    });
  };

  render() {
    const {isOptionOpen} = this.state;
    const {
      profile_image,
      user_name,
      isVerified,
      time,
      likes,
      comments,
      description,
      post_type,
      post_url,
      views,
      duration,
      isLive,
      thumbnail,
      navigation,
    } = this.props;
    return (
      <View style={styles.container}>
        {isOptionOpen && (
          <View style={styles.options}>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => this.setState({isOptionOpen: false})}>
              <ResponsiveText style={styles.optionText}>Follow</ResponsiveText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => this.setState({isOptionOpen: false})}>
              <ResponsiveText style={styles.optionText}>
                Report post
              </ResponsiveText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionItem, {borderBottomWidth: 0}]}
              onPress={() => this.setState({isOptionOpen: false})}>
              <ResponsiveText style={styles.optionText}>Share</ResponsiveText>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.postHeader}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('userProfile', {
                  notMe: true,
                })
              }
            >
              <Image
                source={{uri: profile_image}}
                style={styles.posterHeaderProfileImage}
              />
              <View style={styles.plusContainer}>
                <Image
                  source={require('../assets/icons/plus.png')}
                  style={styles.plusIcon}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.nameContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('userProfile', {
                      notMe: true,
                    })
                  }
                  style={{flexDirection: 'row'}}>
                  <ResponsiveText style={styles.name}>
                    {user_name}
                  </ResponsiveText>
                </TouchableOpacity>

                {isVerified && (
                  <Image
                    source={require('../assets/icons/verification_mark.png')}
                    style={styles.verifyMark}
                  />
                )}
              </View>
              <ResponsiveText style={styles.time}>{time}</ResponsiveText>
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.setState((prev) => ({isOptionOpen: !prev.isOptionOpen}))
            }>
            <Image
              source={require('../assets/icons/three_dots.png')}
              style={styles.threeDots}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.postBody}>
          {post_type === 'Image' && (
            <Image source={{uri: post_url}} style={styles.postImage} />
          )}

          {/* {post_type === 'Video' && (
            <>
              <TouchableWithoutFeedback
                onPress={() => {
                  isLive
                    ? this.props.navigation.navigate('LiveStream', {
                        myStream: false,
                      })
                    : null;
                }}
                style={styles.videoContainer}>
                <VideoPlayer
                  video={{
                    uri: post_url,
                  }}
                  autoplay={false}
                  disableSeek={true}
                  videoWidth={wp('100')}
                  videoHeight={wp('65')}
                  pauseOnPress={true}
                  thumbnail={{
                    uri: thumbnail,
                  }}
                  endWithThumbnail={true}
                  resizeMode={'cover'}
                  hideControlsOnStart={true}
                  controlsTimeout={200}
                  customStyles={{
                    controls: {opacity: 0},
                  }}

                  // onPlayPress={()=>alert('hi')}
                />
              </TouchableWithoutFeedback>
              {this.state.hideViews == false && (
                <View style={styles.postViewContainer}>
                  <ResponsiveText style={styles.viewAndTime}>
                    {views} {isLive ? 'Viewers' : 'Views'}
                  </ResponsiveText>
                  <ResponsiveText
                    style={isLive ? styles.liveText : styles.viewAndTime}>
                    {isLive ? 'Live' : duration}
                  </ResponsiveText>
                </View>
              )}
            </>
          )} */}
        </View>
        <View style={styles.postDescription}>
          <View style={styles.likesCommentShareContainer}>
            <View style={styles.likeContainer}>
              <TouchableOpacity
                onPress={() =>
                  this.setState((prev) => ({isLiked: !prev.isLiked}))
                }
                style={{padding: 5}}>
                <Image
                  source={
                    this.state.isLiked
                      ? require('../assets/icons/heart.png')
                      : require('../assets/icons/heart_outline.png')
                  }
                  style={styles.heartIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('LikedBy')}>
                <ResponsiveText style={styles.likesCount}>
                  {this.state.isLiked ? parseInt(likes) + 1 : likes}
                </ResponsiveText>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Comments')}
              style={styles.commentContainer}>
              <Image
                source={require('../assets/icons/comment.png')}
                style={[styles.commentIcon, {padding: 5}]}
              />

              <ResponsiveText style={styles.commentCount}>
                {comments}
              </ResponsiveText>
            </TouchableOpacity>
            <TouchableOpacity style={{padding: 5}}>
              <Image
                source={require('../assets/icons/share.png')}
                style={styles.heartIcon}
              />
            </TouchableOpacity>

            {/*<ResponsiveText>221</ResponsiveText>*/}
          </View>
          <View style={styles.descriptionTextContainer}>
            <Text style={styles.descriptionText}>{description}</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Comments')}>
              <Text
                style={[
                  styles.descriptionText,
                  {color: '#BDBDBD', fontSize: wp(3.2), marginTop: 5},
                ]}>
                View all Comments
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default PostCard;

const styles = {
  container: {
    flex: 1,
    marginBottom: wp('7'),
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: wp('18'),
    paddingHorizontal: wp('5.5'),
  },
  posterHeaderProfileImage: {
    height: wp('14'),
    width: wp('14'),
    borderRadius: wp('14'),
    backgroundColor: '#F3F3F3',
  },
  threeDots: {
    height: wp('5'),
    width: wp('5'),
    resizeMode: 'contain',
    padding: 8,
  },
  nameContainer: {
    paddingLeft: wp('2'),
    paddingTop: wp('2'),
  },
  name: {
    fontSize: 4.7,
    // fontFamily: Fonts.SourceSansProRegular,
    marginBottom: wp('0.5'),
    color: 'black',
  },
  time: {
    fontSize: 3,
    // fontFamily: Fonts.SourceSansProRegular,
    color: '#767676',
  },
  verifyMark: {
    height: wp('5'),
    width: wp('5'),
    resizeMode: 'contain',
    marginLeft: wp('2'),
  },
  postBody: {
    // height: wp('60'),
  },
  postImage: {
    height: wp('65'),
    width: wp('100'),
    backgroundColor: '#F3F3F3',
  },
  videoContainer: {
    backgroundColor: '#F3F3F3',
  },
  options: {
    width: wp('35'),
    backgroundColor: 'white',
    borderRadius: wp('1'),
    position: 'absolute',
    zIndex: 15,
    right: wp('5.5'),
    top: wp('6'),
    elevation: 6,
  },
  optionItem: {
    alignItems: 'center',
    paddingVertical: wp('3'),
    borderBottomWidth: wp('0.3'),
    marginHorizontal: wp('3'),
    borderBottomColor: '#D2D2D2',
    justifyContent: 'center',
  },
  optionText: {
    // fontFamily: Fonts.OpenSansRegular,
  },

  postViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5.5'),
    position: 'absolute',
    bottom: wp('3'),
    width: wp('100'),
  },
  viewAndTime: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: wp('1'),
    paddingHorizontal: wp('3'),
    borderRadius: wp('1'),
    color: 'white',
    // fontFamily: Fonts.RobotoBold,
    fontSize: 3.8,
  },
  liveText: {
    color: '#FF0000',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: wp('2'),
    borderRadius: wp('1'),

    // fontFamily: Fonts.RobotoBold,
  },
  postDescription: {
    paddingHorizontal: wp(5.5),
  },
  likesCommentShareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: wp('11.5'),
    paddingTop: 5,
  },
  likeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('4'),
  },
  heartIcon: {
    height: wp('5'),
    width: wp('5'),
    resizeMode: 'contain',
    marginLeft: -wp('1'),
  },
  likesCount: {
    // fontFamily: Fonts.RobotoBold,
    marginLeft: wp('1.2'),
    fontSize: 3.3,
    color: '#BDBDBD',
  },
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('4'),
  },
  commentIcon: {
    height: wp('5'),
    width: wp('5'),
    resizeMode: 'contain',
  },
  commentCount: {
    color: '#BDBDBD',
    // fontFamily: Fonts.RobotoBold,
    marginLeft: wp('2.5'),
    fontSize: 3.3,
  },
  descriptionTextContainer: {
    flexWrap: 'wrap',
  },
  descriptionText: {
    width: wp('89'),
    // fontFamily: Fonts.SourceSansProRegular,
    fontSize: wp('4.3'),
    color: '#4F4F4F',
    lineHeight: wp('6'),
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  plusContainer: {
    height: wp('4.5'),
    width: wp('4.5'),
    borderRadius: wp('4.5'),
    backgroundColor: '#0089FF',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: wp('3.5'),
    right: 0,
  },
  plusIcon: {
    height: wp('2.5'),
    width: wp('2.5'),
    resizeMode: 'contain',
    tintColor: 'white',
  },
};
