import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import JourneyScreen from '../screens/JourneyScreen';
import { primaryColor } from '../constants';
import FriendScreen from '../screens/FriendScreen';
import MessageScreen from '../screens/MessageScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { HOME_ICON, FRIENDS_ICON, MOTOR_ICON, CHAT_ICON, PROFILE_ICON } from '../assets/image';
import { Image } from 'react-native';
import { styles } from '../styles/CommonStyles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddJourneyScreen from '../screens/AddJourneyScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function BottomTab() {
  return (<Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: primaryColor,
      headerShown: false,

    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Trang chủ',
        tabBarIcon: () => (
          <Image
            source={HOME_ICON}
            style={styles.image}></Image>),
      }}
    />
    <Tab.Screen
      name="Friend"
      component={FriendScreen}
      options={{
        tabBarLabel: 'Bạn bè',
        tabBarIcon: () => (
          <Image
            source={FRIENDS_ICON}
            style={styles.image}></Image>),
      }} />
    <Tab.Screen
      name="Journey"
      component={JourneyScreen}
      options={{
        tabBarLabel: 'Phượt',
        tabBarIcon: () => (
          <Image
            source={MOTOR_ICON}
            style={styles.image}></Image>),
      }}
    />
    <Tab.Screen
      name="Message"
      component={MessageScreen}
      options={{
        tabBarLabel: 'Tin nhắn',
        tabBarBadge: 3,
        tabBarIcon: () => (
          <Image
            source={CHAT_ICON}
            style={styles.image}></Image>),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Cá nhân',
        tabBarIcon: () => (
          <Image
            source={PROFILE_ICON}
            style={styles.image}></Image>),
      }}
    />
  </Tab.Navigator>)
}
export const AppStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="BottomTab" component={BottomTab}></Stack.Screen>
        <Stack.Screen name="AddJourney" component={AddJourneyScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};