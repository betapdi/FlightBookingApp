import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';

export default function MyText(props) {
  return (
    <Text style={[styles.defaultStyle, props.style]}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  // ... add your default style here
  defaultStyle: {
    
  },
});