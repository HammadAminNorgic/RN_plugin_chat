import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import Container from '../../../components/Container';
import {widthPercentageToDP as wp} from '../../../components/Helpers';
import LocationCard from '../../../components/LocationCard';
import {Hashtags, Locations} from '../../../components/DummyData';
import ResponsiveText from '../../../components/ResponsiveText';

export default function Location(props) {
  const [locations, setLocations] = useState([]);
  console.log(props)
  useEffect(() => {
    setLocations(
      props.searchText === 0
        ? Locations
        : Locations.filter((item) =>
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
        data={locations}
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
            <LocationCard
              key={index}
              Locations={item}
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
