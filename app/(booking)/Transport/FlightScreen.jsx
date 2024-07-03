import { Pressable, StyleSheet, Text, View } from 'react-native'
import { StyledText, StyledView } from '../../components/StyledComponents'
import { Button } from '../../components/Button'
import { useState, useContext, useEffect } from 'react'
import { BookingContext } from '../../context/BookingContext'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Image } from 'react-native'
import { CityList } from '../../constants/CityList'
import { router } from 'expo-router'
import { days } from '../../components/DayMonth'

const FlightScreen = ({ className, ...props }) => {

  const TicketData = [
    {
      id: 'Ticket1',
      source: require('../../../assets/images/Ticket.png'),
    },
  ]

  const {departureDate} = useContext(BookingContext)
  const {fromCity, toCity} = useContext(BookingContext)
  const [dates, setDates] = useState([])

  console.log(fromCity, toCity)
  useEffect(() => {
    const weekState = [];
    for (let i = 0; i < 7; ++i) {
      const currentDate = new Date(departureDate.getTime() + 24 * 60 * 60 * 1000 * i)
      weekState.push(currentDate)
    }

    console.log(weekState);
    setDates(weekState)
  }, [])

  const getWeekDay = (date) => {
    return days[date.getDay()].substring(0, 2);
  }

  const getDate = (date) => {
    const ans = date.getDate();
    if (ans < 10) return "0" + ans.toString();
    return ans;
  }

  const getCity = (cityId) => {
    console.log(cityId)
    let city = null;
    CityList.map((currCity) => {
      if (currCity.id == cityId) {
        city = currCity;
      }
    })

    return city;
  }
  
  const onPressFilter = () => {
    props.changeScreen("filter");
  }

  const TicketPreview = (props) => {
    console.log(props.source)
    return (
      // <Link href = "/Transport/TransportScreen">
      <Pressable>
        <StyledView className="pb-4 w-full relative flex">
          
          <StyledView className = "relative">
            <Image source={props.source} />
          </StyledView>

          <StyledView className = "absolute top-[20%] left-[30%]">
            <Image source={require('../../../assets/images/FlightIcon.png')}/>
          </StyledView>

          <StyledView className = "absolute top-[10%] left-[4%]">
            <StyledText className= " text-xs text-[#01635D]">{getCity(fromCity).id}</StyledText>
            <StyledText className= "text-lg">{getCity(fromCity).fullName}</StyledText>
          </StyledView>

          <StyledView className = "absolute top-[10%] right-[7%]">
            <StyledText className= " text-xs text-[#01635D]">{getCity(toCity).id}</StyledText>
            <StyledText className= "text-lg">{getCity(toCity).fullName}</StyledText>
          </StyledView>

        </StyledView>
      </Pressable>
      // </Link>
    )
  }

  return (
    <StyledView style = {props.style} className = {`${className} w-11/12 mt-14 mx-4 items-center text-center justify-center border`}>
      <StyledText className = "text-xl font-bold">Flights</StyledText>

      <StyledView className = "border mt-8 flex flex-row w-full items-center justify-between">
        {dates.map((date, id) => {
          return(
            <StyledView key = {id} className = {`basis-[12%] border bg-[#FFDDA2] rounded-xl`}>
              <StyledText className = "text-center mt-2">{getWeekDay(date)}</StyledText>
              <StyledText className = "text-center mb-2 text-base font-pbold">{getDate(date)}</StyledText>
            </StyledView>
          )
        })}
      </StyledView>

      <StyledView className = "mt-8 flex flex-row justify-between border w-full">
        <StyledText className = "border text-base pt-2">7 flights available {fromCity} to {toCity} </StyledText>
        <Pressable onPress = {onPressFilter}>
          <StyledView className = "border rounded-lg items-center bg-[#FEA36B]">
            <MaterialCommunityIcons color = "white" name = "filter" size = {30} style = {{padding: 4}}/>
          </StyledView>
        </Pressable>
      </StyledView>

      <StyledView className="w-full items-center mt-4">
        <TicketPreview source = {TicketData[0].source}/>
      </StyledView>
    </StyledView>
  )
}

const styles = StyleSheet.create({
  
})

export default FlightScreen