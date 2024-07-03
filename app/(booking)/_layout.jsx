import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import FlightScreen from './Transport/FlightScreen'
import FilterScreen from './Transport/FilterScreen'

const BookingLayout = () => {
  const [currentScreen, setCurrentScreen] = useState("flight")

  const changeScreen = (screen) => {
    setCurrentScreen(screen);
  }

  return (
    <View>
      <FlightScreen className = {`${currentScreen == "flight" ? "" : "hidden"}`} changeScreen = {changeScreen}/>
      <FilterScreen className = {`${currentScreen == "filter" ? "" : "hidden"}`} changeScreen = {changeScreen}/>
    </View>
  )
}

export default BookingLayout

const styles = StyleSheet.create({})