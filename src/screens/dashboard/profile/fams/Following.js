import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {widthPercentageToDP as wp} from '../../../../components/Helpers';
import Container from '../../../../components/Container';
import {followersData} from '../../../../components/DummyData';
// import FollowersCard from '../../../../components/FollowersCard';
import FollowingCard from '../../../../components/FollowingCard';

class Following extends React.Component {
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
              <FollowingCard
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

export default Following;

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
