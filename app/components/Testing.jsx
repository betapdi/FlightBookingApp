import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyCenteredText = () => {
  return (
    // style = {styles.container}
    <View style = {styles.container} className = " justify-center, items-center, bg-[#f0f0f0]">
      <Text style={styles.text}>Hello, Centered Text!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Set your desired background color
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default MyCenteredText;