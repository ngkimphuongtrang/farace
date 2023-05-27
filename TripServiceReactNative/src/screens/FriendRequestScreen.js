import React, { useState, useEffect } from 'react';
import {
  View,
  Image, Alert,
  StyleSheet, ScrollView, Text, TouchableOpacity, StatusBar
} from 'react-native';
import { bottomTabIcon, icons } from '../assets/image/index.js';
import { colors, endpoints, keys } from '../constants/index.js';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDataFromAsyncStorage } from '../components/util.js';
import { styles } from '../styles/CommonStyles.js';

const FriendRequestScreen = ({ navigation }) => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    async function getData() {
      const userId = await getDataFromAsyncStorage(keys.userId);
      const request = `${endpoints.members}/${userId}/waiting`;
      axios.get(request)
        .then(function (response) {
          setMembers(response.data);
          // console.log(`${request} response:`, members);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    getData();
  }, []);
  const acceptRequestSuccess = (member) => {
    Alert.alert('Đồng ý lời mời kết bạn thành công', member['firstName'] + " " + member['lastName'] + " " + member['email'], [
      {
        text: 'OK',
      },
    ]);
  }
  const acceptRequestFail = (member) => {
    Alert.alert('Đồng ý lời mời kết bạn thất bại', member['firstName'] + " " + member['lastName'] + " " + member['email'], [
      {
        text: 'OK',
      },
    ]);
  }
  const handleAcceptRequest = async (member) => {
    const request = endpoints.acceptRequest;
    let UserIdReceive = await getDataFromAsyncStorage(keys.userId);
    let UserIdSend = member['id'];
    // console.log(request, { UserIdSend, UserIdReceive });
    await axios.post(request, {
      UserIdSend, UserIdReceive
    }).then(function (response) {
      // console.log("Accept:", response, response.data);
      setMembers(response.data);
      acceptRequestSuccess(member);
    }).catch(function (error) {
      acceptRequestFail(member);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
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
                <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={bottomTabIcon.profile}
                  />
                  <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontStyle: 'italic' }}>{member['orderId'] + 1},</Text>
                      <Text style={{ fontWeight: 'bold' }} >{member['firstName']} {member['lastName']}</Text>
                    </View>
                    {/* <Text color={colors.primary}>{member.email}</Text>: */}
                    <Text>{member['email']}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleAcceptRequest(member)}>
                    <Image source={icons.acceptFriend}
                      style={
                        {
                          justifyContent: 'center',
                          height: 40,
                          width: 40,
                        }
                      }></Image></TouchableOpacity>
                </View>
              );
            }) : <Text style={{ fontSize: 18, alignItems: 'center' }}>Bạn hiện không có lời mời kết bạn nào</Text>
          }
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView >
  );
};

export default FriendRequestScreen;

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