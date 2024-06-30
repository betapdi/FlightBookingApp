import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Image } from 'react-native'

//TODO: Using FlatList to render images

const BookingScreen = () => {
  return (
    <View>
      <Image source= {require('../../../assets/images/Hotel_Card.png')} />
      <Image source= {require('../../../assets/images/Transport_Card.png')} />
      <Image source= {require('../../../assets/images/Trips_Card.png')} />
      <Image source= {require('../../../assets/images/Events_Card.png')} />
    </View>
  )
}

export default BookingScreen

const styles = StyleSheet.create({})