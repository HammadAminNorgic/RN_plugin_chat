import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ImageBackground,Image} from 'react-native';
import {widthPercentageToDP as wp} from './Helpers';
// import {} from 'react-native-animatable';
import ResponsiveText from './ResponsiveText';
// import Fonts from '../themes/Fonts';
import Button from './Button';

class FollowingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: this.props.following,
    };
  }
  render() {
    const {profile_image, user_name, status} = this.props;
    const {following} = this.state;

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('userProfile', {
            notMe: true,
          })
        }
        style={styles.cardContainer}>
        <View style={styles.innerContainer}>
          <View>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={require('../assets/images/placeholder.png')}
                style={styles.placeholderImage}>
                <Image
                  source={{uri: profile_image}}
                  style={styles.profileImage}
                />
              </ImageBackground>
            </View>
          </View>
          <View style={styles.nameContainer}>
            <ResponsiveText style={styles.name}>{user_name}</ResponsiveText>
            <ResponsiveText style={styles.Status}>{status}</ResponsiveText>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() =>
                this.setState((prev) => ({following: !prev.following}))
              }
              text={following ? 'Unfollow' : 'Follow'}
              containerStyle={[
                styles.followButton,
                {backgroundColor:following? '#0089FF':'white'},
              ]}
              textStyle={{
                fontSize: 3.5,
                color: following?'white':'#0089FF',
                // fontFamily: Fonts.SourceSansProSemiBold,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default FollowingCard;
const styles = {
  cardContainer: {
    height: wp('22'),
    // backgroundColor:'red',
    borderBottomWidth: wp('0.3'),
    borderColor: '#E1E1E1',
    // borderColor:"#white",
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    height: wp('15'),
    flexDirection: 'row',
  },
  imageContainer: {
    height: wp('15'),
    width: wp('15'),
    borderRadius: wp('15'),
    overflow: 'hidden',
  },
  placeholderImage: {
    height: wp('15'),
    width: wp('15'),
  },
  profileImage: {
    height: wp('15'),
    width: wp('15'),
    borderRadius: wp('15'),
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
    width: wp('45'),
    height: wp('16'),
    maxHeight: wp('16'),
    overflow: 'hidden',
    marginTop: wp('1'),
  },
  name: {
    // fontFamily: Fonts.OpenSansRegular,
    fontSize: 4.3,
    maxHeight: wp('5.6'),
    marginBottom: wp('1'),
  },
  Status: {
    // fontFamily: Fonts.OpenSansRegular,
    fontSize: 3.6,
    maxHeight: wp('8'),
    color: '#797979',

    maxWidth: wp('40'),
  },
  buttonContainer: {
    // flexGrow: 1,
    // backgroundColor: 'red',
  },
  followButton: {
    height: wp('8.5'),
    width: wp('25'),
    borderRadius: wp('10'),
    borderWidth: wp('0.4'),
    borderColor: '#0089FF',
    elevation: 0,
    marginTop: wp('1'),
  },
};
