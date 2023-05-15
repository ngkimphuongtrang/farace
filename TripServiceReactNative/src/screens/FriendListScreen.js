import React, { useState, useEffect } from 'react';
import {
  View,
  Image, Alert,
  StyleSheet, ScrollView, Text, Button, StatusBar
} from 'react-native';
import { bottomTabIcon, icons } from '../assets/image/index.js';
import { colors, endpoints, keys } from '../constants/index.js';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDataFromAsyncStorage } from '../components/util.js';
import { styles } from '../styles/CommonStyles.js';

const FriendListScreen = ({ navigation }) => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      async function getData() {
        const userId = await getDataFromAsyncStorage(keys.userId);
        const request = `${endpoints.members}/${userId}/friend`;
        axios.get(request)
          .then(function (response) {
            setMembers(response.data);
            console.log(`${request} response:`, members);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      getData();
    });
    return unsubscribe;
  }, []);

  const handleClickRequests = () => {
    navigation.navigate("FriendRequest");
  }
  const handleClickFindFriend = () => {
    navigation.navigate('FindFriend');
  }
  return (
    <SafeAreaView style={styles.ContainerScreen}>
      <SafeAreaView style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight
      }}>
        <ScrollView style={{
          marginHorizontal: 20,
        }}>
          {
            members.length > 0 ? members?.map((member, i) => {
              return (
                <View key={i} style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10 }}>
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={bottomTabIcon.profile}
                  />
                  <View style={{ flexDirection: 'column', justifyContent: 'flex-start', marginLeft: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontStyle: 'italic' }}>{member['orderId'] + 1},</Text>
                      <Text style={{ fontWeight: 'bold' }} >{member['firstName']} {member['lastName']}</Text>
                    </View>
                    {/* <Text color={colors.primary}>{member.email}</Text>: */}
                    <Text>{member['email']}</Text>
                  </View>
                </View>
              );
            }) : <Text style={{ fontSize: 18, alignItems: 'center' }}>Bạn hiện chưa có người bạn nào</Text>
          }
        </ScrollView>
        <View style={[{ alignContent: 'space-between', justifyContent: 'space-around', marginBottom: 50, marginLeft: 10, flexDirection: 'row' }]}>
          <View style={[{ width: "40%", alignContent: 'center', marginBottom: 20 }, styles.BorderStyle]}>
            <Button
              onPress={handleClickRequests}
              title="Lời mời kết bạn"
              color={colors.primary}
            />
          </View>
          <View style={[{ width: "40%", alignContent: 'center', marginBottom: 20 }, styles.BorderStyle]}>
            <Button
              onPress={handleClickFindFriend}
              title="Tìm bạn bè"
              color={colors.switch2}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaView >
  );
};

export default FriendListScreen;

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.primary,
  },
  logo: {
    height: 60,
    width: 60 * 2.7,

  },
  logoContainer: {
    marginTop: 320,
    marginLeft: 30,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});