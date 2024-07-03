import { StyleSheet, Text, View } from 'react-native'
import { CheckBox } from '@rneui/themed'
import React from 'react'
import { useState, useEffect } from 'react'

const Checkbox = ({className, ...props}) => {
  const [checked, setChecked] = useState(props.status);
  // console.log(props);

  useEffect(() => {
    setChecked(props.status);
  }, [props.status])

  const onPress = () => {
    setChecked(!checked)
    props.onCheck();
  }

  return (
    <CheckBox title={props.title} 
      checkedIcon='dot-circle-o'
      uncheckedIcon='circle-o'
      checkedColor='#01635D'
      uncheckedColor='#01635D'
      size={20}
      containerStyle = {{backgroundColor: 'transparent', marginTop: (props.index == 0 ? 10 : -15)}}
      checked={checked}
      onPress={() => onPress()}
      textStyle = {{color: 'black', fontSize: 15, fontWeight: 600}}
    />
  )
}

export default Checkbox

const styles = StyleSheet.create({})