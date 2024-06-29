import { StyleSheet, View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import { Link } from 'expo-router';

const Stack = createNativeStackNavigator();

const index = () => {
  return (
    <View style = {styles.container}>
      <Text>Hello</Text>
      <Link href = "/screens/HomeScreen">Go to HomeScreen</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default index