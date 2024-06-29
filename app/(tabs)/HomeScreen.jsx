import { StyledView, StyledText } from '../components/StyledComponents';
import { Box } from '../components/Box';
import { StyleSheet } from 'react-native';
import React from 'react';
import { SearchBar } from '@rneui/themed';

const HomeScreen = () => {
  return (
    <StyledView className = "bg-[#E5E5E5] h-full">
      <StyledText className = "ml-5 mt-20 text-xl font-pmedium" >Explore the beautiful world!</StyledText>
      <SearchBar containerStyle = {styleContainer.searchBarContainer} 
        inputContainerStyle = {styleContainer.searchBarInput}
        placeholder='Search here...' 
        round
        />

      <StyledText className = "mt-10 text-xl">Booking Services</StyledText>
      <StyledView className = "mt-5 flex flex-row items-center w-full border">
        <StyledView className = "basis-1/4 border">
          <StyledText className = "text-center">
            Trips
          </StyledText>  
        </StyledView>

        <StyledView className = "basis-1/4 border">
          <StyledText className = "text-center">
            Hotels
          </StyledText>  
        </StyledView>

        <StyledView className = "basis-1/4 border">
          <StyledText className = "text-center">
            Transports
          </StyledText>  
        </StyledView>

        <StyledView className = "basis-1/4 border">
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
})

export default HomeScreen