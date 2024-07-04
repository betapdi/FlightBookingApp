import { Pressable, StyleSheet, Text, View } from 'react-native'
import { StyledText, StyledView } from './StyledComponents'
import { Button } from './Button'
import { TextInput } from 'react-native'
import React from 'react'
import { BookingContext } from '../context/BookingContext'
import { useContext } from 'react'
import {Picker} from '@react-native-picker/picker';
import DatePicker from './DatePicker'
import { Ionicons, Feather, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router'
import { CityList } from '../constants/CityList'

const BookingForm = ({ className, ...props }) => {
  // console.log(props)
  //City value
  const {fromCity, setFromCity} = useContext(BookingContext)
  const {toCity, setToCity} = useContext(BookingContext)

  //Date Value
  const {departureDate, setDepartureDate} = useContext(BookingContext)
  const {returnDate, setReturnDate} = useContext(BookingContext)

  //Passengers value
  const {numPerson, setNumPerson} = useContext(BookingContext)
  const {numBaby, setNumBaby} = useContext(BookingContext)
  const {numPet, setNumPet} = useContext(BookingContext)
  const {numLuggage, setNumLuggage} = useContext(BookingContext)

  const personColor = (numPerson > 0 ? "border-[#089083]" : "border-[#727272]")
  const babyColor = (numBaby > 0 ? "border-[#089083]" : "border-[#727272]")
  const petColor = (numPet > 0 ? "border-[#089083]" : "border-[#727272]")
  const luggageColor = (numLuggage > 0 ? "border-[#089083]" : "border-[#727272]")
  const detachBorder = (borderColor) => {
    // console.log(borderColor.substring(8, 15))
    return borderColor.substring(8, 15);
  }

  //Class value
  const {flightClasses, setFlightClasses} = useContext(BookingContext)
  const {setFlightClass} = useContext(BookingContext);

  //Transport value
  const {transport, setTransport} = useContext(BookingContext)

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
    const newState = flightClasses.map((curr, id) => {
      if (curr.name === currentClass) {
        if (curr.bgColor == "bg-[#089083]") return {
          name: curr.name,
          bgColor: "bg-[#ffffff]",
          textColor: "text-[#089083]",
        }

        else {
          setFlightClass(curr.name);
          return {
            name: curr.name,
            bgColor: "bg-[#089083]",
            textColor: "text-[#FFFFFF]",
          }
        }
      }

      else return {
        name: curr.name,
        bgColor: "bg-[#ffffff]",
        textColor: "text-[#089083]",
      }
    });

    setFlightClasses(newState);

    // console.log(newState[0].textColor)
  }

  const onPressTransport = (currentTransport) => {
    const newState = transport.map((curr, id) => {
      if (id === currentTransport) {
        if (curr.bgColor == "bg-[#089083]") return {
          bgColor: "bg-[#ffffff]",
          iconColor: "#089083",
        }
        
        else return {
          bgColor: "bg-[#089083]",
          iconColor: "#FFFFFF",
        }
      }

      else return {
        bgColor: "bg-[#ffffff]",
        iconColor: "#089083",
      }
    });

    setTransport(newState);
  }

  const onPressSearch = () => {
    router.push('/(booking)/Transport/FlightScreen')
  }

  const onPressBack = () => {
    props.backClick();
  }

  return (
    <StyledView style = {props.style} className = " w-11/12 mt-14 items-center text-center">
      <StyledView className = "w-full flex flex-row justify-start items-center">
        <Pressable onPress = {onPressBack} style = {{flexBasis:'30%'}}>
          <Ionicons name="chevron-back" size = {25}/>
        </Pressable>
        <Text className = "mt-6 font-bold text-xl ">Transport Booking</Text>
      </StyledView>
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
            {CityList.map((city, id) => {
              return <Picker.Item label={`${city.fullName + '(' + city.id + ')'}`} value={`${city.id}`} key = {id} />
            })}
          </Picker>
        </StyledView>


        <StyledView className = "rounded-2xl mt-2 w-full relative z-0 bg-white">
        <StyledText className = " text-gray-500 ml-4 mt-1 mb-[-15] text-xs">To</StyledText>
          <Picker
            style = {styles.pickerStyle}
            selectedValue={toCity}
            dropdownIconColor='white'
            onValueChange={(itemValue, itemIndex) => setToCity(itemValue)}>
            {CityList.map((city, id) => {
              return <Picker.Item label={`${city.fullName + '(' + city.id + ')'}`} value={`${city.id}`} key = {id} />
            })}
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
          <StyledView className= {`border-b basis-1/6 mr-4 flex flex-row ${personColor}`}>
            <Feather name = "user" size = {25} style={{color: detachBorder(personColor)}}/>
            <TextInput keyboardType='numeric' maxLength={2} className = "ml-2 flex-1 h-5 p-0 text-[#089083]" onChangeText = {setNumPerson} value = {numPerson}/>
          </StyledView>

          <StyledView className= {`border-b basis-1/6 mr-4 flex flex-row ${babyColor}`}>
            <MaterialCommunityIcons name = "baby-face-outline" size = {25} style={{color: detachBorder(babyColor)}}/>
            <TextInput keyboardType='numeric' maxLength={2} className = "ml-2 flex-1 h-5 p-0 text-[#089083]" onChangeText = {setNumBaby} value = {numBaby}/>
          </StyledView>

          <StyledView className= {`border-b basis-1/6 mr-4 flex flex-row ${petColor}`}>
            <MaterialCommunityIcons name = "dog" size = {25} style={{color: detachBorder(petColor)}}/>
            <TextInput keyboardType='numeric' maxLength={2} className = "ml-2 flex-1 h-5 p-0 text-[#089083]" onChangeText = {setNumPet} value = {numPet}/>
          </StyledView>
          
          <StyledView className= {`border-b basis-1/6 mr-4 flex flex-row ${luggageColor}`}>
            <MaterialIcons name = "luggage" size = {25} style={{color: detachBorder(luggageColor)}}/>
            <TextInput keyboardType='numeric' maxLength={2} className = "ml-2 flex-1 h-5 p-0 text-[#089083]" onChangeText = {setNumLuggage} value = {numLuggage}/>
          </StyledView>
        </StyledView>
      </StyledView>

      <StyledView className = "w-full text-left mt-8">
        <StyledText className = "text-[#727272] font-bold text-base">Class</StyledText>
          <StyledView className = "flex flex-row justify-start mt-2 mb-1">
            <Pressable onPress = {() => onPressClass("Economy")} className = {` basis-1/3 rounded-xl mr-4 py-2 px-2 ${flightClasses[0].bgColor}`}>
              <StyledText className= {`text-center ${flightClasses[0].textColor}`}>Economy</StyledText>
            </Pressable>

            <Pressable onPress = {() => onPressClass("Business")} className = {`${flightClasses[1].bgColor} basis-1/3 rounded-xl mr-4 py-2 px-2`}>
              <StyledText className= {`text-center ${flightClasses[1].textColor}`}>Business</StyledText>
            </Pressable>
          </StyledView>
      </StyledView>

      <StyledView className = "w-full text-left mt-8">
        <StyledText className = "text-[#727272] font-bold text-base">Transport</StyledText>
        <StyledView className = "flex flex-row justify-start mt-2 mb-1">
          <Pressable onPress = {() => onPressTransport(0)} className = "basis-[14%] mr-4">
            <StyledView className = {`justify-center items-center text-center ${transport[0].bgColor} rounded-xl`}>
              <StyledView className = "py-2">
                <SimpleLineIcons name = "plane" size = {30} color={`${transport[0].iconColor}`} />
              </StyledView>
            </StyledView>
          </Pressable>

          <Pressable onPress = {() => onPressTransport(1)} className = "basis-[14%] mr-4">
            <StyledView className = {`justify-center items-center text-center ${transport[1].bgColor} rounded-xl`}>
              <StyledView className = "py-2">
                <FontAwesome6 name = "ship" size = {30} color={`${transport[1].iconColor}`} />
              </StyledView>
            </StyledView>
          </Pressable>

          <Pressable onPress = {() => onPressTransport(2)} className = "basis-[14%] mr-4">
            <StyledView className = {`justify-center items-center text-center ${transport[2].bgColor} rounded-xl`}>
              <StyledView className = "py-2">
                <MaterialIcons name = "train" size = {30} color={`${transport[2].iconColor}`} />
              </StyledView>
            </StyledView>
          </Pressable>

          <Pressable onPress = {() => onPressTransport(3)} className = "basis-[14%] mr-4">
            <StyledView className = {`justify-center items-center text-center ${transport[3].bgColor} rounded-xl`}>
              <StyledView className = "py-2">
                <Ionicons name = "bus-outline" size = {30} color={`${transport[3].iconColor}`} />
              </StyledView>
            </StyledView>
          </Pressable>

        </StyledView>
      </StyledView>

      <Button text = "Search" onPress = {onPressSearch}/>
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