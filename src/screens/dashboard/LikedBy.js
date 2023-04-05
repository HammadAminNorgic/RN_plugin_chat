import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import ResponsiveText from '../../components/ResponsiveText';
import {widthPercentageToDP as wp} from '../../components/Helpers';
// import Fonts from '../../themes/Fonts';
import {followersData} from '../../components/DummyData';
// import FollowersCard from '../../components/FollowersCard';
import LikedByCard from '../../components/LikedByCard';

class LikedBy extends React.Component {
  render() {
    return (
      <Container style={{flex: 1}}>
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
            <ResponsiveText style={styles.headertitle}>Liked By</ResponsiveText>
          }
          // bodyStyle={{marginLeft:-wp('40')}}
        />
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
                navigation={this.props.navigation}
              />
            );
          }}
          keyExtractor={(item, index) => `${index}`}
        />
      </Container>
    );
  }
}

export default LikedBy;

const styles = {
  header: {marginBottom:5},
  leftIconContainer: {
    paddingVertical: 7,
    paddingRight:7,
    // backgroundColor:'red'
  },
  HeaderleftIcon: {
    height: wp('3.5'),
    width: wp('3.5'),
    resizeMode: 'contain'
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
};
