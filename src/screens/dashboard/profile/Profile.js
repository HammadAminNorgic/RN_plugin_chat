import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Container from '../../../components/Container';
import {widthPercentageToDP as wp} from '../../../components/Helpers';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ResponsiveText from '../../../components/ResponsiveText';
// import Fonts from '../../../themes/Fonts';
import Feeds from './Feeds';
import Videos from './Videos';
import Images from './Images';
const Tab = createMaterialTopTabNavigator();
function MyTabs(props) {
  const [activeTab, setActiveTab] = useState('Feeds');

  const DefaultScreen = () => {
    return (
      <View
        style={{
          flexGrow: 1,
          backgroundColor: 'white',
          paddingTop: wp('50'),
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color={'#e6e6e6'} size={'small'} />
      </View>
    );
  };

  return (
    <Tab.Navigator
      // swipeEnabled={false}
      // showIcon={true}
      removeClippedSubviews={false}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let Name;

          if (route.name === 'Feeds') {
            Name = 'Feeds';
          } else if (route.name === 'Videos') {
            Name = 'Videos';
          } else if (route.name === 'Images') {
            Name = 'Images';
          }

          if (Name == 'Feeds') {
            return (
              <Image
                source={require('../../../assets/icons/block.png')}
                style={[styles.topTabIcon, {tintColor: color}]}
              />
            );
          }
          if (Name == 'Videos') {
            return (
              <Image
                source={require('../../../assets/icons/video.png')}
                style={[styles.topTabIcon, {tintColor: color}]}
              />
            );
          }
          if (Name == 'Images') {
            return (
              <Image
                source={require('../../../assets/icons/image_Placeholder.png')}
                style={[styles.topTabIcon, {tintColor: color}]}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        showLabel: true,
        showIcon: true,
        activeTintColor: '#0089FF',
        inactiveTintColor: '#AEAEAE',
        labelStyle: {
          // fontFamily: Fonts.RobotoBold,

          textTransform: 'capitalize',
          fontSize: wp('3.2'),
          marginVertical: -1,
        },
        style: {
          elevation: 0,
          borderBottomWidth: wp(0.3),
          borderBottomColor: '#E1E1E1',
        },
        indicatorStyle: {
          height: wp('0.8'),
          borderRadius: wp('5'),
          backgroundColor: '#0089FF',
          width: wp('20'),
          marginLeft: wp('7'),
        },
      }}>
      <Tab.Screen
        listeners={{focus: () => setActiveTab('Feeds')}}
        name="Feeds"
        component={activeTab === 'Feeds' ? Feeds : DefaultScreen}
      />
      <Tab.Screen
        listeners={{focus: () => setActiveTab('Videos')}}
        name="Videos"
        component={activeTab === 'Videos' ? Videos : DefaultScreen}
      />
      <Tab.Screen
        listeners={{focus: () => setActiveTab('Images')}}
        name="Images"
        component={activeTab === 'Images' ? Images : DefaultScreen}
      />
    </Tab.Navigator>
  );
}
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentOffsetY: 0,
      internalScrollenable: false,
      followed: false,
    };
  }

  render() {
    return (
      <Container style={{flex: 1}}>
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{flexGrow: 1}}
          scrollToOverflowEnabled={true}>
          <View style={styles.header}>
            <View style={styles.headerIconContainer}>
              <TouchableOpacity style={styles.cartIconContainer}>
                <Image
                  source={require('../../../assets/icons/cart.png')}
                  style={styles.headerIcon}
                />
              </TouchableOpacity>
              {!this.props.route.params && (
                <TouchableOpacity
                  // onPress={() => this.props.navigation.navigate('Setting')}
                  style={styles.settingIconContainer}>
                  <Image
                    source={require('../../../assets/icons/setting.png')}
                    style={styles.headerIcon}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.userDetailsContainer}>
            <View style={styles.userDetailsSubContainer}>
              <Image
                source={require('../../../assets/images/model.jpg')}
                style={styles.profileImage}
              />
              <View style={styles.nameContainer}>
                <View style={styles.nameInnerContainer}>
                  <ResponsiveText style={styles.nameText}>
                    John Smith
                  </ResponsiveText>
                  <ResponsiveText style={styles.userName}>
                    @JohnS
                  </ResponsiveText>
                  <Image
                    source={require('../../../assets/icons/verification_mark.png')}
                    style={styles.verifyMark}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Fams')}>
                  <ResponsiveText style={styles.famText}>
                    280 Fams
                  </ResponsiveText>
                </TouchableOpacity>
                {this.props.route.params && this.props.route.params.notMe && (
                  <View style={styles.followButtonsContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState((prev) => ({
                          followed: !prev.followed,
                        }));
                      }}
                      style={[
                        styles.followButton,
                        {
                          backgroundColor: this.state.followed
                            ? '#0089FF'
                            : 'white',
                        },
                      ]}>
                      <Text
                        style={[
                          styles.followButtonText,
                          {color: this.state.followed ? 'white' : '#0089FF'},
                        ]}>
                        {this.state.followed ? 'Unfollow' : 'Follow'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      // onPress={() =>
                      //   this.props.navigation.navigate('Messages', {
                      //     profile_image: 'https://picsum.photos/id/230/200',
                      //     user_name: 'Ellene Lambert',
                      //   })
                      // }
                      style={styles.messageButton}>
                      <ResponsiveText style={styles.messageButtonText}>
                        Message
                      </ResponsiveText>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <ResponsiveText style={styles.userTitle}>
                  Content Creator
                </ResponsiveText>
                <Image
                  source={require('../../../assets/icons/flag.png')}
                  style={styles.flagIcon}
                />
              </View>
              <ResponsiveText style={styles.userInfoDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod
                euismod tellus quis hendrerit non, in nam nam. Tristique egestas
                gravida imperdiet tellus sed. Adipiscing sagittis, sem tellus
                aliquet convallis pretium quisque blandit libero. Turpis
                vulputate neque risus, id.
              </ResponsiveText>
            </View>
          </View>
          {/*<View style={{flexGrow: 1}}>*/}
          <MyTabs />
          {/*</View>*/}
        </ScrollView>
      </Container>
    );
  }
}

export default Profile;

const styles = {
  header: {
    height: wp('15'),
    // backgroundColor: 'red',
    justifyContent: 'center',
    paddingHorizontal: wp('2'),
  },
  headerIconContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  headerIcon: {
    height: wp('7.5'),
    width: wp('7.5'),
    resizeMode: 'contain',
    tintColor: '#3A3A3A',
  },
  cartIconContainer: {marginRight: wp('2'), padding: wp('2')},
  settingIconContainer: {padding: wp('2')},
  userDetailsContainer: {
    // height: wp('100'),
    paddingHorizontal: wp('4'),
  },
  userDetailsSubContainer: {
    // height: wp('20'),
    flexDirection: 'row',
  },
  profileImage: {
    height: wp('20'),
    width: wp('20'),
    borderRadius: wp('20'),
  },
  nameContainer: {
    marginLeft: wp('4'),
    maxHeight: wp('30'),
    maxWidth: wp('65'),
    paddingTop: wp('1'),
  },
  nameText: {
    // fontFamily: Fonts.SourceSansProSemiBold,
    fontSize: 4.3,
    marginRight: wp('2'),
    maxWidth: wp('40'),
  },
  userName: {
    fontSize: 3.5,
    marginRight: wp('2'),
    // fontFamily: Fonts.SourceSansProSemiBold,
    color: '#767676',
    maxWidth: wp('20'),
  },
  verifyMark: {
    height: wp('5'),
    width: wp('5'),
    resizeMode: 'contain',
  },
  nameInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: wp('65'),
  },
  famText: {
    fontSize: 4.3,
    // fontFamily: Fonts.SourceSansProSemiBold,
  },
  descriptionContainer: {
    // height: wp('40'),
    marginTop: wp('1'),
  },
  userTitle: {
    // fontFamily: Fonts.SourceSansProSemiBold,
    fontSize: 3.1,
  },
  flagIcon: {
    height: wp('3.1'),
    width: wp('3.1'),
    resizeMode: 'contain',
    marginLeft: wp('1.8'),
  },
  userInfoDescription: {
    maxWidth: wp('94'),
    marginTop: wp('2'),
    // fontFamily: Fonts.SourceSansProRegular,
    fontSize: 3.6,
    marginBottom: wp('4'),
    lineHeight: wp('5'),
    color: '#3A3A3A',
  },
  topTabIcon: {height: wp('6'), width: wp('6'), resizeMode: 'contain'},
  followButtonsContainer: {
    marginTop: wp('2'),
    // backgroundColor: 'green',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // height: 30,
  },
  followButton: {
    paddingVertical: wp('1'),
    paddingHorizontal: wp('3.5'),
    borderWidth: wp('0.2'),
    borderRadius: wp('5'),
    borderColor: '#0089FF',
    marginRight: wp('2'),
  },
  followButtonText: {
    color: '#0089FF',
    fontSize: wp(3),
  },
  messageButton: {
    paddingVertical: wp('1.1'),
    paddingHorizontal: wp('4.5'),
    borderWidth: wp('0.2'),
    borderRadius: wp('5'),
    borderColor: '#AEAEAE',
    marginRight: wp('2'),
  },
  messageButtonText: {
    color: '#AEAEAE',
    fontSize: 3,
  },
};
