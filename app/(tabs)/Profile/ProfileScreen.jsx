import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { StyledView, StyledText } from '../../components/StyledComponents'
import Avatar from '../../../assets/images/Avatar.png'
import { UserInfoContext } from '../../context/UserInfoContext'

import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { ToastAndroid } from 'react-native'
import ProfileEditing from '../../components/ProfileEditing'

const ProfileScreen = (className, ...props) => {
  const {name, setName} = useContext(UserInfoContext);
  const {phone, setPhone} = useContext(UserInfoContext);
  const {email, setEmail} = useContext(UserInfoContext);
  const {avatar, setAvatar} = useContext(UserInfoContext); 
  
  const [currTab, setCurrTab] = useState("showcase");


  const changeTab = (tab) => {
    setCurrTab(tab);
  }

  const onPressTab = (feature) => {
    if (feature == "info") {
      setCurrTab("edit");
    }

    else ToastAndroid.show("This feature will be developed in the future", ToastAndroid.LONG);
  }

  return (
    <StyledView>
      <StyledView style = {props.style} className = {`${className} ${currTab == "showcase" ? "" : "hidden"} w-11/12 mt-8 mx-4 items-center text-center justify-center`}>
        <StyledText className = "mt-6 font-bold text-xl">Account</StyledText>

        <StyledView className="mt-6 w-full h-[150]  items-center relative">
            <Image source={avatar.uri == "" ? avatar.default : {uri: avatar.uri}} 
              style = {styles.image} 
            />
            <StyledText className="mt-2 font-bold text-xl">{name.firstName} {name.lastName}</StyledText>
        </StyledView>

        <StyledView className = "w-full mt-8">
          <Pressable onPress = {() => onPressTab("info")}>
            <StyledView className= "flex flex-row align-middle">
              <AntDesign name = "user" size={30} style = {{color: '#FEA36B'}}/>
              <StyledText className="align-middle pt-1 ml-2 text-md">Personal information</StyledText>
            </StyledView>
          </Pressable>

          <Pressable onPress = {() => onPressTab("card")}>
            <StyledView className= "flex flex-row mt-4">
              <AntDesign name = "creditcard" size={30} style = {{color: '#FEA36B'}}/>
              <StyledText className="align-middle pt-1 ml-2 text-md">Payment and cards</StyledText>
            </StyledView>
          </Pressable>

          <Pressable onPress = {() => onPressTab("save")}>
            <StyledView className= "flex flex-row mt-4">
              <AntDesign name = "hearto" size={30} style = {{color: '#FEA36B'}}/>
              <StyledText className="align-middle pt-1 ml-2 text-md">Saved</StyledText>
            </StyledView>
          </Pressable>

          <Pressable onPress = {() => onPressTab("history")}>
            <StyledView className= "flex flex-row mt-4">
              <MaterialIcons name = "history" size={30} style = {{color: '#FEA36B'}}/>
              <StyledText className="align-middle pt-1 ml-2 text-md">Booking history</StyledText>
            </StyledView>
          </Pressable>

          <Pressable onPress = {() => onPressTab("setting")}>
            <StyledView className= "flex flex-row mt-4">
              <AntDesign name = "setting" size={30} style = {{color: '#FEA36B'}}/>
              <StyledText className="align-middle pt-1 ml-1 text-md">Settings</StyledText>
            </StyledView>
          </Pressable>

          <StyledView className= "w-full flex flex-row mt-[170] rounded-2xl justify-center bg-white">
            <MaterialIcons name = "logout" size= {30} color = "red" style = {{marginTop: 15, marginBottom: 15}} />
            <StyledText className=" text-[#FF3636] pt-4 font-pbold text-xl ml-2">End session</StyledText>
          </StyledView>

        </StyledView>
      </StyledView>

      <ProfileEditing changeTab = {changeTab} className = {`${currTab == "edit" ? "" : "hidden"}`}/>
    </StyledView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  image: {
    flex: 1,
    display: 'flex',
    resizeMode: 'contain',
    width: 100,
    height: 100,
    borderRadius: 15,
  },
})