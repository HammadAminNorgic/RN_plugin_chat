import React from 'react';
import {ScrollView, View, Dimensions, KeyboardAvoidingView} from 'react-native';

export default class Content extends React.Component {
  render() {
    const style = this.props.style ? this.props.style : [];
    const contentContainerStyle= this.props.contentContainerStyle ? this.props.contentContainerStyle : [];
    if (this.props.keyboardAvoidingView) {
      return (
        <KeyboardAvoidingView
          behavior={'padding'}
          style={[styles.container, style]}
          refreshControl={this.props.refreshControl}
          showsVerticalScrollIndicator={false}>
          <View
            enabled={true}
            style={[styles.container, style]}>
            {this.props.children}
          </View>
        </KeyboardAvoidingView>
      );
    }
    return (
      <ScrollView
      contentContainerStyle={[styles.contentContainerStyle, contentContainerStyle]}
        style={[styles.container, style]}
        refreshControl={this.props.refreshControl}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.container, style]}>{this.props.children}</View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  contentContainerStyle:{
    flexGrow:1
  }
};
