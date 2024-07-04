import { StyledView, StyledText } from '../components/StyledComponents';
import { Box } from '../components/Box';
import { Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ToastAndroid } from 'react-native';
import { router } from 'expo-router';


const index = () => {
  const [searchValue, setSearchValue] = useState("");
  const updateSearch = (value) => {
    setSearchValue(value)
  }

  const handleSearchSubmit = (value) => {
    // console.log(value);
    ToastAndroid.show(value, ToastAndroid.LONG);
  }

  return (
    <StyledView>
      <StyledText className = "ml-5 mt-10 text-xl font-pmedium" >Explore the beautiful world!</StyledText>
      <SearchBar containerStyle = {styleContainer.searchBarContainer} 
        inputContainerStyle = {styleContainer.searchBarInput}
        placeholder='Search here...' 
        value={searchValue}
        onChangeText={updateSearch}
        onSubmitEditing={() => handleSearchSubmit(searchValue)}
        round
        onsub
        />

      <StyledText className = "mt-5 ml-4 text-xl">Booking Services</StyledText>
      <StyledView className = "mt-2 flex-row items-center justify-center content-center w-full h-20">
        <StyledView className = "basis-1/4 items-center justify-center">
          <Box className= " rounded-2xl w-2/3 bg-[#01635D]">
            <FontAwesome name = "globe" style = {styleContainer.iconStyle} size = {30} color = 'white'/>
          </Box>
          <StyledText className = "text-center">
            Trips
          </StyledText>  
        </StyledView>

        <StyledView className = "basis-1/4 items-center justify-center">
          <Box className= " rounded-2xl w-2/3 bg-[#01635D]">
            <FontAwesome6 name = "hotel" style = {styleContainer.iconStyle} size = {30} color = 'white'/>
          </Box>
          <StyledText className = "text-center">
            Hotels
          </StyledText>  
        </StyledView>

            <Pressable className = "basis-1/4" onPress = {() => {router.push("/(tabs)/Booking/BookingScreen")}}>
              <StyledView className = "items-center justify-center">
                <Box className= " rounded-2xl w-2/3 bg-[#01635D]">
                    <SimpleLineIcons name = "plane" style = {styleContainer.iconStyle} size={30} color='white'/>
                </Box>
                <StyledText className = "text-center">
                  Transports
                </StyledText>  
              </StyledView>
            </Pressable>

        <StyledView className = "basis-1/4 items-center justify-center">
          <Box className= " rounded-2xl w-2/3 bg-[#01635D]">
            <MaterialCommunityIcons name = "party-popper" style = {styleContainer.iconStyle} size = {30} color = 'white'/>
          </Box>
          <StyledText className = "text-center">
            Events
          </StyledText>  
        </StyledView>

      </StyledView>
    </StyledView>
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

  iconStyle: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
})

export default index