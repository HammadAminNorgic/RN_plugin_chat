import { View, Text, Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import GetReady from '../screens/authentication/GetReady';
import ChooseInterest from '../screens/authentication/ChooseInterest';

// import {
//     createStackNavigator,
//     CardStyleInterpolators,
//   } from '@react-navigation/stack';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import {
    createBottomTabNavigator,
    BottomTabBar,
  } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp } from '../components/Helpers';
import Home from '../screens/dashboard/Home';
import Search from '../screens/dashboard/search';
import Profile from '../screens/dashboard/profile/Profile';
import SinglePost from '../screens/dashboard/profile/SinglePost';
import LikedBy from '../screens/dashboard/LikedBy';
import Comments from '../screens/dashboard/Comments';
import Notification from '../screens/dashboard/Notification'
import Fams from '../screens/dashboard/profile/fams/Fams';
import Story from '../screens/dashboard/Story';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



function HomeStack() {
    return (
      <Stack.Navigator
        screenOptions={{
        //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />
        <Stack.Screen
          name="userProfile"
          options={{headerShown: false}}
          component={Profile}
        />
        <Stack.Screen
          name="Fams"
          options={{headerShown: false}}
          component={Fams}
        />
        <Stack.Screen
          name="SinglePost"
          options={{headerShown: false}}
          component={SinglePost}
        />
  
  
      </Stack.Navigator>
    );
  }

  function ProfileStack() {
    return (
      <Stack.Navigator
        screenOptions={{
        //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name="Profile"
          options={{headerShown: false}}
          component={Profile}
        />
        <Stack.Screen
          name="Fams"
          options={{headerShown: false}}
          component={Fams}
        />
        <Stack.Screen
          name="SinglePost"
          options={{headerShown: false}}
          component={SinglePost}
        />
      </Stack.Navigator>
    );
  }
function DashboardTab() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
  
            if (route.name === 'HomeStack') {
              iconName = 'Home';
            } else if (route.name === 'Stream') {
              iconName = 'Stream';
            } else if (route.name === 'AddPost') {
              iconName = 'AddPost';
            } else if (route.name === 'Inbox') {
              iconName = 'Inbox';
            } else if (route.name === 'ProfileStack') {
              iconName = 'Profile';
            }
  
            // You can return any component that you like here!
            if (iconName == 'Home') {
              return (
                <>
                  <Image
                    source={require('../assets/icons/home_tab.png')}
                    style={[styles.tabBarIcon, {tintColor: color}]}
                  />
                  <Text
                    style={{
                      color: color,
                      fontSize: wp('3'),
                    //   fontFamily: Fonts.RobotoBold,
                    }}>
                    {iconName}
                  </Text>
                </>
              );
            }
            if (iconName == 'Stream') {
              return (
                <>
                  <Image
                    source={require('../assets/icons/stream_tab.png')}
                    style={[styles.tabBarIcon, {tintColor: color}]}
                  />
                  <Text
                    style={{
                      color: color,
                      fontSize: wp('3'),
                    //   fontFamily: Fonts.RobotoBold,
                    }}>
                    {iconName}
                  </Text>
                </>
              );
            }
            if (iconName == 'AddPost') {
              return (
                <>
                  <View style={styles.plusContainer}>
                    <Image
                      source={require('../assets/icons/plus.png')}
                      style={styles.plusIcon}
                    />
                  </View>
                </>
              );
            }
  
            if (iconName == 'Inbox') {
              return (
                <>
                  <Image
                    source={require('../assets/icons/Inbox_tab.png')}
                    style={[styles.tabBarIcon, {tintColor: color}]}
                  />
                  <Text
                    style={{
                      color: color,
                      fontSize: wp('3'),
                    //   fontFamily: Fonts.RobotoBold,
                    }}>
                    {iconName}
                  </Text>
                </>
              );
            }
            if (iconName == 'Profile') {
              return (
                <>
                  <Image
                    source={require('../assets/icons/profile_tab.png')}
                    style={[styles.tabBarIcon, {tintColor: color}]}
                  />
                  <Text
                    style={{
                      color: color,
                      fontSize: wp('3'),
                    //   fontFamily: Fonts.RobotoBold,
                    }}>
                    {iconName}
                  </Text>
                </>
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: '#0089FF',
          inactiveTintColor: '#CECECE',
          // tabStyle:{
          //   backgroundColor: 'red',
          //   height:wp('15')
          // },
          style: {
            height: wp('19'),
            borderTopWidth: 0,
            elevation: 0,
          },
        }}>
        <Tab.Screen
          name="HomeStack"
          options={{title: '',headerShown: false}}
          component={HomeStack}
        />
        {/* <Tab.Screen name="Stream" options={{title: ''}} component={Stream} />
        <Tab.Screen
          name="AddPost"
          options={{title: '', tabBarVisible: false}}
          component={AddPost}
        />
        <Tab.Screen name="Inbox" options={{title: ''}} component={Inbox} /> */}
        <Tab.Screen
          name="ProfileStack"
          options={{title: '',headerShown: false}}
          component={ProfileStack}
        />
      </Tab.Navigator>
    );
  }


 
export default function Navigation() {
  return (
        <NavigationContainer>
          {/* <Hellow/> */}
            <Stack.Navigator>
           {/* <Stack.Screen
            name="GetReady"
            options={{headerShown: false}}
            component={GetReady}
          />
           <Stack.Screen
            name="ChooseInterest"
            options={{headerShown: false}}
            component={ChooseInterest}
          /> */}
           <Stack.Screen
            name="DashboardTab"
            options={{headerShown: false}}
            component={DashboardTab}
          />
            <Stack.Screen
            name="Comments"
            options={{headerShown: false}}
            component={Comments}
          />
           <Stack.Screen
            name="Search"
            options={{headerShown: false}}
            component={Search}
          />
           <Stack.Screen
            name="LikedBy"
            options={{headerShown: false}}
            component={LikedBy}
          />
            <Stack.Screen
            name="Notification"
            options={{headerShown: false}}
            component={Notification}
          />
           <Stack.Screen
            name="Story"
            options={{headerShown: false}}
            component={Story}
          />
           
          </Stack.Navigator>
        </NavigationContainer>
  )
}
const styles = {
    plusContainer: {
      height: wp('12.5'),
      width: wp('12.5'),
      borderRadius: wp('12.5'),
      backgroundColor: '#0089FF',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: wp('3'),
      elevation: 2,
    },
    plusIcon: {
      height: wp('6'),
      width: wp('6'),
      resizeMode: 'contain',
      tintColor: 'white',
    },
    tabBarIcon: {
      height: wp('6.5'),
      width: wp('6.5'),
      resizeMode: 'contain',
      marginTop: wp('3'),
    },
  };