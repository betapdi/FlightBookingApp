import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StyledText, StyledView } from '../components/StyledComponents'
import { BookingContext } from '../context/BookingContext'
import { useState, useEffect, useContext } from 'react'
import { FlatList } from 'react-native'
import { Button } from '../components/Button'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const SelectScreen = ({className, ...props}) => {
  const {numPerson} = useContext(BookingContext);
  const {seats, setSeats} = useContext(BookingContext);
  const [currPerson, setCurrPerson] = useState(1);

  const { flightSeats, setFlightSeats } = useContext(BookingContext);
  const { chosenFlight } = useContext(BookingContext);
  const [ok, setOk] = useState(false);
  // console.log(flightSeats);

  const [seatState, setSeatState] = useState([
    {
      state: 'Selected',
      color: 'bg-[#FEA36B]',
    },

    {
      state: 'Booked',
      color: 'bg-[#089083]',
    },

    {
      state: 'Available',
      color: 'bg-[#B7DFDB]',
    },
  ])

  useEffect(() => {
    const newSeatState = []
    for (let i = 1; i <= numPerson; ++i) {
      newSeatState.push({id: i, seat: ""});
    }

    setSeats(newSeatState);
    setOk(true);
  }, [numPerson])

  const Person = (props) => {
    // console.log(props);
    return(
      <StyledView className = {`ml-2 rounded-xl ${currPerson == props.item.id ? "bg-[#FFDDA2]" : ""}`}>
        <Pressable onPress = {() => setCurrPerson(props.item.id)}>
          <StyledText className="py-2 px-5">{props.item.id}</StyledText>
        </Pressable>
      </StyledView>
    )
  }

  const getColor = (state) => {
    for (const item of seatState) {
      if (item.state == state) return item.color;
    }
  }

  const getChar = (num) => {
    if (num == 0) return 'A';
    if (num == 1) return 'B';
    if (num == 2) return 'C';
    return 'D';
  }

  const getNum = (char) => {
    if (char == 'A') return 0;
    if (char == 'B') return 1;
    if (char == 'C') return 2;
    return 3;
  }

  const getSeat = (seat) => {
    return {
      rowId: parseInt(seat.substring(0, seat.length - 1)),
      columnId: getNum(seat.substring(seat.length - 1)),
    }
  }

  const setSeatPerson = (person, seatRow, column) => {
    //1-based
    let newflightSeats = [];
    // console.log("Before set: ", person, seats[person - 1].seat);
    if (seats[person - 1].seat == "") {
      newflightSeats = flightSeats.map((row) => {
        const newId = row.id
        const newSeats = row.seats.map((seatState, index) => {
          if (row.id == seatRow && column == index) {
            return {state: 'Selected'}
          }

          else return seatState;
        })

        return {id: newId, seats: newSeats};
      })
    }

    else {
      // console.log("YAY, ALRIGHT!")
      const lastSeat = getSeat(seats[person - 1].seat);
      // console.log(lastSeat)
      newflightSeats = flightSeats.map((row) => {
        const newId = row.id
        const newSeats = row.seats.map((seatState, index) => {
          if (row.id == seatRow && column == index) {
            return {state: 'Selected'}
          }

          else if (row.id == lastSeat.rowId && index == lastSeat.columnId) {
            return {state: 'Available'}
          }

          else return seatState;
        })

        return {id: newId, seats: newSeats};
      })
    }
    setFlightSeats(newflightSeats);
    
    const seatCode = seatRow.toString() + getChar(column);

    const personSeats = seats.map((seat) => {
      if (seat.id == person) {
        return {id: seat.id, seat: seatCode};
      }
      
      else return seat;
    })
    setSeats(personSeats);

    // console.log(seats);
  }

  const onPressSeat = (seatId, column) => {
    // console.log(seatId, column);

    const currentSeat = flightSeats[seatId - 1];
    // console.log(currentSeat.id, currentSeat.seats[column].state)

    if (currentSeat.seats[column].state != 'Booked' && currentSeat.seats[column].state != 'Selected') {
      setSeatPerson(currPerson, seatId, column);
    }
  }

  const onPressContinue = () => {
    props.changeScreen("boarding")
  }

  const RowStates = (props) => {
    const {item} = props;
    // console.log(item);
    return(
      <StyledView className = "flex flex-row mt-2 w-full">
        <StyledView className = {`basis-1/6 items-center`}>
          <Pressable onPress = {() => onPressSeat(item.id, 0)}>
            <StyledView className= {`px-6 ${getColor(item.seats[0].state)} h-12 rounded-lg`}/>
          </Pressable>
        </StyledView>

        <StyledView className = {`basis-1/6 items-center`}>
          <Pressable onPress = {() => onPressSeat(item.id, 1)}>
            <StyledView className= {`px-6 ${getColor(item.seats[1].state)} h-12 rounded-lg`}/>
          </Pressable>
        </StyledView>

        <StyledText className = "basis-2/6 text-center text-xl">{item.id}</StyledText>

        <StyledView className = {`basis-1/6 items-center`}>
          <Pressable onPress = {() => onPressSeat(item.id, 2)}>
            <StyledView className= {`px-6 ${getColor(item.seats[2].state)} h-12 rounded-lg`}/>
          </Pressable>
        </StyledView>

        <StyledView className = {`basis-1/6 items-center`}>
          <Pressable onPress = {() => onPressSeat(item.id, 3)}>
            <StyledView className= {`px-6 ${getColor(item.seats[3].state)} h-12 rounded-lg`}/>
          </Pressable>
        </StyledView>
      </StyledView>
    )
  }

  const onPressBack = () => {
    router.push("/(booking)/Transport/FlightScreen")
  }

  return (
    (seats.length > 0 && 
      <StyledView style = {props.style} className = {`${className} w-full mt-16 items-center text-center justify-center`}>
        <StyledView className = "w-full flex flex-row justify-start items-center">
          <Pressable onPress = {onPressBack} style = {{flexBasis:'30%'}}>
            <Ionicons name="chevron-back" size = {25}/>
          </Pressable>
          <Text className = "mt-6 font-bold text-xl ">Selected Seats</Text>
        </StyledView>

        <StyledView className="w-11/12 mx-4 items-center text-center relative">
          <StyledView className="w-full mt-8">
            <StyledText>Traveller</StyledText>

            <StyledView className= "w-full">
              <FlatList data = {seats}
                horizontal
                renderItem={(item) => <Person item = {item.item}/>}
                keyExtractor={item => item.id * 100}
                showsHorizontalScrollIndicator={false}
              />
            </StyledView>
          </StyledView>

          <StyledView className="w-full mt-8 flex flex-row justify-between">

            {seatState.map((currState) => {
              return(
                <StyledView className = "flex flex-row">
                  <StyledView className = {`${currState.color} h-6 w-6 rounded-md`}/>
                  <StyledText className = "ml-2">{currState.state}</StyledText>
                </StyledView>
              )
            })}
          </StyledView>
          
          <StyledView className = "w-11/12 mt-8 h-[600]">
            <StyledView className = "flex flex-row">
              <StyledText className = "text-2xl basis-1/6 font-pbold text-center">A</StyledText>
              <StyledText className = "text-2xl basis-1/6 font-pbold text-center">B</StyledText>
              <StyledText className = "basis-2/6"/>
              <StyledText className = "text-2xl basis-1/6 font-pbold text-center">C</StyledText>
              <StyledText className = "text-2xl basis-1/6 font-pbold text-center">D</StyledText>
            </StyledView>

            <StyledView className = "w-full flex-1">
              <FlatList data = {flightSeats}
                renderItem = {(item) => <RowStates item = {item.item}/>}
                keyExtractor={item => item.id}
                ListFooterComponent={<View style={{height: 200}}/>}
              />
            </StyledView>
          </StyledView>
        </StyledView>

        <StyledView className = "w-full rounded-xl bg-white relative top-[-27%] items-center">
          <StyledView className = "w-11/12 flex flex-row justify-between pt-4">
              <StyledText className = "text-[#01635D]">Your seats</StyledText>
              <StyledText className = "font-pbold">Traveller {currPerson} / Seat {seats[currPerson - 1].seat}</StyledText>
          </StyledView>

          <StyledView className = "w-11/12 flex flex-row justify-between pt-4">
              <StyledText className = "text-[#01635D]">Total Price</StyledText>
              <StyledText className = "font-pbold">${chosenFlight.price * numPerson}</StyledText>
          </StyledView>

          <StyledView className = "w-11/12 flex flex-row justify-between pb-[20]">
            <Button text = "Continue" style = {{height: 70}} onPress = {onPressContinue}/>
          </StyledView>
        </StyledView>
      </StyledView>
    )
  )
}

export default SelectScreen

const styles = StyleSheet.create({})