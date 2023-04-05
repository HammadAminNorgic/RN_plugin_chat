import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {widthPercentageToDP as wp} from './Helpers';
import ResponsiveText from './ResponsiveText';
// import Fonts from '../themes/Fonts';
// import Video from 'react-native-video';
// import VideoPlayer from 'react-native-video-player';
// import {parse} from 'react-native-svg';

class SinglePostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOptionOpen: false,
      showVideoView: true,
      hideViews: false,
      viewAllComments: false,
      isLiked: true,
    };
  }
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
      commentsArray,
    } = this.props;

    return (
      <ScrollView
        ref={(ref) => (this.scrollView = ref)}
        onContentSizeChange={() => {
          if (this.state.viewAllComments) {
            this.scrollView.scrollToEnd({animated: true});
          } else {
            this.scrollView.scrollTo({y: 0});
          }
        }}
        nestedScrollEnabled={true}
        contentContainerStyle={{flexGrow: 1}}>
        <View>
          {isOptionOpen && (
            <View style={styles.options}>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => this.setState({isOptionOpen: false})}>
                <ResponsiveText style={styles.optionText}>
                  Follow
                </ResponsiveText>
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
              <TouchableOpacity>
                <Image
                  source={{uri: profile_image}}
                  style={styles.posterHeaderProfileImage}
                />
              </TouchableOpacity>
              <View style={styles.nameContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity style={{flexDirection: 'row'}}>
                    <ResponsiveText style={styles.name}>
                      {user_name}
                    </ResponsiveText>
                  </TouchableOpacity>
                  <ResponsiveText style={styles.userName}>
                    @JohnS
                  </ResponsiveText>

                  {isVerified && (
                    <Image
                      source={require('../assets/icons/verification_mark.png')}
                      style={styles.verifyMark}
                    />
                  )}
                </View>
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
              <>
                <Image source={{uri: post_url}} style={styles.postImage} />
              </>
            )}

            {post_type === 'Video' && (
              <>
                <View style={styles.videoContainer}>
                  {/* <VideoPlayer
                    video={{
                      uri: post_url,
                    }}
                    autoplay={false}
                    disableSeek={true}
                    videoWidth={wp('100')}
                    videoHeight={400}
                    pauseOnPress={true}
                    thumbnail={{
                      uri: 'https://source.unsplash.com/1024x768/?boy',
                    }}
                    endWithThumbnail={true}
                    resizeMode={'cover'}
                    hideControlsOnStart={true}
                    controlsTimeout={5000}
                    customStyles={
                      {
                        // controls: {opacity: 0},
                      }
                    }

                    // onPlayPress={()=>alert('hi')}
                  /> */}
                </View>
                {/*{this.state.hideViews == false && (*/}
                {/*  <View style={styles.postViewContainer}>*/}
                {/*    <ResponsiveText style={styles.viewAndTime}>*/}
                {/*      {views} {isLive ? 'Viewers' : 'Views'}*/}
                {/*    </ResponsiveText>*/}
                {/*    <ResponsiveText*/}
                {/*      style={isLive ? styles.liveText : styles.viewAndTime}>*/}
                {/*      {isLive ? 'Live' : duration}*/}
                {/*    </ResponsiveText>*/}
                {/*  </View>*/}
                {/*)}*/}
              </>
            )}
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
                    {this.state.isLiked?parseInt(likes)+1:likes}
                  </ResponsiveText>
                </TouchableOpacity>
              </View>
              <View style={styles.commentContainer}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Comments')}
                  style={{padding: 5}}>
                  <Image
                    source={require('../assets/icons/comment.png')}
                    style={styles.commentIcon}
                  />
                </TouchableOpacity>
                <ResponsiveText style={styles.commentCount}>
                  {comments}
                </ResponsiveText>
              </View>
              {post_type === 'Video' && (
                <View style={styles.commentContainer}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Viewers')}
                    style={{padding: 5}}>
                    <Image
                      source={require('../assets/icons/eye.png')}
                      style={[styles.commentIcon, {tintColor: '#909090'}]}
                    />
                  </TouchableOpacity>
                  <ResponsiveText style={styles.commentCount}>
                    {comments}
                  </ResponsiveText>
                </View>
              )}

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
                onPress={() =>
                  this.setState((prev) => ({
                    viewAllComments: !prev.viewAllComments,
                  }))
                }>
                <ResponsiveText style={styles.viewAllComments}>
                  {this.state.viewAllComments
                    ? 'Show few Comments'
                    : `View all ${commentsArray.length} comments`}
                </ResponsiveText>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity />
          <FlatList
            data={
              this.state.viewAllComments
                ? commentsArray
                : commentsArray.slice(
                    commentsArray.length - 3,
                    commentsArray.length,
                  )
            }
            contentContainerStyle={{
              marginHorizontal: wp('5'),
              // paddingVertical: wp('2'),
            }}
            renderItem={({item}) => {
              return (
                <View style={styles.commentTextContainer}>
                  <TouchableOpacity>
                    <ResponsiveText style={styles.commentedBY}>
                      {item.commented_by}
                    </ResponsiveText>
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row', maxWidth: wp('40')}}>
                    <TouchableOpacity>
                      <ResponsiveText style={styles.taggedUser}>
                        @{item.taggedUser}
                      </ResponsiveText>
                    </TouchableOpacity>
                    <ResponsiveText style={styles.commentText}>
                      {item.commentText}
                    </ResponsiveText>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

export default SinglePostCard;

const styles = {
  container: {
    flex: 1,
    marginBottom: wp('7'),
    backgroundColor: 'white',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: wp('12'),
    paddingHorizontal: wp('5.5'),
  },
  posterHeaderProfileImage: {
    height: wp('10'),
    width: wp('10'),
    borderRadius: wp('10'),
    backgroundColor: '#F3F3F3',
  },
  threeDots: {
    height: wp('6'),
    width: wp('6'),
    resizeMode: 'contain',
    padding: 10,
  },
  nameContainer: {
    paddingLeft: wp('2'),
    paddingTop: wp('2'),
    alignItems: 'center',
  },
  name: {
    fontSize: 4.6,
    // fontFamily: Fonts.SourceSansProSemiBold,
    marginBottom: wp('1'),
    color: '#181818',
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
    height: 400,
  },
  postImage: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F3F3F3',
    // resizeMode: 'contain',
  },
  videoContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#AFB1B3',
  },
  options: {
    width: wp('34'),
    backgroundColor: 'white',
    borderRadius: wp('2'),
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
    borderBottomColor: '#CBCBCB',
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
    // fontFamily: Fonts.RobotoBold,
    marginLeft: wp('1.2'),
    fontSize: 3.3,
  },
  descriptionTextContainer: {
    flexWrap: 'wrap',
  },
  descriptionText: {
    width: wp('89'),
    // fontFamily: Fonts.SourceSansProRegular,
    fontSize: wp('4.1'),
    color: '#3A3A3A',
    lineHeight: wp('6'),
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  userName: {
    fontSize: 3.5,
    marginLeft: wp('2'),
    // fontFamily: Fonts.SourceSansProSemiBold,
    color: '#767676',
    maxWidth: wp('20'),
  },
  viewAllComments: {
    color: '#3A3A3A',
    opacity: 0.5,
    fontSize: 3.5,
    paddingVertical: wp('1.5'),
    // fontFamily: Fonts.SourceSansProRegular,
  },
  commentTextContainer: {
    flexDirection: 'row',
    marginBottom: wp('1.5'),
  },
  commentedBY: {
    color: '#3A3A3A',
    opacity: 0.5,
    marginRight: wp('1'),
    // fontFamily: Fonts.SourceSansProRegular,
  },
  taggedUser: {
    color: '#0089FF',
    marginRight: wp('1'),
    // fontFamily: Fonts.SourceSansProRegular,
  },
  commentText: {
    // fontFamily: Fonts.SourceSansProRegular,
    color: '#3A3A3A',
  },
};
