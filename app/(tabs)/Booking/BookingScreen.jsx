import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { StyledText, StyledView } from '../../components/StyledComponents'
import { Image } from 'react-native'
import { FlatList } from 'react-native'
import { Link } from 'expo-router'
import { useState } from 'react'
import BookingForm from '../../components/BookingForm'

//TODO: Using FlatList to render images

const CardData = [
  {
    id: 'Hotels_Card',
    source: require('../../../assets/images/Hotels_Card.png'),
  },

  {
    id: 'Transports_Card',
    source: require('../../../assets/images/Transports_Card.png'),
  },

  {
    id: 'Trips_Card',
    source: require('../../../assets/images/Trips_Card.png'),
  },

  {
    id: 'Events_Card',
    source: require('../../../assets/images/Events_Card.png'),
  },
]

const BookingScreen = () => {
  const [bookForm, setBookForm] = useState(false)
  const stateFlatList = (bookForm ? "hidden" : "");
  const stateForm = (!bookForm ? "hidden" : "");

  const handlePressCard = () => {
    setBookForm(!bookForm);
  }

  const Card = (props) => {
    // console.log(props.source)
    return (
      // <Link href = "/Transport/TransportScreen">
      <Pressable onPress={() => handlePressCard()}>
        <StyledView className="pb-4">
          <Image source={props.source}/>
        </StyledView>
      </Pressable>
      // </Link>
    )
  }


  return (
    <StyledView className="w-full items-center"> 
      <StyledView className = {`${stateFlatList}`}>
        <FlatList data = {CardData} 
          renderItem={({item}) => <Card source = {item.source}/>}
          keyExtractor={item => item.id}
        />
      </StyledView>

      <BookingForm className = {`${stateForm}`} backClick = {handlePressCard}/>
    </StyledView>
  )
}

export default BookingScreen