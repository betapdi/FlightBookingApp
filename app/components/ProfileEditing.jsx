import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import { StyledView, StyledText } from '../components/StyledComponents'
import React, { useContext, useState } from 'react'
import { UserInfoContext } from '../context/UserInfoContext'
import { Pressable } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import { Button } from './Button'

const ProfileEditing = ({className, ...props}) => {
  const {name, setName} = useContext(UserInfoContext);
  const {phone, setPhone} = useContext(UserInfoContext);
  const {email, setEmail} = useContext(UserInfoContext);
  const {avatar, setAvatar} = useContext(UserInfoContext); 
  
  const onPressBack = () => {
    props.changeTab("showcase");
  }

  const handlePickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setAvatar({default: avatar.default, uri: result.assets[0].uri});
    }
  }

  return (
    <StyledView style = {props.style} className = {`${className} w-11/12 mt-8 mx-4 items-center text-center justify-center`}>
      <StyledView className = "w-full flex flex-row justify-start items-center">
        <Pressable onPress = {onPressBack} style = {{flexBasis:'25%'}}>
          <Ionicons name="chevron-back" size = {25}/>
        </Pressable>
        <Text className = "mt-6 font-bold text-xl ">Personal Information</Text>
      </StyledView>


      <StyledView className="mt-6 w-[100] h-[100] items-center justify-center relative">
        <Image source={(avatar.uri == "") ? avatar.default : {uri: avatar.uri}} 
          style = {styles.image}
        />

        <StyledView className="absolute bg-white top-[70%] right-[0] rounded-md">
          <Pressable onPress = {handlePickAvatar}>
            <MaterialCommunityIcons name = "camera-plus-outline" size = {30}/>
          </Pressable>
        </StyledView>
      </StyledView>

      <StyledView className = "w-full bg-white rounded-xl mt-8">
        <StyledText className = " text-gray-500 ml-4 mt-1 mb-[-15] text-xs">First Name</StyledText>
        <TextInput
          onChangeText={(value) => setName({firstName: value, lastName: name.lastName})}
          value={name.firstName} className = "text-lg mt-4 ml-4 pb-2"
        />
      </StyledView>

      <StyledView className = "w-full bg-white rounded-xl mt-4">
        <StyledText className = " text-gray-500 ml-4 mt-1 mb-[-15] text-xs">Last Name</StyledText>
        <TextInput
          onChangeText={(value) => setName({firstName: name.firstName, lastName: value})}
          value={name.lastName} className = "text-lg mt-4 ml-4 pb-2"
        />
      </StyledView>

      <StyledView className = "w-full bg-white rounded-xl mt-4">
        <StyledText className = " text-gray-500 ml-4 mt-1 mb-[-15] text-xs">Phone</StyledText>
        <TextInput
          onChangeText={(value) => setPhone(value)}
          value={phone} className = "text-lg mt-4 ml-4 pb-2"
        />
      </StyledView>

      <StyledView className = "w-full bg-white rounded-xl mt-4">
        <StyledText className = " text-gray-500 ml-4 mt-1 mb-[-15] text-xs">Email</StyledText>
        <TextInput
          onChangeText={(value) => setEmail(value)}
          value={email} className = "text-lg mt-4 ml-4 pb-2"
        />
      </StyledView>
      
      <Button text = "Save changes" className=" mt-32" onPress = {onPressBack}></Button>
    </StyledView>
  )
}

export default ProfileEditing

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
    width: 100,
    height: 100,
    borderRadius: 15,
  },
});