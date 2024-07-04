import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BoardingPassScreen from './BoardingPassScreen'
import SelectScreen from './SelectScreen'

const BookingLayout = () => {
  const [currentScreen, setCurrentScreen] = useState("select")

  const changeScreen = (screen) => {
    setCurrentScreen(screen);
  }

  return (
    <View>
    <SelectScreen className = {`${currentScreen == "select" ? "" : "hidden"}`} changeScreen = {changeScreen}/>
    <BoardingPassScreen className = {`${currentScreen == "boarding" ? "" : "hidden"}`} changeScreen = {changeScreen}/>
    </View>
  )
}

export default BookingLayout

const styles = StyleSheet.create({})