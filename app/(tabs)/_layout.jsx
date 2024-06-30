import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Booking/BookingScreen"
        options={{
          title: 'Booking',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="ticket-percent-outline" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Notification/NotificationScreen"
        options={{
          title: 'Notification',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons size={28} name="notifications" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Profile/ProfileScreen"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}