import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {widthPercentageToDP as wp} from '../../../components/Helpers';
import {ImagesData} from '../../../components/DummyData';
// import VideoCard from '../../../components/VideoCard';

class Images extends React.Component {
  render() {
    return (
      <FlatList
        // horizontal
        nestedScrollEnabled={false}
        numColumns={3}
        horizontal={false}
        contentContainerStyle={{
          backgroundColor: 'white',
          paddingTop: wp('0.45'),
        }}
        showsVerticalScrollIndicator={false}
        data={ImagesData}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('SinglePost', {
                  postBodyData: item,
                  mediaType: 'Image',
                })
              }>
              <Image
                source={
                  item
                    ? {uri: item}
                    : require('../../../assets/images/placeholderthumbnail.jpg')
                }
                style={styles.image}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  }
}

export default Images;

const styles = {
  container: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
  image: {
    height: wp('45'),
    width: wp('33'),
    marginRight: wp('0.3'),
    marginBottom: wp('0.3'),
    backgroundColor: '#E1E1E1',
  },
};
