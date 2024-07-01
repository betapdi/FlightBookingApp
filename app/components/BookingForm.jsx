import { Pressable, StyleSheet, Text, View, Button } from 'react-native'
import { StyledText, StyledView } from './StyledComponents'
import { Box } from './Box'
import { TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react'
import {Picker} from '@react-native-picker/picker';
import DatePicker from './DatePicker'
import { Ionicons, Feather, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, FontAwesome6 } from '@expo/vector-icons'

const BookingForm = ({ className, ...props }) => {
  // console.log(props)
  const [text, setText] = useState("haha");

  //City value
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");

  //Date Value
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());

  //Passengers value
  const [numPerson, setNumPerson] = useState(0);
  const [numBaby, setNumBaby] = useState(0);
  const [numPet, setNumPet] = useState(0);
  const [numLuggage, setNumLuggage] = useState(0);

  const personColor = (numPerson > 0 ? "#089083" : "#727272")
  const babyColor = (numBaby > 0 ? "#089083" : "#727272")
  const petColor = (numPet > 0 ? "#089083" : "#727272")
  const luggageColor = (numLuggage > 0 ? "#089083" : "#727272")

  //Class value
  const [flightClass, setFlightClass] = useState("");
  const economyValue = (flightClass == "Economy" ? {bgColor: "#089486", textColor: "#ffffff"} : {bgColor: "#FFFFFF", textColor: "#089083"});
  const businessValue = (flightClass == "Business" ? {bgColor: "#089486", textColor: "#ffffff"} : {bgColor: "#FFFFFF", textColor: "#089083"});

  //Transport value
  const [transport, setTransport] = useState(4);
  const chosenTransport = [
    {
      bgColor: (transport == 0 ? "#089486" : "#FFFFFF"),
      iconColor: (transport == 0 ? "#ffffff" : "#089083"),
    },

    {
      bgColor: (transport == 1 ? "#089486" : "#FFFFFF"),
      iconColor: (transport == 1 ? "#ffffff" : "#089083"),
    },

    {
      bgColor: (transport == 2 ? "#089486" : "#FFFFFF"),
      iconColor: (transport == 2 ? "#ffffff" : "#089083"),
    },

    {
      bgColor: (transport == 3 ? "#089486" : "#FFFFFF"),
      iconColor: (transport == 3 ? "#ffffff" : "#089083"),
    },
  ]

  const swapCity = () => {
    const tempCity = fromCity;
    setFromCity(toCity);
    setToCity(tempCity);
  }

  const onChangeDepartureDate = (date) => {
    setDepartureDate(date);
  }

  const onChangeReturnDate = (date) => {
    setReturnDate(date);
  }

  const onPressClass = (currentClass) => {
    // console.log(currentClass, flightClass)
    if (currentClass == flightClass) setFlightClass("");
    else setFlightClass(currentClass);
  }

  const onPressTransport = (currentTransport) => {
    if (currentTransport == transport) setTransport(4);
    else setTransport(currentTransport);
  }

  return (
    <StyledView style = {props.style} className = " w-11/12 mt-14 items-center text-center">
      <StyledText className = "text-xl font-bold">Transport Booking</StyledText>
      {/* <TextInput className = "border" onChangeText = {setText} value = {text}/> */}
      <StyledView className = " w-full items-center text-center mt-5">
        <StyledView className = "bg-[#FEA36B] absolute top-9 right-5 rounded-lg z-10">
          <Pressable onPress={swapCity}>
            <Ionicons name = "swap-vertical" size = {40} color="white"/>
          </Pressable>
        </StyledView>

        <StyledView className = "rounded-2xl w-full relative z-0 bg-white">
          <StyledText className = " text-gray-500 ml-4 mt-1 mb-[-15] text-xs">From</StyledText>
          <Picker
            style = {styles.pickerStyle}
            selectedValue={fromCity}
            dropdownIconColor='white'
            onValueChange={(itemValue, itemIndex) => setFromCity(itemValue)}>
            <Picker.Item label="New York (NYC)" value="NYC" />
            <Picker.Item label="LONDON (LDN)" value="LDN" />
          </Picker>
        </StyledView>


        <StyledView className = "rounded-2xl mt-2 w-full relative z-0 bg-white">
        <StyledText className = " text-gray-500 ml-4 mt-1 mb-[-15] text-xs">To</StyledText>
          <Picker
            style = {styles.pickerStyle}
            selectedValue={toCity}
            dropdownIconColor='white'
            onValueChange={(itemValue, itemIndex) => setToCity(itemValue)}>
            <Picker.Item label="New York (NYC)" value="NYC" />
            <Picker.Item label="LONDON (LDN)" value="LDN" />
          </Picker>
        </StyledView>

        <StyledView className = "flex flex-row justify-between w-full mt-5">
          <DatePicker type = "Departure" onChangeDate = {onChangeDepartureDate}/>
          <DatePicker type = "Return" onChangeDate = {onChangeReturnDate}/>
        </StyledView>
      </StyledView>

      <StyledView className="text-left w-full mt-8">
        <StyledText className = "text-[#727272] font-bold text-base">Passenger & Luggage</StyledText>
        <StyledView className = "flex flex-row justify-start mt-2 mb-1">
          <StyledView className= {`border-b basis-1/6 mr-4 flex flex-row border-[${personColor}]`}>
            <Feather name = "user" size = {25} color={`${personColor}`}/>
            <TextInput keyboardType='numeric' maxLength={2} className = "ml-2 flex-1 h-5 p-0 text-[#089083]" onChangeText = {setNumPerson} value = {numPerson}/>
          </StyledView>

          <StyledView className= {`border-b basis-1/6 mr-4 flex flex-row border-[${babyColor}]`}>
            <MaterialCommunityIcons name = "baby-face-outline" size = {25} color={`${babyColor}`}/>
            <TextInput keyboardType='numeric' maxLength={2} className = "ml-2 flex-1 h-5 p-0 text-[#089083]" onChangeText = {setNumBaby} value = {numBaby}/>
          </StyledView>

          <StyledView className= {`border-b basis-1/6 mr-4 flex flex-row border-[${petColor}]`}>
            <MaterialCommunityIcons name = "dog" size = {25} color={`${petColor}`}/>
            <TextInput keyboardType='numeric' maxLength={2} className = "ml-2 flex-1 h-5 p-0 text-[#089083]" onChangeText = {setNumPet} value = {numPet}/>
          </StyledView>
          
          <StyledView className= {`border-b basis-1/6 mr-4 flex flex-row border-[${luggageColor}]`}>
            <MaterialIcons name = "luggage" size = {25} color={`${luggageColor}`}/>
            <TextInput keyboardType='numeric' maxLength={2} className = "ml-2 flex-1 h-5 p-0 text-[#089083]" onChangeText = {setNumLuggage} value = {numLuggage}/>
          </StyledView>
        </StyledView>
      </StyledView>

      <StyledView className = "w-full text-left mt-8">
        <StyledText className = "text-[#727272] font-bold text-base">Class</StyledText>
          <StyledView className = "flex flex-row justify-start mt-2 mb-1">
            <Pressable onPress = {() => onPressClass("Economy")} className = {`bg-[${economyValue.bgColor}] basis-1/3 rounded-xl mr-4 py-2 px-2`}>
              <StyledText className= {`text-center text-[${economyValue.textColor}]`}>Economy</StyledText>
            </Pressable>

            <Pressable onPress = {() => onPressClass("Business")} className = {`bg-[${businessValue.bgColor}] basis-1/3 rounded-xl mr-4 py-2 px-2`}>
              <StyledText className= {`text-center text-[${businessValue.textColor}]`}>Business</StyledText>
            </Pressable>
          </StyledView>
      </StyledView>

      <StyledView className = "w-full text-left mt-8">
        <StyledText className = "text-[#727272] font-bold text-base">Transport</StyledText>
        <StyledView className = "flex flex-row justify-start mt-2 mb-1">
          <Pressable onPress = {() => onPressTransport(0)} className = "basis-[14%] mr-4">
            <StyledView className = {`justify-center items-center text-center bg-[${chosenTransport[0].bgColor}] rounded-xl`}>
              <StyledView className = "py-2">
                <SimpleLineIcons name = "plane" size = {30} color={`${chosenTransport[0].iconColor}`} />
              </StyledView>
            </StyledView>
          </Pressable>

          <Pressable onPress = {() => onPressTransport(1)} className = "basis-[14%] mr-4">
            <StyledView className = {`justify-center items-center text-center bg-[${chosenTransport[1].bgColor}] rounded-xl`}>
              <StyledView className = "py-2">
                <FontAwesome6 name = "ship" size = {30} color={`${chosenTransport[1].iconColor}`} />
              </StyledView>
            </StyledView>
          </Pressable>

          <Pressable onPress = {() => onPressTransport(2)} className = "basis-[14%] mr-4">
            <StyledView className = {`justify-center items-center text-center bg-[${chosenTransport[2].bgColor}] rounded-xl`}>
              <StyledView className = "py-2">
                <MaterialIcons name = "train" size = {30} color={`${chosenTransport[2].iconColor}`} />
              </StyledView>
            </StyledView>
          </Pressable>

          <Pressable onPress = {() => onPressTransport(3)} className = "basis-[14%] mr-4">
            <StyledView className = {`justify-center items-center text-center bg-[${chosenTransport[3].bgColor}] rounded-xl`}>
              <StyledView className = "py-2">
                <Ionicons name = "bus-outline" size = {30} color={`${chosenTransport[3].iconColor}`} />
              </StyledView>
            </StyledView>
          </Pressable>

        </StyledView>
      </StyledView>

      <StyledView className = "mt-8 w-full">
        <Pressable className = "items-center justify-center text-center rounded-2xl bg-[#FEA36B]">
          <StyledText className = "py-3 font-bold text-lg text-white">Search</StyledText>
        </Pressable>
      </StyledView>
    </StyledView>
  )
}

const styles = StyleSheet.create({
  pickerStyle: {
    width: 'full',
    marginBottom: -8,
  },
})

export default BookingForm