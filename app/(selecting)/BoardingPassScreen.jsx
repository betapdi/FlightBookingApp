import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StyledView, StyledText } from '../components/StyledComponents'
import { Image } from 'react-native'
import FullTicket from '../../assets/images/FullTicket.png'
import { Button } from '../components/Button'

import { useContext } from 'react'
import { BookingContext } from '../context/BookingContext'
import { CityList } from '../constants/CityList'
import { months } from '../components/DayMonth'

import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const BoardingPassScreen = ({className, ...props}) => {
  const {chosenFlight} = useContext(BookingContext);
  const {fromCity, toCity} = useContext(BookingContext);
  const { flightClass } = useContext(BookingContext);
  const { numPerson, seats } = useContext(BookingContext);

  const get12TimeBase = (time) => {
    const suffix = (time.hour >= 12 ? "PM" : "AM");
    const hour0 = (time.hour >= 12 ? time.hour - 12 : time.hour);
    const hour = (hour0 == 0 ? 12 : hour0).toString();
    const minute = (time.minute < 10 ? "0" + time.minute.toString() : time.minute.toString());
    return hour + ":" + minute + " " + suffix;
  }

  const getCity = (cityId) => {
    // console.log(cityId)
    let city = null;
    CityList.map((currCity) => {
      if (currCity.id == cityId) {
        city = currCity;
      }
    })

    return city;
  }

  const getDate = (date) => {
    const ans = date.getDate();
    if (ans < 10) return "0" + ans.toString();
    return ans;
  }

  const getDateMonth = (date) => {
    const day = getDate(date);
    const month = months[date.getMonth()];

    return day + " " + month.substring(0, 3);
  }

  const onPressBack = () => {
    props.changeScreen("select")
    router.push("/(tabs)/Booking/BookingScreen")
  }

  return (
    (seats.length > 0 &&
    <StyledView className="">
      <StyledView style = {props.style} className = {`${className} w-11/12 mt-8 mx-4 items-center text-center justify-center`}>
        <StyledView className = "w-full flex flex-row justify-start items-center">
          <Pressable onPress = {onPressBack} style = {{flexBasis:'30%'}}>
            <Ionicons name="chevron-back" size = {25}/>
          </Pressable>
          <Text className = "mt-6 font-bold text-xl ">Boarding Pass</Text>
        </StyledView>

        <StyledView className="mt-8 w-full h-[550] items-center relative">
          <Image source={FullTicket} style = {styles.image} />
        </StyledView>

        <StyledView className="absolute top-[54%] left-[10%] bg-white">
          <StyledText className="text-xs text-[#01635D]">{fromCity}</StyledText>
          <StyledText className="text-lg">{getCity(fromCity).fullName}</StyledText>
        </StyledView>

        <StyledView className="absolute top-[54%] right-[10%] bg-white">
          <StyledText className="text-xs text-[#01635D]">{toCity}</StyledText>
          <StyledText className="text-lg">{getCity(toCity).fullName}</StyledText>
        </StyledView>

        <StyledView className="absolute top-[63%] left-[10%] bg-white">
          <StyledText className="text-xs text-[#01635D]">Date</StyledText>
          <StyledText className="text-lg">{getDateMonth(chosenFlight.date)}</StyledText>
        </StyledView>

        <StyledView className="absolute top-[63%] left-[30%] bg-white">
          <StyledText className="text-xs text-[#01635D]">Departure</StyledText>
          <StyledText className="text-lg">{get12TimeBase(chosenFlight.departureTime)}</StyledText>
        </StyledView>

        <StyledView className="absolute top-[77%] left-[10%] bg-white">
          <StyledText className="text-xs text-[#01635D]">Passenger</StyledText>
          <StyledText className="text-lg">{numPerson} Adult</StyledText>
        </StyledView>

        <StyledView className="absolute top-[77%] left-[32%] bg-white">
          <StyledText className="text-xs text-[#01635D]">Ticket</StyledText>
          <StyledText className="text-lg">NL82-1</StyledText>
        </StyledView>

        <StyledView className="absolute top-[77%] left-[53%] bg-white">
          <StyledText className="text-xs text-[#01635D]">Class</StyledText>
          <StyledText className="text-lg">{flightClass}</StyledText>
        </StyledView>

        <StyledView className="absolute top-[77%] right-[10%] bg-white">
          <StyledText className="text-xs text-[#01635D]">Seat</StyledText>
          <StyledText className="text-lg">{seats[0].seat}</StyledText>
        </StyledView>

        <StyledView className="absolute top-[43%] right-[18%] bg-white">
          <StyledText className="text-lg">British Airways Flight {chosenFlight.flightNumber}</StyledText>
        </StyledView>
      </StyledView>
      
      <Button text = "Download ticket" className = "mt-4"/>
    </StyledView>
    )
  )
}

export default BoardingPassScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    flex: 1,
    display: 'flex',
    resizeMode: 'contain',
  },
});