import React from 'react';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import {widthPercentageToDP as wp} from '../../../components/Helpers';
import {Posts} from '../../../components/DummyData';
import SinglePostCard from '../../../components/SinglePostCard';
import ResponsiveText from '../../../components/ResponsiveText';
// import Fonts from '../../../themes/Fonts';

class SinglePost extends React.Component {
  render() {
    let item = Posts[0];
    return (
      <View style={styles.container}>
        <View style={[styles.header,{marginTop:Platform.OS === 'ios'?10:0}]}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backIconContainer}>
            <Image
              source={require('../../../assets/icons/chevron_left.png')}
              style={styles.leftIcon}
            />
          </TouchableOpacity>
          <ResponsiveText style={styles.headerText}>Ellen</ResponsiveText>
        </View>
        <SinglePostCard
          profile_image={item.profile_image}
          user_name={item.user_name}
          post_url={this.props.route.params.postBodyData}
          isVerified={item.isVerified}
          time={item.time}
          likes={item.likes}
          comments={item.comments}
          description={item.description}
          post_type={this.props.route.params.mediaType}
          views={item.views}
          duration={item.duration}
          isLive={item.isLive}
          thumbnail={item.thumbnail}
          navigation={this.props.navigation}
          commentsArray={item.commentsArray}
        />
      </View>
    );
  }
}

export default SinglePost;

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    height: wp('15'),
    flexDirection: 'row',
    alignItems: 'center',

  },
  backIconContainer: {
    height: '100%',
    width: '16%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  leftIcon: {
    height: wp('5'),
    width: wp('5'),
    resizeMode: 'contain',
  },
  headerText:{
    // fontFamily:Fonts.OpenSansRegular,
    color:'#181818',
    fontSize:4.5
  }
};
