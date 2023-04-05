import React from 'react';
import {Text} from 'react-native';
import {widthPercentageToDP as wp} from './Helpers';

const ResponsiveText =(props)=> {
    const {style, children,numberOfLines} = props;
    let fontSize = wp('4%');
    if (style && style.fontSize) {
      fontSize = wp(style.fontSize);
    }
    return (
      <Text
      numberOfLines={numberOfLines}
        style={{
          ...styles.text,
          ...props.style,
          ...{fontSize},
        }}>
        {children}
      </Text>
    );
  }

  export default ResponsiveText;

const styles = {
  text: {
    color: 'black',
    // fontFamily:Fonts.RobotoRegular
  },
};
