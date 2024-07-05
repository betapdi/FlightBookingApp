import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useContext, createContext, useState } from 'react'

export const UserInfoContext = createContext({});

export const UserInfoProvider = ({ children }) => {
  const [name, setName] = useState({firstName: 'Victoria', lastName: 'Yoker'});
  const [phone, setPhone] = useState("+380123456789");
  const [email, setEmail] = useState("victoria.yoker@gmail.com");
  const [avatar, setAvatar] = useState({default: require('../../assets/images/Avatar.png'), uri: ""});

  return (
		<UserInfoContext.Provider value = {{name, setName, phone, setPhone, email, setEmail, avatar, setAvatar}}>
			{children}
		</UserInfoContext.Provider>
  )
}
