import React from 'react';
import {TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {widthPercentageToDP as wp} from './Helpers';


import ResponsiveText from './ResponsiveText';

const Button = (props) => {
  const {
    loading,
    disabled,
    onPress,
    containerStyle,
    leftIcon,
    leftIconStyle,
    text,
    textStyle,
    rightIcon,
    rightIconStyle,
  } = props;
  return (
    <TouchableOpacity
      disabled={loading || disabled}
      onPress={onPress}
      style={[styles.ButtonStyle, containerStyle]}>
      {leftIcon && (
        <View style={[styles.leftStyle, leftIconStyle]}>{leftIcon}</View>
      )}
      {/* ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'], */}
      {(loading && (
      <ActivityIndicator color={'white'} size={wp(10)}/>
      )) ||
        (text && (
          <ResponsiveText style={{...styles.textStyle, ...textStyle}}>
            {text}
          </ResponsiveText>
        ))}
      {rightIcon && (
        <View style={[styles.leftStyle, rightIconStyle]}>{rightIcon}</View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = {
  ButtonStyle: {
    height: wp('13%'),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#190354',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textStyle: {
    color: 'white',
    // fontFamily: Fonts.RobotoMedium,
  },
  leftStyle: {},
};
