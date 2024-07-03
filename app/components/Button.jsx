import { StyleSheet, Text, View, Pressable } from 'react-native'
import { StyledText, StyledView } from './StyledComponents'
import React, { useState, useEffect } from 'react'

export const Button = ({className, ...props}) => {
    // console.log(props)
  const [bgColor, setBgColor] = useState("bg-[#FEA36B]");
  const [textColor, setTextColor] = useState("text-[#FFFFFF]");

  useEffect(() => {
    if ('textColor' in props) setTextColor(props.textColor);
    if ('bgColor' in props) setBgColor(props.bgColor);

  }, [props])

  return (
    <StyledView style = {props.style} className = {`mt-8 w-full`}>
        <Pressable onPress = {props.onPress} className = {`items-center justify-center text-center rounded-2xl ${bgColor}`}>
            <StyledText className = {`py-3 font-bold text-lg ${textColor}`}>{props.text}</StyledText>
        </Pressable>
    </StyledView>
  )
}

const styles = StyleSheet.create({})