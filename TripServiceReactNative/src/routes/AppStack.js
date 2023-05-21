import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import JourneyScreen from '../screens/JourneyScreen';
import FriendScreen from '../screens/FriendScreen';
import MessageScreen from '../screens/MessageScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { bottomTabIcon } from '../assets/image';
import { Image } from 'react-native';
import { styles } from '../styles/CommonStyles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddJourneyScreen from '../screens/AddJourneyScreen';
import { NavigationContainer } from '@react-navigation/native';
import AddMemberScreen from '../screens/AddMemberScreen';
import Map from '../screens/Map';
import JourneyDetailScreen from '../screens/JourneyDetailScreen';
import FriendRequestScreen from '../screens/FriendRequestScreen';
import FriendListScreen from '../screens/FriendListScreen';
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
            source={bottomTabIcon.home}
            style={styles.image}></Image>),
      }}
    />
    <Tab.Screen
      name="FriendStack"
      component={FriendStackScreen}
      options={{
        tabBarLabel: 'Bạn bè',
        tabBarIcon: () => (
          <Image
            source={bottomTabIcon.friend}
            style={styles.image}></Image>),
      }} />
    <Tab.Screen
      name="JourneyStack"
      component={JourneyStackScreen}
      options={{
        tabBarLabel: 'Phượt',
        tabBarIcon: () => (
          <Image
            source={bottomTabIcon.motor}
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
            source={bottomTabIcon.chat}
            style={styles.image}></Image>),
      }}
    />
    <Tab.Screen
      name="ProfileStack"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Cá nhân',
        tabBarIcon: () => (
          <Image
            source={bottomTabIcon.profile}
            style={styles.image}></Image>),
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
  </Tab.Navigator>)
}
const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Trang cá nhân",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />

    </ProfileStack.Navigator>
  )
}
const FriendStack = createNativeStackNavigator();
function FriendStackScreen() {
  return (
    <FriendStack.Navigator>
      <FriendStack.Screen
        name="FriendList"
        component={FriendListScreen}
        options={{
          title: "Danh sách bạn bè",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      <FriendStack.Screen
        name="FindFriend"
        component={FriendScreen}
        options={{
          title: "Tìm bạn bè",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      <FriendStack.Screen
        name="FriendRequest"
        component={FriendRequestScreen}
        options={{
          title: "Lời mời kết bạn",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />

    </FriendStack.Navigator>
  )
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
      <JourneyStack.Screen name="UpdateLocations" component={AddJourneyScreen}
        options={{
          title: "Chỉnh sửa địa điểm", headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      <JourneyStack.Screen name="UpdateMembers" component={AddMemberScreen}
        options={{
          title: "Chỉnh sửa thành viên", headerStyle: {
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