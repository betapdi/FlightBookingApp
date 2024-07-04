import { StyleSheet, Text, View } from 'react-native'
import { StyledView, StyledText } from '../../components/StyledComponents'
import React from 'react'

const Hotel = ({className, ...props}) => {
  return (
    <StyledView style = {props.style} className = {`${className} w-11/12 mt-8 mx-4 items-center text-center justify-center`}>
      <Text className = "mt-6 font-bold text-xl ">Hotels</Text>
    </StyledView>
  )
}

export default Hotel

const styles = StyleSheet.create({})