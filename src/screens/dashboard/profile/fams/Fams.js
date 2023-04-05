import React from 'react';
import {View, Text, Image} from 'react-native';
import {widthPercentageToDP as wp} from '../../../../components/Helpers';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Container from '../../../../components/Container';
import InputField from '../../../../components/InputField';
import AppHeader from '../../../../components/AppHeader';
// import Fonts from '../../../../themes/Fonts';
import Followers from './Followers';
import Following from './Following';

const Tab = createMaterialTopTabNavigator();
function FollowerTab() {
  return (
    <Tab.Navigator
      // swipeEnabled={false}
      tabBarOptions={{
        activeTintColor: '#0089FF',
        inactiveTintColor: '#AEAEAE',
        labelStyle: {
          // fontFamily: Fonts.RobotoBold, 
          textTransform: 'capitalize'},
        // tabStyle: {paddingHorizontal: wp(3)},
        style: {
          marginHorizontal: wp('10'),
          borderColor: 'white',
          elevation: 0,
          // borderBottomColor: '#EAEAEA',
          // borderBottomWidth: wp('0.3'),
        },
        indicatorStyle: {
          height: wp('1'),
          borderRadius: wp('5'),
          backgroundColor: '#0089FF',
          // marginRight: wp('10'),
          alignSelf: 'center',
          // width: wp('40'),
          // marginLeft: wp('10'),
        },
      }}>
      <Tab.Screen name="Followers" component={Followers} />
      <Tab.Screen name="Following" component={Following} />
    </Tab.Navigator>
  );
}

class Fams extends React.Component {
  render() {
    return (
      <Container style={{flex: 1}}>
        <AppHeader
          left={
            <Image
              source={require('../../../../assets/icons/left_chevron2.png')}
              style={styles.headerLeftIcon}
            />
          }
          leftPress={() => this.props.navigation.goBack()}
          body={
            <InputField
              leftIcon={
                <Image
                  source={require('../../../../assets/icons/search.png')}
                  style={styles.searchIcon}
                />
              }
              inputField={styles.searchText}
              containerStyle={styles.headerSearchbar}
              placeholder={'Search'}
            />
          }
        />

        <FollowerTab />

      </Container>
    );
  }
}

export default Fams;

const styles = {
  headerLeftIcon: {
    height: wp('4.5'),
    width: wp('4.5'),
    resizeMode: 'contain',
    tintColor: '#3A3A3A',
  },
  headerSearchbar: {
    width: wp('77'),
    height: wp('11'),
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
    marginLeft: wp('1'),
  },
  searchText: {
    // fontFamily: Fonts.RobotoBold,
    fontSize: wp('3.5'),
    marginLeft: -wp('1.5'),
  },
};
