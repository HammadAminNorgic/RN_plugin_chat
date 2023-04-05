import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Modal,
  FlatList,
  Text,
  Platform,
} from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import ResponsiveText from '../../../components/ResponsiveText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen/index';
import Fonts from '../../../themes/Fonts';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import {CodesList} from '../../../components/countryWithFlag/CountryCodes';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Picture',
  quality: 0.75,
  storageOptions: {
    skipBackup: true,
  },
};

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryName: 'Poland',
      countryFlag: '🇵🇱',
      countryModal: false,
      date: 1134197088731,
      showDatePicker: false,
      showGenderModal: false,
      gender: 'Male',
      Image: '',
    };
  }

  countryFlagHandler = (flag, name) => {
    this.setState({countryName: name, countryFlag: flag, countryModal: false});
  };
  getImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let ImgSource = {
          name:
            response.fileName !== null ? response.fileName : response.fileName,
          type: 'image/*',
          uri: response
            ? Platform.OS === 'android'
              ? response.uri
              : response.uri.replace('file://', '')
            : null,
        };
        if (!ImgSource.name) {
          ImgSource.name = 'img';
        }
        const source = {uri: response.uri};

        this.setState({Image: ImgSource});
      }
    });
  };

  render() {
    console.log('image==>', this.state.Image);
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Container statusBarColor={'#0089FF'} barStyle={'light-content'}>
          <AppHeader
            titleLeftAlign
            containerStyle={styles.header}
            left={
              <View style={styles.leftIconContainer}>
                <Image
                  source={require('../../../assets/icons/left_chevron2.png')}
                  style={styles.HeaderleftIcon}
                />
              </View>
            }
            leftPress={() => this.props.navigation.goBack()}
            body={
              <ResponsiveText style={styles.headertitle}>
                Edit Profile
              </ResponsiveText>
            }
          />

          <View style={styles.imageContainerBox}>
            <View style={styles.imageBoxTopContainer} />
            <View style={styles.imageBoxBottomContainer} />
            <TouchableOpacity
              onPress={this.getImage}
              style={styles.imageContainer}>
              <Image
                source={
                  this.state.Image
                    ? {uri: this.state.Image.uri}
                    : require('../../../assets/images/model.jpg')
                }
                style={styles.image}
              />
              <Image
                source={require('../../../assets/icons/camera.png')}
                style={styles.cameraIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.formContent}>
            <ResponsiveText style={styles.fieldHeading}>
              User Name
            </ResponsiveText>
            <InputField
              inputField={styles.inputInternalStyle}
              containerStyle={styles.nameInput}
              value={'Viktoh'}
            />
            {this.state.showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date(1134197088731)}
                mode={'date'}
                display="spinner"
                onChange={(event, date) => {
                  console.log(event, date);
                  if (date) {
                    this.setState({
                      date: event.nativeEvent.timestamp,
                      showDatePicker: false,
                    });
                  }

                  this.setState({
                    // date: event.nativeEvent.timestamp,
                    showDatePicker: false,
                  });
                }}
              />
            )}
            <ResponsiveText style={styles.fieldHeading}>Email</ResponsiveText>
            <InputField
              inputField={styles.inputInternalStyle}
              containerStyle={styles.nameInput}
              value={'Viktoh@gmail.com'}
              keyboardType={'email-address'}
            />
            <ResponsiveText style={styles.fieldHeading}>
              Phone Number
            </ResponsiveText>
            <InputField
              inputField={styles.inputInternalStyle}
              containerStyle={styles.nameInput}
              value={'+3721234567'}
              keyboardType={'phone-pad'}
            />
            <ResponsiveText style={styles.fieldHeading}>Gender</ResponsiveText>
            <TouchableOpacity
              onPress={() => this.setState({showGenderModal: true})}>
              <InputField
                inputField={styles.inputInternalStyle}
                containerStyle={styles.nameInput}
                value={this.state.gender}
                editable={false}
                right={
                  <Image
                    style={styles.downIcon}
                    source={require('../../../assets/icons/chev_down2.png')}
                  />
                }
              />
            </TouchableOpacity>

            <ResponsiveText style={styles.fieldHeading}>
              Date of Birth
            </ResponsiveText>
            <TouchableOpacity
              onPress={() => this.setState({showDatePicker: true})}>
              <InputField
                inputField={styles.inputInternalStyle}
                containerStyle={styles.nameInput}
                value={`${new Date(this.state.date).getDate().toString()}-${(
                  new Date(this.state.date).getMonth() + 1
                ).toString()}-${new Date(this.state.date)
                  .getFullYear()
                  .toString()}`}
                editable={false}
                right={
                  <Image
                    style={styles.downIcon}
                    source={require('../../../assets/icons/chev_down2.png')}
                  />
                }
              />
            </TouchableOpacity>
            <ResponsiveText style={styles.fieldHeading}>Country</ResponsiveText>
            <View style={styles.nameInput}>
              <TouchableOpacity
                onPress={() => this.setState({countryModal: true})}>
                <InputField
                  inputField={[styles.inputInternalStyle]}
                  containerStyle={[styles.nameInput, {marginBottom: 0}]}
                  value={`${this.state.countryName}   ${this.state.countryFlag}`}
                  editable={false}
                  right={
                    <Image
                      style={styles.downIcon}
                      source={require('../../../assets/icons/chev_down2.png')}
                    />
                  }
                />
              </TouchableOpacity>
            </View>
            <ResponsiveText style={styles.fieldHeading}>
              Description
            </ResponsiveText>
            <InputField
              inputField={[
                styles.inputInternalStyle,
                {height: hp('14'), fontFamily: Fonts.SourceSansProRegular},
              ]}
              containerStyle={[styles.nameInput, {height: hp('14')}]}
              multiline={true}
              value={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod euismod tellus quis hendrerit non, in nam nam. Tristique egestas gravida imperdiet tellus sed. Adipiscing sagittis, sem tellus aliquet convallis pretium quisque blandit libero. Turpis vulputate neque risus, id.'
              }
            />
            <Button
              text={'Save'}
              containerStyle={styles.Continuebutton}
              textStyle={styles.ContinuebuttonText}
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
        </Container>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.countryModal}
          onRequestClose={() => {
            this.setState({countryModal: false});
          }}>
          <SafeAreaView style={styles.modalContainerStyle}>
            <View style={styles.viewStyle1}>
              <View style={styles.countryModalHeader}>
                <ResponsiveText style={styles.countryModalHeaderText}>
                  Select Country
                </ResponsiveText>
                <TouchableOpacity
                  onPress={() => this.setState({countryModal: false})}>
                  <Image
                    source={require('../../../assets/icons/cross.png')}
                    style={styles.crossIcon}
                  />
                </TouchableOpacity>
              </View>

              <View style={{paddingHorizontal: 20}} />
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  paddingHorizontal: 20,
                }}>
                <FlatList
                  data={CodesList}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          this.countryFlagHandler(item.flag, item.name)
                        }
                        style={{
                          flexDirection: 'row',
                          paddingVertical: 3,
                          flex: 1,
                        }}>
                        <View style={{justifyContent: 'center'}}>
                          <Text style={{fontSize: 24}}>{item.flag}</Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            marginLeft: 20,
                          }}>
                          <Text style={{fontSize: 16}}>{item.name}</Text>
                        </View>
                        <View
                          style={{justifyContent: 'center', marginLeft: 16}}>
                          <Text style={{fontSize: 16}}>{item.dial_code}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(item) => item.name}
                />
              </View>
            </View>
          </SafeAreaView>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.showGenderModal}
          onRequestClose={() => {
            this.setState({showGenderModal: false});
          }}>
          <View style={styles.genderModalContainer}>
            <View style={styles.genderModalInnerContainer}>
              <View style={styles.genderModalHeader}>
                <ResponsiveText style={styles.genderModalHeaderText}>
                  Select Gender
                </ResponsiveText>
                <TouchableOpacity
                  onPress={() => this.setState({showGenderModal: false})}>
                  <Image
                    source={require('../../../assets/icons/cross.png')}
                    style={[styles.crossIcon, {height: wp('4'), width: wp(4)}]}
                  />
                </TouchableOpacity>
              </View>
              <View style={{flexGrow: 1, justifyContent: 'center'}}>
                {['Male', 'Female'].map((item) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({gender: item, showGenderModal: 'false'})
                      }
                      key={item}
                      style={styles.modalSingleItem}>
                      <ResponsiveText>{item}</ResponsiveText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

export default EditProfile;

const styles = {
  container: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#0089FF',
    marginTop: 0,
    marginBottom: 0,
    // paddingTop: wp('2'),
  },
  leftIconContainer: {
    paddingVertical: 7,
    paddingRight: 7,
  },
  HeaderleftIcon: {
    height: wp('3.5'),
    width: wp('3.5'),
    resizeMode: 'contain',
    tintColor: 'white',
    // backgroundColor: 'red'
  },
  headertitle: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 4.5,
    color: 'white',
  },
  imageContainerBox: {
    height: hp('18'),
    backgroundColor: '#0089FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBoxTopContainer: {
    height: hp('9'),
    width: '100%',
    backgroundColor: '#0089FF',
  },
  imageBoxBottomContainer: {
    height: hp('9'),
    width: '100%',

    backgroundColor: 'white',
  },
  imageContainer: {
    height: wp('23'),
    width: wp('23'),
    borderRadius: wp('23'),
    // backgroundColor: 'red',
    position: 'absolute',

    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    height: wp('23'),
    width: wp('23'),
    borderRadius: wp('23'),
    flex: 1,
    // backgroundColor:'red'
  },
  cameraIcon: {
    height: 23,
    width: 23,
    resizeMode: 'contain',
    position: 'absolute',
  },
  formContent: {
    paddingHorizontal: wp('5.5'),
  },
  fieldHeading: {
    fontSize: 3.5,
    color: '#A6A6A6',
    fontFamily: Fonts.OpenSansRegular,
  },
  nameInput: {
    // width: wp('80'),
    // paddingHorizontal: wp('1'),
    marginBottom: hp('2.5'),
    borderWidth: 0,
    borderBottomWidth: wp('0.3'),
    borderBottomColor: '#E1E1E1',
    borderRadius: 0,
    height: hp('4.5'),
    paddingHorizontal: 0,
    paddingLeft: 0,
    // backgroundColor: 'red',
  },
  inputInternalStyle: {
    color: 'black',
    paddingHorizontal: 0,
    fontSize: wp(3.3),
    fontFamily: Fonts.OpenSansRegular,
    // width:'100%',
  },
  Continuebutton: {
    width: wp('80'),
    height: wp('15'),
    backgroundColor: '#0089FF',
    elevation: 0,
    alignSelf: 'center',
    marginTop: wp('2'),
    marginBottom: wp('6'),
  },
  ContinuebuttonText: {
    fontSize: 5,
    fontFamily: Fonts.SourceSansProSemiBold,
  },
  downIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
  modalContainerStyle: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  viewStyle1: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  containerStyle: {
    // height: 40,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    // borderRadius: 50,
    // paddingHorizontal: 10
  },
  inputStyle1: {
    color: '#000',
    fontSize: 20,
    // height: 40,
    flex: 1,
    width: '100%',
    // borderWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  leftIconStyle: {
    // paddingLeft: 5,
    marginRight: 8,
    alignSelf: 'center',
    width: 30,
  },
  rightIconStyle: {
    // paddingRight: 5,
    paddingLeft: 10,
    alignSelf: 'center',
  },
  errorStyle: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 6,
    // paddingLeft: 20
    // display: 'none',
  },
  searchStyle: {
    color: '#000',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  countryModalHeaderText: {
    alignSelf: 'center',
    fontSize: 5,
    paddingVertical: wp('5'),
    fontFamily: Fonts.RobotoBold,
  },
  countryModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5'),
  },
  crossIcon: {
    height: wp('5'),
    width: wp('5'),
    resizeMode: 'contain',
    tintColor: 'black',
  },
  genderModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderModalInnerContainer: {
    height: wp('65'),
    width: wp('65'),
    backgroundColor: 'white',
    borderRadius: wp('1'),
    paddingHorizontal: wp('5'),
    paddingVertical: wp('5'),
  },
  genderModalHeaderText: {
    fontFamily: Fonts.RobotoBold,
  },
  genderModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalSingleItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp('2'),
    borderBottomWidth: wp('0.1'),
    borderBottomColor: '#E1E4E8',
    borderTopWidth: wp('0.1'),
    borderTopColor: '#E1E4E8',
  },
};
