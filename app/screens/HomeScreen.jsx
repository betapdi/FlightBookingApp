import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SearchBar } from '@rneui/themed';

const HomeScreen = () => {
  return (
    <View className = "bg-[#E5E5E5] h-full">
      <Text className = "ml-5 mt-20 text-xl font-pmedium" >Explore the beautiful world!</Text>
      <SearchBar containerStyle = {styleContainer.searchBarContainer} 
        inputContainerStyle = {styleContainer.searchBarInput}
        placeholder='Search here...' 
        round
        />

      <Text className = "mt-10 text-xl">Booking Services</Text>
      <View className = "flex-auto">
      </View>
    </View>
  )
}

styleContainer = StyleSheet.create({
  searchBarContainer: {
    marginTop: 10,
    backgroundColor: '#E5E5E5',
    padding: 0,
    marginLeft: 5,
    marginRight: 5,
    borderColor: 'transparent',
  },

  searchBarInput: {
    backgroundColor: 'white',
  },
})

export default HomeScreen