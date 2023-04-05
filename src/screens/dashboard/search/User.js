import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {widthPercentageToDP as wp} from '../../../components/Helpers';
import Container from '../../../components/Container';
import {followersData} from '../../../components/DummyData';
import FollowersCard from '../../../components/FollowersCard';
// import FollowingCard from '../../../components/FollowingCard';
import ResponsiveText from '../../../components/ResponsiveText';

export default function User(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(
      props.searchText === 0
        ? followersData
        : followersData.filter((item) =>
            item.user_name.toLowerCase().startsWith(searchText.toLowerCase()),
          ),
    );
    console.log('hi===>', users, props.searchText);
  }, [props.searchText]);
  const {searchText} = props;
  return (
    <Container style={{flex: 1}}>
      <View style={{height: wp('0.3'), backgroundColor: '#EAEAEA'}} />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: wp('5.5'),
          paddingTop: wp('4'),
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: wp('55'),
              }}>
              <ResponsiveText style={{color: 'grey'}}>
                No Result found !
              </ResponsiveText>
            </View>
          );
        }}
        data={users}
        renderItem={({item, index}) => {
          return (
            <FollowersCard
              key={index}
              profile_image={item.profile_image}
              user_name={item.user_name}
              status={item.status}
              following={item.following}
              navigation={props.navigation}
            />
          );
        }}
        keyExtractor={(item, index) => `${index}`}
      />
    </Container>
  );
}

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
