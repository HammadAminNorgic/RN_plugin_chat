import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import Container from '../../../components/Container';
import {widthPercentageToDP as wp} from '../../../components/Helpers';
import {followersData, Hashtags} from '../../../components/DummyData';
import HashtagCard from '../../../components/HashtagCard';
import ResponsiveText from '../../../components/ResponsiveText';

export default function HashTag(props) {
  const [hashTags, setHashTags] = useState([]);
  useEffect(() => {
    setHashTags(
      props.searchText === 0
        ? Hashtags
        : Hashtags.filter((item) =>
            item.toLowerCase().startsWith(props.searchText.toLowerCase()),
          ),
    );
  }, [props.searchText]);
  return (
    <Container style={{flex: 1}}>
      <View style={{height: wp('0.3'), backgroundColor: '#EAEAEA'}} />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: wp('5.5'),
          paddingTop: wp('4'),
        }}
        data={hashTags}
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
        renderItem={({item, index}) => {
          return (
            <HashtagCard
              key={index}
              Hashtag={item}
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
