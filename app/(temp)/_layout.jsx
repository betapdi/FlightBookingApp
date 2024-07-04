import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'

import Hotel from './TempScreen/Hotel'
import Event from './TempScreen/Event'
import Trip from './TempScreen/Trip'

import { usePathname } from 'expo-router';

const _layout = () => {
  const route = usePathname();
  const [currentScreen, setCurrentScreen] = useState("Hotel")

  useEffect(() => {
    const pathArray = route.split('/');
    const lastWord = pathArray[pathArray.length - 1];
    console.log(lastWord);
    setCurrentScreen(lastWord);
  }, [])

  const changeScreen = (screen) => {
    setCurrentScreen(screen);
  }

  return (
    <View>
        {console.log(currentScreen)}
        <Hotel className = {`${currentScreen == "Hotel" ? "" : "hidden"}`} changeScreen = {changeScreen}/>
        <Event className = {`${currentScreen == "Event" ? "" : "hidden"}`} changeScreen = {changeScreen}/>
        <Trip className = {`${currentScreen == "Trip" ? "" : "hidden"}`} changeScreen = {changeScreen}/>
    </View>
  )
}

export default _layout

const styles = StyleSheet.create({})