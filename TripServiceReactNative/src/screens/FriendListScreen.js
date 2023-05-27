import React, { useState, useEffect } from 'react';
import {
  View, ScrollView, Text, Button, StatusBar, TouchableOpacity
} from 'react-native';
import { colors, endpoints, keys } from '../constants/index.js';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDataFromAsyncStorage } from '../components/util.js';
import { styles } from '../styles/CommonStyles.js';
import UserComponent from '../components/UserComponent.js';

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
            // console.log(`${request} response:`, members, '\n', response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      getData();
      // setMembers([{ "birthDay": "2020-08-21T23:15:30", "email": "nkpt2", "firstName": "Trang", "id": "2dbbd0a3-1a39-45d9-9b9e-1fe268845d35", "imgUrl": null, "lastName": "Phuong", "orderId": 0, "phoneNumber": null }, { "birthDay": "0001-01-01T00:00:00", "email": "hiennguyen", "firstName": "Hiên", "id": "8023dc54-026e-4636-8833-a96e1f79161c", "imgUrl": null, "lastName": "Nguyễn", "orderId": 1, "phoneNumber": null }, { "birthDay": "2001-06-08T00:00:00", "email": "nkpt1", "firstName": "Trang Ph", "id": "adabdaa8-89b1-491e-93ad-8bd6fc8fc333", "imgUrl": null, "lastName": "Nguyen", "orderId": 2, "phoneNumber": "0323882823" }])
    });
    return unsubscribe;
  }, []);

  const handleClickRequests = () => {
    navigation.navigate("FriendRequest");
  }
  const handleClickFindFriend = () => {
    navigation.navigate('FindFriend');
  }
  const handleClickFriendProfile = (friendId) => {
    // console.log("Friend Id:", friendId);
    navigation.navigate("FriendProfile", { FriendId: friendId })
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
                <TouchableOpacity onPress={() => handleClickFriendProfile(member['id'])}>
                  <UserComponent
                    key={i}
                    member={member}
                    bgColor={colors.switch1}
                  /></TouchableOpacity>
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
