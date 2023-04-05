import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Container from '../../components/Container';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../components/Helpers';
import ResponsiveText from '../../components/ResponsiveText';
import * as Progress from 'react-native-progress';
// import Fonts from '../../themes/Fonts';
import InputField from '../../components/InputField';
import {Comments, followersData} from '../../components/DummyData';
// import Share from 'react-native-share';
// import StoryCommentCard from '../../components/StoryCommentCard';
import LikedByCard from '../../components/LikedByCard';
import CommentsReplyCard from '../../components/CommentsReplyCard';
import {CommentsReply} from '../../components/DummyData';

const url = 'https://awesome.contents.com/';
const title = 'Awesome Contents';
const message = 'Please check this out.';

const options = {
  title: '',
  message: '',
  url: 'jkdj',
  default: {
    title,
    subject: title,
    message: `${message}`,
    urls: [url],
  },
};

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        'https://picsum.photos/id/238/500',
        'https://picsum.photos/id/235/500',
        'https://picsum.photos/id/232/500',
      ],
      currentImage: 0,
      progress: 0,
      testPause: 0,
      timeOut: 5000,
      new: 50,
      CommentsModal: false,
      viewsModal: false,
      focusInput: false,
      loadingImage: true,
      mounted: false,
      comments: CommentsReply,
      replyText: '',
      liked: false,
      likes: 112,
    };
  }

  setInterval = () => {
    this.IntervalHandle = setInterval(() => {
      this.setState({testPause: 0, timeOut: 5000}, () => {
        clearInterval(this.test);
        this.setTest();
      });
      this.onNextPress();
    }, this.state.timeOut);
  };
  setTest = () => {
    this.test = setInterval(() => {
      this.setState((prev) => ({timeOut: prev.timeOut - 500}));
      // this.onNextPress();
    }, 500);
  };

  setProgressInterval = () => {
    this.ProgressInterval = setInterval(() => {
      this.setState((prev) => ({progress: prev.progress + 0.01}));
    }, this.state.new);
  };

  componentDidMount() {
    this.subscribe = this.props.navigation.addListener('focus', () => {
      console.log('hi');
      this.setState({mounted: true});
      this.setTest();

      this.setInterval();

      this.setProgressInterval();
      StatusBar.setHidden(true);

      // do something
    });
    const unsubscribe = this.props.navigation.addListener('blur', () => {
      this.pressIn();
      StatusBar.setHidden(false);
    });

    // Start counting when the page is loaded
  }

  componentWillUnmount() {
    clearInterval(this.ProgressInterval);
    clearInterval(this.test);
    clearInterval(this.IntervalHandle);
  }

  onNextPress = () => {
    const {images, currentImage} = this.state;

    if (currentImage + 1 < images.length) {
      this.setState(
        (prev) => ({
          currentImage: prev.currentImage + 1,
          progress: 0,
          timeOut: 5000,
          new: 50,
        }),
        () => {
          clearInterval(this.ProgressInterval);
          this.setProgressInterval();

          clearInterval(this.test);
          this.setTest();

          clearInterval(this.IntervalHandle);
          this.setInterval();
        },
      );
    } else {
      this.props.navigation.goBack();
    }
  };

  onPrevPress = () => {
    const {images, currentImage} = this.state;

    this.setState({progress: 0, timeOut: 5000, new: 50}, () => {
      clearInterval(this.ProgressInterval);
      this.setProgressInterval();

      clearInterval(this.test);
      this.setTest();

      clearInterval(this.IntervalHandle);
      this.setInterval();
    });
    if (currentImage !== 0) {
      this.setState((prev) => ({
        currentImage: prev.currentImage - 1,
      }));
    }
  };

  pressIn = () => {
    console.log('pessin');
    clearInterval(this.IntervalHandle);
    clearInterval(this.ProgressInterval);
    clearInterval(this.test);
  };

  pressOut = () => {
    console.log('pressOut');
    this.setTest();
    this.setInterval();
    this.setProgressInterval();
  };

  openCommentModal = () => {
    this.pressIn();
    this.setState({CommentsModal: true});

    setTimeout(() => {
      // this.InputFieldRef.getTInputFocus();
    }, 500);
  };

  closeCommentModal = () => {
    this.pressOut();
    this.setState({CommentsModal: false});
  };

  openViewsModal = () => {
    this.pressIn();
    this.setState({viewsModal: true});
  };

  closeViewsModal = () => {
    this.pressOut();
    this.setState({viewsModal: false});
  };

  openShareModal = () => {
    // this.pressIn();
    // Share.open(options)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     err && console.log(err);
    //   })
    //   .finally(() => {
    //     this.closeShareModal();
    //   });
  };

  closeShareModal = () => {
    // this.pressOut();
  };

  reply = () => {
    const {comments, replyText} = this.state;
    if (replyText.trim().length > 0) {
      let array = comments;
      let reply = {
        id: array.length,
        name: '_haaditariq',
        avatar: 'https://picsum.photos/id/322/100',
        username: 'haadi12',
        liked: false,
        reply: replyText,
        likes: 10,
        subReplies: [],
      };
      // array.concat(reply)
      this.setState((prev) => ({
        comments: prev.comments.concat(reply),
        replyText: '',
      }));
      setTimeout(() => {
        this.listViewRef.scrollToEnd({animated: true});
      }, 200);
    }
  };

  render() {
    // console.log(this.state.testPause, this.state.timeOut);
    const {images, currentImage} = this.state;
    return (
      <Container style={{flex: 1, backgroundColor: '#181818'}}>
        <View style={styles.header}>
          <View style={styles.profileAndNameContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.route.params && !this.props.route.params.myStory
                  ? this.props.navigation.navigate('userProfile', {
                      notMe: true,
                    })
                  : this.props.navigation.navigate('ProfileStack', {
                      notMe: false,
                    });
              }}>
              <Image
                source={require('../../assets/images/model.jpg')}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.route.params && !this.props.route.params.myStory
                  ? this.props.navigation.navigate('userProfile', {
                      notMe: true,
                    })
                  : this.props.navigation.navigate('ProfileStack');
              }}>
              <ResponsiveText style={styles.name}>
                Ellene Lambert
              </ResponsiveText>
            </TouchableOpacity>
          </View>
          <View style={styles.headerbuttons}>
            {this.props.route.params && !this.props.route.params.myStory ? (
              <TouchableOpacity>
                <Image
                  source={require('../../assets/icons/pin.png')}
                  style={styles.headerSingleButton}
                />
              </TouchableOpacity>
            ) : (
              <View />
            )}
            <View />
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require('../../assets/icons/cross.png')}
                style={styles.headerSingleButton}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.progresscontainer}>
          {images.map((data, index) => {
            return (
              <View
                style={[
                  styles.singleProgressBar,
                  {
                    backgroundColor: index < currentImage ? 'white' : '#777777',
                  },
                ]}>
                {index == currentImage ? (
                  <Progress.Bar
                    // indeterminateAnimationDuration={0}
                    // animationType={Easing.linear()}
                    // useNativeDriver
                    progress={this.state.progress}
                    unfilledColor={'green'}
                    width={null}
                    color={'white'}
                    borderWidth={0}
                    borderRadius={0}
                    style={{
                      height: '100%',
                      width: null,
                      backgroundColor: '#777777',
                    }}
                  />
                ) : null}
              </View>
            );
          })}
        </View>
        <View onPress={this.onPostPress} style={styles.postContainer}>
          <Image
            onLoadStart={() => {
              this.pressIn();

              this.setState({loadingImage: true});
            }}
            onLoadEnd={() => {
              this.pressOut();
              this.setState({progress: 0, timeOut: 5000, new: 50}, () => {
                clearInterval(this.ProgressInterval);
                this.setProgressInterval();

                clearInterval(this.test);
                this.setTest();

                clearInterval(this.IntervalHandle);
                this.setInterval();
              });
              this.setState({loadingImage: false});
            }}
            source={{uri: images[currentImage]}}
            style={{width: wp('100'), height: '100%'}}
          />
          <TouchableOpacity
            onPress={this.onNextPress}
            style={styles.rightPress}
          />
          <TouchableOpacity
            onPress={this.onPrevPress}
            style={styles.leftPress}
          />
          <TouchableWithoutFeedback
            delayPressIn={0}
            onPressIn={this.pressIn}
            // onPress={() => console.log('ff')}
            // onLongPress={() => console.log('hi')}
            onPressOut={this.pressOut}
            style={styles.centerPress}>
            <View style={styles.centerPress} />
          </TouchableWithoutFeedback>
          {this.props.route.params && this.props.route.params.myStory && (
            <TouchableOpacity
              onPress={this.openViewsModal}
              style={styles.eyeContainer}>
              <Image
                source={require('../../assets/icons/eye.png')}
                style={styles.eyeIcon}
              />
              <ResponsiveText style={styles.detailText}>203</ResponsiveText>
            </TouchableOpacity>
          )}
          {this.state.loadingImage && (
            <View
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'black',
                position: 'absolute',
                zIndex: 1000,
              }}>
              <ActivityIndicator
                color={'white'}
                size={'large'}
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  top: 0,
                  bottom: 0,
                }}
              />
            </View>
          )}
        </View>
        <View style={styles.footer}>
          <View style={styles.FooterItemContainer}>
            <TouchableOpacity
              onPress={() => this.setState((prev) => ({liked: !prev.liked}))}>
              <Image
                source={
                  this.state.liked
                    ? require('../../assets/icons/heart.png')
                    : require('../../assets/icons/heart_outline.png')
                }
                style={styles.footerIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LikedBy')}>
              <ResponsiveText style={styles.detailText}>
                {this.state.liked ? this.state.likes + 1 : this.state.likes}
              </ResponsiveText>
            </TouchableOpacity>
          </View>
          <View style={styles.FooterItemContainer}>
            <Image
              source={require('../../assets/icons/heartBroken.png')}
              style={styles.footerIcon}
            />

            <ResponsiveText style={styles.detailText}>203</ResponsiveText>
          </View>
          <View style={styles.FooterItemContainer}>
            <TouchableOpacity
              style={styles.FooterItemContainer}
              onPress={this.openCommentModal}>
              <Image
                source={require('../../assets/icons/commentFill.png')}
                style={[
                  styles.footerIcon,
                  {height: wp('5.5'), width: wp('5.5')},
                ]}
              />

              <ResponsiveText style={styles.detailText}>112</ResponsiveText>
            </TouchableOpacity>
          </View>
          <View style={styles.FooterItemContainer}>
            <TouchableOpacity onPress={this.openShareModal}>
              <Image
                source={require('../../assets/icons/shareWhite.png')}
                style={styles.footerIcon}
              />
            </TouchableOpacity>
            {/*<View style={}></View>*/}
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.CommentsModal}
          onRequestClose={this.closeCommentModal}>
          <TouchableWithoutFeedback
            delayPressIn={0}
            onPressIn={this.closeCommentModal}>
            <View
              style={{
                height: hp('25'),
                width: '100%',
                backgroundColor: 'transparent',
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              height: hp('75'),
              width: '100%',
              backgroundColor: '#F9F9F9',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            <View style={styles.commentModalHeader}>
              <TouchableOpacity
                onPress={this.closeCommentModal}
                style={{padding: 2}}>
                <Image
                  source={require('../../assets/icons/cross.png')}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    tintColor: 'black',
                    marginTop: 10,
                  }}
                />
              </TouchableOpacity>

              {/*<Image*/}
              {/*  style={styles.commentHeaderAvatar}*/}
              {/*  source={require('../../assets/images/model.jpg')}*/}
              {/*/>*/}

              {/*<View>*/}
              {/*  <ResponsiveText style={styles.commentsHeaderName}>*/}
              {/*    John Smith*/}
              {/*  </ResponsiveText>*/}
              {/*  <ResponsiveText style={styles.commentTitle}>*/}
              {/*    Comments*/}
              {/*  </ResponsiveText>*/}
              {/*</View>*/}
            </View>
            <FlatList
              ref={(ref) => {
                this.listViewRef = ref;
              }}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: wp('5.5'),
                paddingTop: wp('2'),
                backgroundColor: '#F9F9F9',
              }}
              data={this.state.comments}
              renderItem={({item, index}) => {
                return (
                  <CommentsReplyCard
                    item={item}
                    id={item.id}
                    name={item.name}
                    avatar={item.avatar}
                    username={item.username}
                    liked={item.liked}
                    reply={item.reply}
                    likes={item.likes}
                    subReplies={item.subReplies}
                    navigation={this.props.navigation}
                    hideReply={true}
                    // trackId={(item, subitem) => this.trackId(item, subitem)}
                  />
                );
              }}
              keyExtractor={(item, index) => `${index}`}
            />
            <View style={styles.sendInputContainer}>
              <InputField
                ref={(ref) => {
                  this.InputFieldRef = ref;
                }}
                value={this.state.replyText}
                // autoFocus={this.state.focusInput}
                CameraIcon={true}
                placeholder={'say some thing here ...'}
                containerStyle={styles.SendInput}
                right={
                  <View style={styles.sendButton}>
                    <Image
                      source={require('../../assets/icons/send.png')}
                      style={styles.sendIcon}
                    />
                  </View>
                }
                // placeholderTextColor={'#B7B7B7'}
                rightPress={this.reply}
                onChangeText={(e) => this.setState({replyText: e})}
                rightStyle={{padding: 0, marginRight: -5}}
              />
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.viewsModal}
          onRequestClose={this.closeViewsModal}>
          <TouchableWithoutFeedback
            delayPressIn={0}
            onPressIn={this.closeViewsModal}>
            <View
              style={{
                height: '33%',
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.6)',
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              height: '70%',
              width: '100%',
              backgroundColor: 'white',
              borderTopLeftRadius: wp('4'),
              borderTopRightRadius: wp('4'),
              marginTop: '-3%',
            }}>
            <View style={styles.ViewModalHeader}>
              <ResponsiveText style={styles.shareHeaderText}>
                Viewers 203
              </ResponsiveText>
              <Image
                source={require('../../assets/icons/share_dark.png')}
                style={styles.shareModalIcon}
              />
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: wp('5.5'),
                // paddingTop: wp('4'),
              }}
              data={followersData}
              renderItem={({item, index}) => {
                return (
                  <LikedByCard
                    key={index}
                    profile_image={item.profile_image}
                    user_name={item.user_name}
                    time={item.time}
                    following={item.following}
                  />
                );
              }}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
        </Modal>
      </Container>
    );
  }
}

