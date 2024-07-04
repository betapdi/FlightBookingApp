import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import FlightScreen from './Transport/FlightScreen'
import FilterScreen from './Transport/FilterScreen'
import { FilterContext, FilterProvider } from '../context/FilterContext'

const BookingLayout = () => {
  const [currentScreen, setCurrentScreen] = useState("flight")

  const changeScreen = (screen) => {
    setCurrentScreen(screen);
  }

  return (
    <FilterProvider>
      <View>
        <FlightScreen className = {`${currentScreen == "flight" ? "" : "hidden"}`} changeScreen = {changeScreen}/>
        <FilterScreen className = {`${currentScreen == "filter" ? "" : "hidden"}`} changeScreen = {changeScreen}/>
      </View>
    </FilterProvider>
  )
}

export default BookingLayout

const styles = StyleSheet.create({})