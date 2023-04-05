import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import ResponsiveText from '../../components/ResponsiveText';
import {widthPercentageToDP as wp} from '../../components/Helpers';
// import Fonts from '../../themes/Fonts';
import {Chats, Notifications} from '../../components/DummyData';
// import ChatCard from '../../components/ChatCard'
import NotificationCard from '../../components/NotificationCard';

class Notification extends React.Component {
  render() {
    return (
      <Container style={{flexGrow: 1}}>
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
            <ResponsiveText style={styles.headertitle}>
              Notification
            </ResponsiveText>
          }
        />
        <View style={styles.clearFix} />
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: wp('5.5'),
            paddingTop: wp('4'),
          }}
          data={Notifications}
          renderItem={({item, index}) => {
            return <NotificationCard notificationData={item}
            navigation={this.props.navigation}
            />;
          }}
          keyExtractor={(item, index) => `${index}`}
        />
      </Container>
    );
  }
}

export default Notification;

const styles = {
  header: {},
  leftIconContainer: {
    padding: 7,
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
  clearFix: {
    height: wp('0.4'),
    backgroundColor: '#E1E1E1',
    // elevation:
    // marginBottom:wp('4')
  },
};
