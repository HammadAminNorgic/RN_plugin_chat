import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import ResponsiveText from './ResponsiveText';
import {widthPercentageToDP as wp} from './Helpers';
// import Fonts from '../themes/Fonts';
// import {Notifications} from './DummyData';
// import nonIterableRest from '@babel/runtime/helpers/esm/nonIterableRest';

class NotificationCard extends React.Component {
  render() {
    const {notificationData} = this.props;
    return (
      <>
        {notificationData.action === 'Follow' && (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}
            activeOpacity={0.8}
            style={styles.cardContainer}>
            <View style={styles.innerContainer}>
              <View>
                <View style={styles.imageContainer}>
                  <ImageBackground
                    source={require('../assets/images/placeholder.png')}
                    style={styles.placeholderImage}>
                    <Image
                      source={{uri: notificationData.profile_image}}
                      style={styles.profileImage}
                    />
                  </ImageBackground>
                </View>
              </View>
              <View style={styles.nameContainer}>
                <View style={{flexDirection: 'row'}}>
                  <ResponsiveText style={styles.name}>
                    {notificationData.user_name.length < 15
                      ? notificationData.user_name
                      : `${notificationData.user_name.substring(0, 14)}...`}
                  </ResponsiveText>
                  <ResponsiveText style={styles.action}>
                    {' '}
                    Follows you
                  </ResponsiveText>
                </View>
                <ResponsiveText style={styles.lastMessage}>
                  {notificationData.time}
                </ResponsiveText>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {notificationData.action === 'React' && (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}
            activeOpacity={0.8}
            style={styles.cardContainer}>
            <View style={styles.innerContainer}>
              <View>
                <View style={styles.imageContainer}>
                  <ImageBackground
                    source={require('../assets/images/placeholder.png')}
                    style={styles.placeholderImage}>
                    <Image
                      source={{uri: notificationData.profile_image}}
                      style={styles.profileImage}
                    />
                  </ImageBackground>
                </View>
              </View>
              <View style={styles.nameContainer}>
                <View style={{flexDirection: 'row'}}>
                  <ResponsiveText style={styles.name}>
                    {notificationData.user_name.length < 15
                      ? notificationData.user_name
                      : `${notificationData.user_name.substring(0, 14)}...`}
                  </ResponsiveText>
                  <ResponsiveText style={styles.action}>
                    {' '}
                    Reacts to your story
                  </ResponsiveText>
                </View>
                <ResponsiveText style={styles.lastMessage}>
                  {notificationData.time}
                </ResponsiveText>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {notificationData.action === 'Like' && (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}
            activeOpacity={0.8}
            style={styles.LikeCardContainer}>
            <View style={styles.likeInnerContainer}>
              <View>
                <View style={styles.imageContainer}>
                  <ImageBackground
                    source={require('../assets/images/placeholder.png')}
                    style={styles.placeholderImage}>
                    <Image
                      source={{uri: notificationData.profile_image}}
                      style={styles.profileImage}
                    />
                  </ImageBackground>
                </View>
              </View>
              <View style={styles.LikenameContainer}>
                <View style={{flexDirection: 'row'}}>
                  <ResponsiveText style={styles.name}>
                    {notificationData.user_name.length < 15
                      ? notificationData.user_name
                      : `${notificationData.user_name.substring(0, 14)}...`}
                  </ResponsiveText>
                  <ResponsiveText style={styles.action}>
                    {' '}
                    Likes {notificationData.images.length} Photos
                  </ResponsiveText>
                </View>
                <ResponsiveText style={styles.lastMessage}>
                  {notificationData.time}
                </ResponsiveText>
                <View style={{flexDirection: 'row'}}>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingTop: wp('3'),
                    }}
                    data={
                      notificationData.images.length > 3
                        ? [
                            notificationData.images[0],
                            notificationData.images[1],
                            notificationData.images[2],
                          ]
                        : notificationData.images
                    }
                    renderItem={({item, index}) => {
                      return (
                        <>
                          <Image source={{uri: item}} style={styles.images} />
                          {index == '2' && (
                            <ResponsiveText style={styles.moreImages}>
                              {notificationData.images.length - 3} +
                            </ResponsiveText>
                          )}
                        </>
                      );
                    }}
                    keyExtractor={(item, index) => `${index}`}
                  />
                  {/*{notificationData.images.length > 3 && (*/}
                  {/*  <ResponsiveText>3 +</ResponsiveText>*/}

                  {/*)}*/}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  }
}

export default NotificationCard;

const styles = {
  cardContainer: {
    // height: wp('22'),
    // backgroundColor:'red',
    borderBottomWidth: wp('0.3'),
    borderColor: '#E1E1E1',
    // borderColor:"#white",
    justifyContent: 'center',
    paddingVertical: 10,
  },
  LikeCardContainer: {
    height: wp('35'),
    borderBottomWidth: wp('0.3'),
    borderColor: '#E1E1E1',
    justifyContent: 'center',
  },
  likeInnerContainer: {
    width: '100%',
    height: wp('28'),
    flexDirection: 'row',
    // backgroundColor: 'yellow',
  },
  innerContainer: {
    width: '100%',
    height: wp('15'),
    flexDirection: 'row',
  },
  imageContainer: {
    height: wp('14'),
    width: wp('14'),
    borderRadius: wp('14'),
    overflow: 'hidden',
  },
  placeholderImage: {
    height: wp('14'),
    width: wp('14'),
  },
  profileImage: {
    height: wp('14'),
    width: wp('14'),
    borderRadius: wp('14'),
  },
  unseenBadge: {
    borderRadius: wp('10'),
    backgroundColor: '#0089FF',
    position: 'absolute',
    right: 0,
    fontSize: 3,
    paddingVertical: wp('0.7'),
    paddingHorizontal: wp('1.5'),
    color: 'white',
    // fontFamily: Fonts.OpenSansRegular,
    elevation: 1,
  },
  nameContainer: {
    marginLeft: wp('3'),
    // flexGrow:1,
    width: wp('70'),
    height: wp('14'),
    maxHeight: wp('14'),
    overflow: 'hidden',
    marginTop: wp('1'),
  },
  LikenameContainer: {
    marginLeft: wp('3'),
    // flexGrow:1,
    width: wp('65'),
    // height: wp('14'),
    // maxHeight: wp('14'),
    overflow: 'hidden',
    marginTop: wp('1'),
  },
  name: {
    // fontFamily: Fonts.SourceSansProRegular,
    fontSize: 4.3,
    // maxHeight: wp('4.5'),
    marginBottom: wp('1.5'),
  },
  action: {
    // fontFamily: Fonts.SourceSansProRegular,
    fontSize: 4.3,
    // maxHeight: wp('4.5'),
    marginBottom: wp('1'),
    color: '#8C8C8C',
  },
  lastMessage: {
    // fontFamily: Fonts.SourceSansProRegular,
    fontSize: 3.1,
    // maxHeight: wp('6'),
    color: '#979797',
    // opacity: 0.5,
  },
  timeContainer: {
    flexGrow: 1,
  },
  time: {
    fontSize: 3,
    marginTop: wp('1'),
    color: '#3A3A3A',
    opacity: 0.5,
  },
  images: {
    height: wp('12'),
    width: wp('11.5'),
    borderRadius: wp('2'),
    marginRight: wp('2'),
    backgroundColor: '#BBBBBB',
  },
  moreImages: {
    alignSelf: 'center',
    color: '#ABABAB',
    // fontFamily: Fonts.SourceSansProRegular,
    marginLeft: wp('3'),
  },
};
