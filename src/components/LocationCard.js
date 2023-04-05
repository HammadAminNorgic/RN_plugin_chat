import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {widthPercentageToDP as wp} from './Helpers';
import ResponsiveText from './ResponsiveText';
// import Fonts from '../themes/Fonts';

class LocationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {Locations} = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Home')}
        style={styles.cardContainer}>
        <View style={styles.innerContainer}>
          <View>
            <View style={styles.HashContainer}>
              <Image
                source={require('../assets/icons/locationPin.png')}
                style={styles.hashtag}
              />
            </View>
          </View>
          <View style={styles.HashNameContainer}>
            <ResponsiveText style={styles.HashTagText}>
              {Locations}
            </ResponsiveText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default LocationCard;
const styles = {
  cardContainer: {
    height: wp('23'),
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
  HashContainer: {
    height: wp('15'),
    width: wp('15'),
    borderRadius: wp('15'),
    overflow: 'hidden',
    backgroundColor: '#E6F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  HashNameContainer: {
    marginLeft: wp('4.5'),
    // flexGrow:1,
    width: wp('45'),
    height: wp('15'),
    maxHeight: wp('14'),
    overflow: 'hidden',
    // marginTop: wp('1'),
    justifyContent: 'center',
  },
  HashTagText: {
    // fontFamily: Fonts.OpenSansRegular,
    fontSize: 4.3,
  },
  hashtag: {
    height: '50%',
    width: '50%',
    resizeMode: 'contain',
    tintColor: '#008AFF',
  },
};
