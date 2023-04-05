import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import ResponsiveText from '../../components/ResponsiveText';
import {widthPercentageToDP as wp} from '../../components/Helpers';
// import Fonts from '../../themes/Fonts';
import InputField from '../../components/InputField';
import {CommentsReply} from '../../components/DummyData';
import CommentsReplyCard from '../../components/CommentsReplyCard';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsReply: CommentsReply,
      replyText: '',
      scrollToBottomY: '',
      replyto: null,
      replyUsername: '',
    };
  }

  subReply = () => {
    const {commentsReply, replyText, replyto} = this.state;
    if (replyText.trim().length > 0) {
      let array = commentsReply;
      let subreply = {
        id: array.find((a) => a.id == replyto.id).subReplies.length,
        name: '_hammadamin',
        avatar: 'https://source.unsplash.com/1024x768/?boy',
        username: 'hammy26',
        liked: false,
        reply: replyText,
        likes: 0,
      };
      array.find((a) => a.id == replyto.id).subReplies.push(subreply);
      this.setState((prev) => ({
        commentsReply: array,
        replyText: '',
        replyto: null,
      }));
    }
  };

  reply = () => {
    const {commentsReply, replyText} = this.state;
    console.log('jo');
    if (replyText.trim().length > 0) {
      let array = commentsReply;
      let reply = {
        id: array.length,
        name: '_hammadamin',
        avatar: 'https://source.unsplash.com/1024x768/?boy',
        username: 'hammy26',
        liked: false,
        reply: replyText,
        likes: 0,
        subReplies: [],
      };
      // array.concat(reply)
      this.setState((prev) => ({
        commentsReply: prev.commentsReply.concat(reply),
        replyText: '',
      }));
      setTimeout(() => {
        this.scrollView.scrollToEnd();
      }, 200);
    }
  };

  trackId = (item, subitem) => {
    this.setState({
      replyText: `@${subitem ? subitem.username : item.username} `,
      replyto: item,
      replyUsername: subitem ? subitem.username : item.username,
    });
  };

  render() {
    const {commentsReply, replyUsername, replyText, replyto} = this.state;
    return (
      <Container>
        <AppHeader
          titleLeftAlign
          containerStyle={styles.header}
          left={
            <View style={styles.leftIconContainer}>
              <Image
                source={require('../../assets/icons/left_chevron2.png')}
                style={styles.HeaderleftIcon}
              />
            </View>
          }
          leftPress={() => this.props.navigation.goBack()}
          body={
            <ResponsiveText style={styles.headertitle}>Comments</ResponsiveText>
          }
        />
        <View style={styles.clearFix} />

        <ScrollView
          ref={(ref) => {
            this.scrollView = ref;
          }}
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.commentHeader}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('userProfile', {
                  notMe: true,
                })
              }>
              <Image
                source={require('../../assets/images/model.jpg')}
                style={styles.UserImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('userProfile', {
                  notMe: true,
                })
              }>
              <ResponsiveText style={styles.name}>Hammad</ResponsiveText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('userProfile', {
                  notMe: true,
                })
              }>
              <ResponsiveText style={styles.userName}>@HammyB</ResponsiveText>
            </TouchableOpacity>
            <Image
              source={require('../../assets/icons/verification_mark.png')}
              style={styles.verificationMark}
            />
          </View>
          <ResponsiveText style={styles.commentText}>
            It is a long established fact that a reader will be distracted by
            the readable content fact that a reader will be distracted by the
            readable content
          </ResponsiveText>
          <ResponsiveText style={styles.time}>2 days ago</ResponsiveText>
          <FlatList
            contentContainerStyle={{
              paddingTop: wp('4'),
              // marginBottom: wp('20'),
            }}
            data={commentsReply}
            renderItem={({item}) => {
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
                  trackId={(item, subitem) => this.trackId(item, subitem)}
                />
              );
            }}
          />
        </ScrollView>

        <View style={styles.sendInputContainer}>
          <>
            {this.state.replyto && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '80%',
                  marginBottom: 10,
                  borderWidth: 1,
                  borderColor: '#D3D3D3',
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                }}>
                <ResponsiveText>
                  replying to @{this.state.replyUsername}
                </ResponsiveText>
                <TouchableOpacity
                  onPress={() => this.setState({replyto: null, replyText: ''})}>
                  <ResponsiveText style={{color: 'red'}}>cancel</ResponsiveText>
                </TouchableOpacity>
              </View>
            )}
            <InputField
              CameraIcon={true}
              value={replyText}
              placeholder={'Say some thing here ...'}
              containerStyle={styles.SendInput}
              right={
                <View style={styles.sendButton}>
                  <Image
                    source={require('../../assets/icons/send.png')}
                    style={styles.sendIcon}
                  />
                </View>
              }
              onChangeText={(e) => this.setState({replyText: e})}
              // placeholderTextColor={'#B7B7B7'}
              rightPress={this.state.replyto ? this.subReply : this.reply}
              rightStyle={{padding: 0, marginRight: -5}}
            />
          </>
        </View>
      </Container>
    );
  }
}

export default Comments;

const styles = {
  header: {},
  leftIconContainer: {
    paddingRight: 7,
  },
  HeaderleftIcon: {
    height: wp('3.5'),
    width: wp('3.5'),
    resizeMode: 'contain',
    // backgroundColor: 'red'
  },
  headerNotificationIcon: {
    height: wp('8'),
    width: wp('8'),
    resizeMode: 'contain',
  },
  headertitle: {
    // fontFamily: Fonts.OpenSansRegular,
    fontSize: 5.5,
  },
  clearFix: {
    height: wp('0.4'),
    backgroundColor: '#E1E1E1',

    // marginBottom:wp('4')
  },
  contentContainerStyle: {
    paddingHorizontal: wp('5.5'),
    paddingTop: wp('5'),
    flexGrow: 1,
    // paddingBottom:
    // backgroundColor:'grey'
  },
  sendInputContainer: {
    height: wp('22'),
    width: wp('100'),
    // position: 'absolute',
    // bottom: 0,
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
    height: wp('12.5'),
    paddingRight: 1,
    // marginBottom: wp('6'),
  },
  sendButton: {
    height: wp('10'),
    width: wp('10'),
    borderRadius: wp('10'),
    backgroundColor: '#0089FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    height: wp('4.5'),
    width: wp('4.5'),
    tintColor: 'white',
    resizeMode: 'contain',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  UserImage: {
    height: wp('12'),
    width: wp('12'),
    borderRadius: wp('12'),
    marginRight: wp('2'),
  },
  name: {
    color: 'black',
    // fontFamily: Fonts.SourceSansProSemiBold,
    fontSize: 4.5,
    marginRight: wp('2'),
  },
  userName: {
    // fontFamily: Fonts.SourceSansProSemiBold,
    fontSize: 4,
    color: '#767676',
    marginRight: wp('2'),
  },
  verificationMark: {
    height: wp('5'),
    width: wp('5'),
    resizeMode: 'contain',
  },
  commentText: {
    marginTop: wp('2'),
    lineHeight: wp('6'),
    // fontFamily: Fonts.SourceSansProRegular,
    color: '#828282',
  },
  time: {
    color: '#BDBDBD',
    // fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 3,
    marginVertical: wp('1.5'),
  },
};
