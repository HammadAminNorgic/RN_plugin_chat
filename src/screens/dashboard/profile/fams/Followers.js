import React from 'react';
import {View, Text, FlatList} from 'react-native';
import Container from '../../../../components/Container';
import {widthPercentageToDP as wp} from '../../../../components/Helpers';
import {Chats, followersData} from '../../../../components/DummyData';
// import ChatCard from '../../../../components/ChatCard';
import FollowersCard from '../../../../components/FollowersCard';

class Followers extends React.Component {
  render() {
    return (
      <Container style={{flex: 1}}>
        <View style={{height: wp('0.3'), backgroundColor: '#EAEAEA'}} />
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: wp('5.5'),
            paddingTop: wp('4'),
          }}
          data={followersData}
          renderItem={({item, index}) => {
            return (
              <FollowersCard
                key={index}
                profile_image={item.profile_image}
                user_name={item.user_name}
                status={item.status}
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

export default Followers;

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
};
