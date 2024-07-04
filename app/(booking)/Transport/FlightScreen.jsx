import { Pressable, StyleSheet, Text, View } from 'react-native'
import { StyledText, StyledView } from '../../components/StyledComponents'
import { useState, useContext, useEffect } from 'react'
import { BookingContext } from '../../context/BookingContext'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Image } from 'react-native'
import { CityList } from '../../constants/CityList'
import { days, months } from '../../components/DayMonth'
import { FilterContext } from '../../context/FilterContext'
import { FlatList } from 'react-native'
import { router } from 'expo-router'
import { genSeatsState } from '../../gen/GenerateData'

import { Ionicons } from '@expo/vector-icons'

const FlightScreen = ({ className, ...props }) => {
  const {flights} = useContext(BookingContext);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const {chosenFlight, setChosenFlight} = useContext(BookingContext);
  // console.log(flights[0].date.getDate());

  const {departureDate, setDepartureDate} = useContext(BookingContext);
  const {fromCity, toCity} = useContext(BookingContext);
  const [dates, setDates] = useState([]);

  const {departFrame, arriveFrame} = useContext(FilterContext);
  const {prices, sortBy} = useContext(FilterContext);

  // console.log(fromCity, toCity)
  const isSameDate = (date1, date2) => {
    if (date1.getDate() != date2.getDate()) return false;
    if (date1.getMonth() != date2.getMonth()) return false;
    if (date1.getYear() != date2.getYear()) return false;
    return true;
  }

  const get24TimeBase = (time) => {
    if (time == "12AM") return 0;
    else if (time == "06AM") return 6;
    else if (time == "12PM") return 12;
    else return 18;
  }

  const inFrame = (time, timeFrame) => {
    const startTime = get24TimeBase(timeFrame.start);
    const endTime = get24TimeBase(timeFrame.end);
    if (endTime == 0) endTime = 24;
    // console.log(startTime, endTime, time.hour, time.end)

    if (startTime <= time.hour && time.hour < endTime) {
      // console.log(time.hour);
      return true;
    }

    return false;
  }

  const standardizeTime = (time) => {
    return time.hour * 60 + time.minute;
  };

  const calcDuration = (from, to) => {
    const difference = standardizeTime(to) - standardizeTime(from);
    return difference < 0 ? difference + 24 * 60 : difference;
  };

  useEffect(() => {
    const newFlights = flights.filter((flight, index) => {
      if (flight.price > prices[1] || flight.price < prices[0]) return false;
      if (!isSameDate(flight.date, departureDate)) return false;
      if (!inFrame(flight.departureTime, departFrame)) return false;
      if (!inFrame(flight.arrivalTime, arriveFrame)) return false;
      return true;
    })
    
    // console.log(newFlights);
    //a < = > b: (-1, 0, 1)
    newFlights.sort((a, b) => {
      if (sortBy == "Arrive Time") {
        if (a.arrivalTime.hour < b.arrivalTime.hour) return -1;
        else if (a.arrivalTime.hour == b.arrivalTime.hour && a.arrivalTime.minute < b.arrivalTime.minute) return -1;
        else return 1;
      }

      else if (sortBy == "Departure time") {
        if (a.departureTime.hour < b.departureTime.hour) return -1;
        else if (a.departureTime.hour == b.departureTime.hour && a.departureTime.minute < b.departureTime.minute) return -1;
        else return 1;
      }

      else if (sortBy == "Price") {
        if (a.price < b.price) return -1;
        return 1;
      }

      else if (sortBy == "Lowest fare") {
        if (b.class == "Economy") return 1;
        return -1;
      }

      else {
        const durationA = calcDuration(a.departureTime, a.arrivalTime);
        const durationB = calcDuration(b.departureTime, b.arrivalTime);
        return (durationA < durationB ? -1 : 1);
      }
    })

    setFilteredFlights(newFlights);
    // console.log(newFlights);
  }, [departFrame, arriveFrame, prices, sortBy, departureDate])

  useEffect(() => {
    const weekState = [];
    for (let i = 0; i < 7; ++i) {
      const currentDate = new Date(departureDate.getTime() + 24 * 60 * 60 * 1000 * i)
      weekState.push(currentDate)
    }

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
    // console.log(cityId)
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

  const onPressDate = (date) => {
    setDepartureDate(date)
  }

  const getDateMonth = (date) => {
    const day = getDate(date);
    const month = months[date.getMonth()];

    return day + " " + month.substring(0, 3);
  }

  const get12TimeBase = (time) => {
    const suffix = (time.hour >= 12 ? "PM" : "AM");
    const hour0 = (time.hour >= 12 ? time.hour - 12 : time.hour);
    const hour = (hour0 == 0 ? 12 : hour0).toString();
    const minute = (time.minute < 10 ? "0" + time.minute.toString() : time.minute.toString());
    return hour + ":" + minute + " " + suffix;
  }

  const {flightSeats, setFlightSeats} = useContext(BookingContext);
  const onPressTicket = (flight) => {
    setFlightSeats(genSeatsState());
    setChosenFlight(flight);
    router.push('/(selecting)/SelectScreen')
  }

  const TicketPreview = (props) => {
    // console.log(source)
    const source = require('../../../assets/images/Ticket.png');
    return (
      // <Link href = "/Transport/TransportScreen">
      <Pressable onPress= {() => onPressTicket(props.flight)}>
        <StyledView className="mt-4 w-full relative flex">
          
          <StyledView className = "relative">
            <Image source={source} />
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

          <StyledView className = "absolute top-[65%] left-[4%]">
            <StyledText className= " text-xs text-[#01635D]">Date</StyledText>
            <StyledText className= "text-lg">{getDateMonth(props.flight.date)}</StyledText>
          </StyledView>

          <StyledView className = "absolute top-[65%] left-[29%]">
            <StyledText className= " text-xs text-[#01635D]">Departure</StyledText>
            <StyledText className= "text-lg">{get12TimeBase(props.flight.departureTime)}</StyledText>
          </StyledView>

          <StyledView className = "absolute top-[65%] left-[58%]">
            <StyledText className= " text-xs text-[#01635D]">Price</StyledText>
            <StyledText className= "text-lg">${props.flight.price}</StyledText>
          </StyledView>

          <StyledView className = "absolute top-[65%] left-[75%]">
            <StyledText className= " text-xs text-[#01635D]">Number</StyledText>
            <StyledText className= "text-lg">{props.flight.flightNumber}</StyledText>
          </StyledView>
        </StyledView>
      </Pressable>
      // </Link>
    )
  }

  const DateShow = (props) => {
    const { date } = props
    const isSame = (date.getTime() == departureDate.getTime());

    return(
      <StyledView className = {`basis-[10%] ${isSame ? "bg-[#FFDDA2]" : ""} rounded-xl`}>
        <Pressable onPress = {props.onPress}>
          <StyledText className = "text-center mt-2">{getWeekDay(date)}</StyledText>
          <StyledText className = "text-center mb-2 text-base font-pbold">{getDate(date)}</StyledText>
        </Pressable>
      </StyledView>
    )
  }

  const onPressBack = () => {
    router.push("/(tabs)/Booking/BookingScreen")
  }

  return (
    <StyledView style = {props.style} className = {`${className} w-11/12 mx-4 items-center text-center justify-center`}>
        <StyledView className = "w-full flex flex-row justify-start items-center mt-60">
          <Pressable onPress = {onPressBack} style = {{flexBasis:'30%'}}>
            <Ionicons name="chevron-back" size = {25}/>
          </Pressable>
          <Text className = "mt-6 font-bold text-xl ">Flights</Text>
        </StyledView>

      <StyledView className = " mt-4 flex flex-row w-full items-center justify-between">
        {dates.map((date, id) => {
            {/* {console.log(date)} */}
          return(
            <DateShow date = {date} key = {id * 10} onPress = {() => onPressDate(date)}/>
          )
        })}
      </StyledView>

      <StyledView className = "mt-4 flex flex-row justify-between w-full">
        <StyledText className = " text-base pt-2">7 flights available {fromCity} to {toCity} </StyledText>
        <Pressable onPress = {onPressFilter}>
          <StyledView className = " rounded-lg items-center bg-[#FEA36B]">
            <MaterialCommunityIcons color = "white" name = "filter" size = {30} style = {{padding: 4}}/>
          </StyledView>
        </Pressable>
      </StyledView>

      <StyledView className="w-full items-center">
        <FlatList data = {filteredFlights} 
            renderItem={({item}) => <TicketPreview flight = {item}/>}
            keyExtractor={item => item.id}
        />
      </StyledView>
    </StyledView>
  )
}

const styles = StyleSheet.create({
  
})

export default FlightScreen