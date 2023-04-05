import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity, Platform,
} from 'react-native';
import Container from '../../components/Container';
// import {widthPercentageToDP as wp} from '';
import ResponsiveText from '../../components/ResponsiveText';
import {CommonActions} from '@react-navigation/native';
import { widthPercentageToDP as wp } from '../../components/Helpers';
// import Fonts from '../../themes/Fonts';
class GetReady extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
      code: '',
    };
  }
  render() {
    return (
      <Container style={{flex: 1}}>
        {/* <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={[styles.backContainer,{top: Platform.OS === 'ios'?30:10}]}>
          <Image
            source={require('../../assets/icons/chevron_left.png')}
            style={styles.left}
          />
        </TouchableOpacity> */}
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.topContainer}>
            <ResponsiveText style={styles.ReadyText}>
              Get Ready !
            </ResponsiveText>
            <Image
              source={require('../../assets/icons/artwork.png')}
              style={styles.image}
            />

            <ResponsiveText style={styles.descriptionText}>
              Enable Permission to gain full access
            </ResponsiveText>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'ChooseInterest',
                    },
                  ],
                }),
              );
            }}
            style={styles.button}>
            <Image
              source={require('../../assets/icons/chevron_right_round.png')}
              style={styles.right}
            />
          </TouchableOpacity>
        </ScrollView>
      </Container>
    );
  }
}

export default GetReady;

const styles = {
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: wp('25'),
    paddingBottom: wp('5'),
    justifyContent: 'space-between',
  },
  ReadyText: {
    fontSize: 6.5,
    // fontFamily: Fonts.SourceSansProSemiBold,
    marginBottom: wp('4'),
  },

  backContainer: {
    alignSelf: 'flex-start',
    padding: wp('3'),
    position: 'absolute',
    top: 10,
    left: 0,
    zIndex: 10,
  },
  left: {
    height: wp('6'),
    width: wp('10'),
    resizeMode: 'contain',
    tintColor: 'black',
  },
  image: {
    height: '60%',
    width: wp('70'),
  },
  button: {
    height: wp('18'),
    width: wp('18'),
    borderRadius: wp('18'),
    backgroundColor: '#0089FF',
    marginBottom: wp('10'),
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    height: wp('8'),
    width: wp('8'),
    tintColor: 'white',
    resizeMode: 'contain',
  },
  descriptionText: {
    fontSize: 5.1,
    width: wp('80'),
    textAlign: 'center',
    color: '#9E9E9E',
    // marginBottom: wp('5'),
    // fontFamily: Fonts.OpenSansRegular,
  },
};
