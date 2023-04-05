import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import Container from '../../components/Container';
// import {widthPercentageToDP as wp} from './';
import ResponsiveText from '../../components/ResponsiveText';
import Button from '../../components/Button';
// import Fonts from '../../themes/Fonts';
import {CommonActions} from '@react-navigation/native';
import { widthPercentageToDP as wp } from '../../components/Helpers';

class ChooseInterest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [
        'Health',
        'Food',
        'DIY',
        'Outdoors',
        'Advice',
        'Pics & GIFs',
        'Science',
        'Animals',
        'Art',
        'Electronics',
        'Tech',
        'Entertainment',
        'Relationships',
        'TV',
        'Fashion',
        'Gaming',
        'News',
        'Funny',
        'Photography',
        'Videos',
        'Video Games',
        'Writing',
        'Fitness',
      ],
      selected: [],
    };
  }
  togglePress = async (item) => {
    let selected = this.state.selected.concat(item);
    let deselected = this.state.selected;
    if (this.state.selected.includes(item)) {
      deselected.splice(deselected.indexOf(item), 1);
      this.setState({selected: deselected});
    } else {
      this.setState({selected: selected});
    }
  };
  render() {
    return (
      <Container style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.header}>
            <View style={{width: wp('13')}} />
            <Image
              source={require('../../assets/icons/logo.png')}
              style={styles.logo}
            />
            <TouchableOpacity>
              <ResponsiveText style={styles.skip}>SKIP</ResponsiveText>
            </TouchableOpacity>
          </View>
          <ResponsiveText style={styles.ChooseText}>
            Choose some interests to personalize your feed
          </ResponsiveText>

          <View style={styles.itemscontainer}>
            {this.state.array.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.togglePress(item)}
                  style={[
                    styles.singleItem,
                    {
                      backgroundColor: this.state.selected.includes(item)
                        ? 'rgba(0,137,245,1)'
                        : 'rgba(0,137,245,.05)',
                    },
                  ]}>
                  <ResponsiveText
                    style={{
                      color: this.state.selected.includes(item)
                        ? 'white'
                        : 'black',
                    //   fontFamily: Fonts.OpenSansSemiBold,
                    }}>
                    {item}
                  </ResponsiveText>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        <Button
          text={'Continue'}
          containerStyle={styles.continuebutton}
          textStyle={styles.continuebuttonText}
          onPress={() => {
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'DashboardTab',
                  },
                ],
              }),
            );
          }}
        />
      </Container>
    );
  }
}

export default ChooseInterest;

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
  header: {
    marginTop: wp('7'),
    height: wp('18'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5'),
    width: wp('100'),
  },
  logo: {
    height: wp('13'),
    width: wp('13'),
    resizeMode: 'contain',
  },
  skip: {color: '#3A3A3A',
//    fontFamily: Fonts.SourceSansProSemiBold
},
  ChooseText: {
    width: wp('90'),
    alignSelf: 'center',
    fontSize: 5,
    textAlign: 'center',
    marginTop: wp('2'),
    // fontFamily: Fonts.OpenSansRegular,
    color: 'black',
  },
  itemscontainer: {
    width: wp('90'),
    alignSelf: 'center',
    marginTop: '10%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // flexGrow: 1,
  },
  continuebutton: {
    position: 'absolute',
    width: wp('80'),
    height: wp('15'),
    backgroundColor: '#0089FF',
    elevation: 0,
    bottom: '6%',
    alignSelf: 'center',
  },
  continuebuttonText: {
    // fontFamily: Fonts.SourceSansProSemiBold,
    fontSize: 4.5,
  },
  singleItem: {
    paddingHorizontal: 12,
    paddingVertical: 6.5,
    borderRadius: wp('5'),
    marginBottom: wp('2'),
    marginLeft: wp('2'),
  },
};
