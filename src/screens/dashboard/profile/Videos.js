import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {widthPercentageToDP as wp} from '../../../components/Helpers';
import {VideoData} from '../../../components/DummyData';
// import PostCard from '../../../components/PostCard';
import VideoCard from '../../../components/VideoCard';

class Videos extends React.Component {
  render() {
    return (
      <View style={{backgroundColor: 'green'}}>
        <FlatList
          nestedScrollEnabled={true}
          contentContainerStyle={{
            backgroundColor: 'white',
            paddingTop: wp('5'),
            paddingHorizontal: wp('4'),
          }}
          showsVerticalScrollIndicator={false}
          data={VideoData}
          renderItem={({item, index}) => {
            return (
              <VideoCard
                key={index}
                thumbnail={item.thumbnail}
                duration={item.duration}
                title={item.title}
                time={item.time}
                comments={item.comments}
                likes={item.likes}
                views={item.views}
                navigation={this.props.navigation}
              />
            );
          }}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    );
  }
}

export default Videos;

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
};
