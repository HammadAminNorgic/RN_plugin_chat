import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import InputField from '../../components/InputField';
import ResponsiveText from '../../components/ResponsiveText';
import StoryCard from '../../components/StoryCard';
import PostCard from '../../components/PostCard';
import {Posts, Stories} from '../../components/DummyData';
import { widthPercentageToDP as wp} from '../../components/Helpers';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedToggle: 'Popular',
      stories: [1, 2, 3, 4, 5, 6],
      posts: [1, 2, 3],
      postMenu: false,
    };
  }
  render() {
    const {selectedToggle} = this.state;
    console.log(this.state.postMenu);
    return (
      <Container style={{flex: 1}}>
        <AppHeader
          left={
            <View style={styles.headerprofileImageContainer}>
              <Image
                source={require('../../assets/images/model.jpg')}
                style={styles.headerProfileImage}
              />
            </View>
          }
          leftPress={() =>
            this.props.navigation.navigate('Story', {
              myStory: true,
            })
          }
          body={
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Search')}>
              <InputField
                editable={false}
                leftIcon={
                  <Image
                    source={require('../../assets/icons/search.png')}
                    style={styles.searchIcon}
                  />
                }
                inputField={styles.searchText}
                containerStyle={styles.headerSearchbar}
                placeholder={'Search'}
              />
            </TouchableOpacity>
          }
          right={
            <View>
              <Image
                source={require('../../assets/icons/Notification.png')}
                style={styles.headerNotificationIcon}
              />
              <View style={styles.notificationBadge} />
            </View>
          }
          rightPress={() => this.props.navigation.navigate('Notification')}
        />
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            onPress={() => this.setState({selectedToggle: 'Popular'})}
            style={[
              styles.toggleItem,
              {borderRightWidth: wp('0.3'), borderRightColor: '#CCCCCC'},
            ]}>
            <Text
              style={[
                styles.toggleItemText,
                {
                  color: selectedToggle == 'Popular' ? '#0089FF' : '#767676',
                },
              ]}>
              Popular
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({selectedToggle: 'Following'})}
            style={styles.toggleItem}>
            <Text
              style={[
                styles.toggleItemText,
                {
                  color: selectedToggle == 'Following' ? '#0089FF' : '#767676',
                },
              ]}>
              Following
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          onScrollBeginDrag={() => {
            this.setState((prev) => ({postMenu: !prev.postMenu}));
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <View style={styles.storiesContainer}>
            <ResponsiveText style={styles.storyText}>Story</ResponsiveText>
            <FlatList
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingLeft: wp(5.5)}}
              horizontal
              data={Stories}
              renderItem={({item, index}) => {
                return (
                  <StoryCard
                    key={index}
                    profile_image={item.profile_image}
                    user_name={item.user_name}
                    post_url={item.post_url}
                    navigation={this.props.navigation}
                  />
                );
              }}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
          <View style={styles.postCard}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={Posts}
              renderItem={({item, index}) => {
                return (
                  <PostCard
                    postMenu={this.state.postMenu}
                    key={index}
                    profile_image={item.profile_image}
                    user_name={item.user_name}
                    post_url={item.post_url}
                    isVerified={item.isVerified}
                    time={item.time}
                    likes={item.likes}
                    comments={item.comments}
                    description={item.description}
                    post_type={item.post_type}
                    views={item.views}
                    duration={item.duration}
                    isLive={item.isLive}
                    thumbnail={item.thumbnail}
                    navigation={this.props.navigation}
                  />
                );
              }}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
        </ScrollView>
        {/*<TouchableOpacity style={styles.cameraButton}>*/}
        {/*  <Image*/}
        {/*    source={require('../../assets/icons/camera.png')}*/}
        {/*    style={styles.cameraIcon}*/}
        {/*  />*/}
        {/*</TouchableOpacity>*/}
      </Container>
    );
  }
}

export default Home;

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerProfileImage: {
    height: wp('10'),
    width: wp('10'),
    borderRadius: wp('10'),
    backgroundColor: '#F3F3F3',

    // resizeMode:'contain'
    // padding:wp('5')
  },
  headerprofileImageContainer: {
    height: wp('12'),
    width: wp('12'),
    borderRadius: wp('12'),
    borderWidth: wp('0.6'),
    borderColor: '#0089FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerNotificationIcon: {
    height: wp('7'),
    width: wp('7'),
    resizeMode: 'contain',
  },
  headerSearchbar: {
    width: wp('65'),
    height: wp('11.5%'),
    borderRadius: wp('10'),
    marginLeft: wp('4.5'),
    backgroundColor: '#F2F2F2',
    borderWidth: 0,
    paddingLeft: wp('3'),
  },
  searchIcon: {
    height: wp('4.5'),
    width: wp('4.5'),
    resizeMode: 'contain',
    marginLeft: wp('2'),
  },
  searchText: {
    // fontFamily: Fonts.RobotoBold,
    fontSize: wp('3.5'),
    // marginLeft: -wp('1.5'),
  },
  notificationBadge: {
    height: wp('2.8'),
    width: wp('2.8'),
    backgroundColor: '#59EF0E',
    borderRadius: wp('2.8'),
    position: 'absolute',
    right: -4,
    top: -1.5,
    elevation: 1,
  },
  toggleContainer: {
    height: wp('10'),
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: wp('4'),
  },
  toggleItem: {
    height: wp('9'),
    width: wp('48'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleItemText: {
    fontSize: wp('4'),
    // fontFamily: Fonts.SourceSansProSemiBold,
  },
  scrollView: {
    flexGrow: 1,
  },
  storiesContainer: {
    // height: wp('40'),
    // paddingLeft: wp('5.5'),
    marginBottom: wp('8'),
  },
  storyText: {
    fontSize: 5,
    // fontFamily: Fonts.OpenSansRegular,
    marginBottom: wp('2'),
    paddingLeft: wp('5.5'),
  },
  postCard: {},
  cameraButton: {
    height: wp('19'),
    width: wp('19'),
    backgroundColor: '#0089FF',
    borderRadius: wp('19'),
    elevation: 3,
    position: 'absolute',
    bottom: wp('5'),
    right: wp('5'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    height: wp('8'),
    width: wp('8'),
    resizeMode: 'contain',
  },
};
