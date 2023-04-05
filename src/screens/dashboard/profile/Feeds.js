import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {widthPercentageToDP as wp} from '../../../components/Helpers';
import {Posts} from '../../../components/DummyData';
import PostCard from '../../../components/PostCard';

class Feeds extends React.Component {
  render() {
    console.log('scroll testing=>', this.props.scrollenable);
    return (
      <FlatList
        nestedScrollEnabled={false}
        contentContainerStyle={{backgroundColor: 'white', paddingTop: wp('5')}}
        showsVerticalScrollIndicator={false}
        data={Posts}
        renderItem={({item, index}) => {
          return (
            <PostCard
              key={index}
              profile_image={item.profile_image}
              user_name={item.user_name}
              post_url={item.post_url}
              isVerified={item.isVerified}
              time={item.time}
              likes={item.likes}
              comments={item.comments}
              description={item.description}
              post_type={item.post_type}
              views={item.views}
              duration={item.duration}
              isLive={item.isLive}
              thumbnail={item.thumbnail}
              navigation={this.props.navigation}
            />
          );
        }}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  }
}

export default Feeds;

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
};
