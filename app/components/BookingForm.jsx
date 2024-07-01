import { StyleSheet, Text, View } from 'react-native'
import { StyledText, StyledView } from './StyledComponents'
import { TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react'

const BookingForm = ({ className, ...props }) => {
  // console.log(props)
  const [text, setText] = useState("haha");
  return (
    <StyledView style = {props.style}>
      <StyledText>Transport Booking</StyledText>
      <TextInput className = "border" onChangeText = {setText} value = {text}/>
    </StyledView>
  )
}

export default BookingForm

const styles = StyleSheet.create({})