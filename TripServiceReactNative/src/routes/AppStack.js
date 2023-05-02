import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import JourneyScreen from '../screens/JourneyScreen';
import FriendScreen from '../screens/FriendScreen';
import MessageScreen from '../screens/MessageScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { HOME_ICON, FRIENDS_ICON, MOTOR_ICON, CHAT_ICON, PROFILE_ICON } from '../assets/image';
import { Image } from 'react-native';
import { styles } from '../styles/CommonStyles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddJourneyScreen from '../screens/AddJourneyScreen';
import { NavigationContainer } from '@react-navigation/native';
import AddMemberScreen from '../screens/AddMemberScreen';
import JourneySummaryScreen from '../screens/JourneySummaryScreen';
import Map from '../screens/Map';
import JourneyDetailScreen from '../screens/JourneyDetailScreen';

import { colors } from '../constants';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (<Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: colors.primary,
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
      name="JourneyStack"
      component={JourneyStackScreen}
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
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
  </Tab.Navigator>)
}
const JourneyStack = createNativeStackNavigator();
function JourneyStackScreen() {
  return (
    <JourneyStack.Navigator>
      <JourneyStack.Screen
        name="Journey"
        component={JourneyScreen}
        options={{
          title: "Danh sách hành trình",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      <JourneyStack.Screen name="AddJourney" component={AddJourneyScreen}
        options={{
          title: "Thêm mới hành trình", headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      <JourneyStack.Screen name="AddMember" component={AddMemberScreen}
        options={{
          title: "Thêm thành viên", headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      <JourneyStack.Screen name="JourneySummary" component={JourneySummaryScreen}
        options={{
          title: "Tổng quan hành trình", headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      <JourneyStack.Screen name="LiveJourney" component={Map}
        options={{
          title: "Thực chiến", headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      <JourneyStack.Screen name="JourneyDetailScreen" component={JourneyDetailScreen}
        options={{
          title: "Chi tiết hành trình", headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            fontWeight: 'bold',

          },
        }} />
    </JourneyStack.Navigator>
  )
}

const Stack = createNativeStackNavigator();
export const AppStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="JourneyStackScreen" component={JourneyStackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};