export default Story;

const styles = {
  header: {
    height: wp('15'),
    // backgroundColor: 'red',
    marginTop: wp('4'),
    paddingHorizontal: wp('4'),
    flexDirection: 'row',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  profileAndNameContainer: {
    // backgroundColor: 'green',
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerbuttons: {
    // backgroundColor: 'yellow',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    height: wp('11'),
    width: wp('11'),
    borderRadius: wp('12'),
    marginRight: wp('4'),
  },
  name: {
    color: 'white',
    // fontFamily: Fonts.OpenSansRegular,
    fontSize: 4.5,
  },
  headerSingleButton: {
    height: wp('6'),
    width: wp('6'),
    resizeMode: 'contain',
  },
  progresscontainer: {
    height: wp('0.8'),
    backgroundColor: 'transparent',
    marginTop: wp('2'),
    marginBottom: wp('3.5'),
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  postContainer: {
    height: '72%',
    backgroundColor: 'grey',
  },
  footer: {
    height: wp('12'),
    width: wp('100'),
    position: 'absolute',
    bottom: wp('3'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4'),
    justifyContent: 'space-between',
  },
  FooterItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginLeft: wp('3'),
  },
  footerIcon: {
    height: wp('6.5'),
    width: wp('6.5'),
    resizeMode: 'contain',
    marginRight: wp('2'),
  },
  detailText: {
    color: 'white',
    fontSize: 3.5,
    // fontFamily: Fonts.OpenSansRegular,
  },
  singleProgressBar: {
    // height: wp('1'),
    // width:'100%',
    flex: 1,
    marginHorizontal: wp('0.8'),

    // borderRadius: wp('2'),
  },
  rightPress: {
    height: '100%',
    width: '25%',
    // backgroundColor: 'grey',
    position: 'absolute',
    right: 0,
  },
  leftPress: {
    height: '100%',
    width: '25%',
    // backgroundColor: 'green',
    position: 'absolute',
    left: 0,
  },
  centerPress: {
    height: '100%',
    width: '50%',
    position: 'absolute',
    left: '25%',
    // backgroundColor: 'red',
  },
  commentModalHeader: {
    height: wp('10'),
    width: wp('100'),
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5'),
    marginBottom: wp('3'),
    justifyContent: 'flex-end',
  },
  ViewModalHeader: {
    height: wp('18'),
    // width: wp('100'),
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('5'),
    marginBottom: wp('3'),

    justifyContent: 'space-between',
  },
  commentHeaderAvatar: {
    height: wp('14'),
    width: wp('14'),
    borderRadius: wp('14'),
    marginRight: wp('2'),
  },
  commentsHeaderName: {
    marginBottom: wp('1.5'),
    // fontFamily: Fonts.SourceSansProSemiBold,
    color: '#2B2B2B',
    fontSize: 4.5,
  },
  commentTitle: {
    // fontFamily: Fonts.SourceSansProRegular,
    color: '#9D9D9D',
    fontSize: 3,
  },
  sendInputContainer: {
    height: wp('20'),
    width: wp('100'),
    // position: 'absolute',
    // bottom:20,
    backgroundColor: 'white',

    justifyContent: 'center',
    alignItems: 'center',
  },
  SendInput: {
    width: wp('90'),
    backgroundColor: '#ECECEC',

    paddingLeft: wp('5'),
    borderWidth: 0,
    borderRadius: wp('10'),
    height: wp('15'),

    // marginBottom: wp('20'),
  },
  sendButton: {
    height: wp('12'),
    width: wp('12'),
    borderRadius: wp('12'),
    backgroundColor: '#0089FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    height: wp('6'),
    width: wp('6'),
    tintColor: 'white',
    resizeMode: 'contain',
  },
  shareModalIcon: {
    height: wp('4.5'),
    width: wp('4.5'),
    resizeMode: 'contain',
    tintColor: '#B5B5B5',
  },
  shareHeaderText: {
    // fontFamily: Fonts.SourceSansProRegular,
    fontSize: 5,
    color: '#B5B5B5',
  },
  eyeContainer: {
    position: 'absolute',
    bottom: wp('3'),
    alignSelf: 'center',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIcon: {
    height: wp('5.5'),
    width: wp('5.5'),
    resizeMode: 'contain',
    tintColor: 'white',
    marginRight: wp('2'),
  },
};
