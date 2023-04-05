import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP as wp} from './Helpers';
import ResponsiveText from './ResponsiveText';
// import Fonts from '../themes/Fonts';

class StoryCard extends React.Component {
  render() {
    const {profile_image, user_name, post_url} = this.props;
    console.log(user_name.length);
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Story', {
            myStory: false,
          })
        }
        style={styles.container}>
        <Image source={{uri: post_url}} style={styles.image} />

        <View style={styles.infoContainer}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('userProfile', {
                notMe: true,
              })
            }>
            <Image source={{uri: profile_image}} style={styles.profileImage} />
          </TouchableOpacity>
          <ResponsiveText style={styles.name}>
            {user_name.length < 12
              ? user_name
              : `${user_name.substring(0, 10)}...`}
          </ResponsiveText>
        </View>
      </TouchableOpacity>
    );
  }
}

export default StoryCard;

const styles = {
  container: {
    height: wp('39'),
    borderRadius: wp('3.5'),
    width: wp('32'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('4'),
    overflow: 'hidden',
    backgroundColor: '#3C3F41',
  },
  image: {
    height: wp('39'),
    width: wp('32'),
    opacity: 0.7,
    // backgroundColor: '#FBFBFB',

    // backgroundColor: 'rgba(0,0,0)',
  },
  infoContainer: {
    // height:wp('10'),
    width: '100%',
    position: 'absolute',
    bottom: wp('2.5'),
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('2.5'),
  },
  profileImage: {
    height: wp('8'),
    width: wp('8'),
    borderWidth: wp('0.4'),
    borderColor: '#0089FF',
    borderRadius: wp('8'),
    marginRight: wp('1.5'),
    backgroundColor: '#F2F9FF',
  },
  name: {
    fontSize: 3,
    color: 'white',
    // fontFamily: Fonts.RobotoRegular,
    // backgroundColor: 'rgba(0,0,0,0.4)',
  },
};
