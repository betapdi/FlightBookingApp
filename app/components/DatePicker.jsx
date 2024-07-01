import { Pressable, StyleSheet, Text, View } from 'react-native'
import { StyledText, StyledView } from './StyledComponents'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import React from 'react'

const DatePicker = ( props ) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  // console.log(props)

  const handlePress = () => {
    setShow(true);
  };

  const handleChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);

    props.onChangeDate(selectedDate);
  };

  const getDate = (date) => {
    return date.toUTCString().substring(0, 16);
  };

  return (
    <StyledView className=" basis-[48] rounded-2xl bg-white">
      <StyledText className = " text-gray-500 ml-4 mb-1 mt-1 text-xs">{props.type}</StyledText>
      <Pressable onPress={handlePress}>
        <StyledText className = "ml-4 mb-2 text-base">{getDate(date)}</StyledText>
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={handleChange}
        />
      )}
    </StyledView>
  )
}

export default DatePicker

const styles = StyleSheet.create({})