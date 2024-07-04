import { StyleSheet, Text, View } from 'react-native'
import { StyledView, StyledText } from '../../components/StyledComponents'
import React from 'react'

const Event = ({className, ...props}) => {
  return (
    <StyledView style = {props.style} className = {`${className} w-11/12 mt-8 mx-4 items-center text-center justify-center`}>
      <Text className = "mt-6 font-bold text-xl ">Events</Text>
    </StyledView>
  )
}

export default Event

const styles = StyleSheet.create({})