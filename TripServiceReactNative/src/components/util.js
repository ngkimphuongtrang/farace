import AsyncStorage from "@react-native-async-storage/async-storage";
import storage from '@react-native-firebase/storage';
import { endpoints } from "../constants";
import axios from 'axios';

export const getDataFromAsyncStorage = async (key) => {
  try {
    return await AsyncStorage.getItem(key).then((response) => { return response });
  } catch (error) {
    console.log("GET fail", key);
  }
}

export const storeGroupId = async (groupId) => {
  try {
    await AsyncStorage.setItem("groupId", groupId);
  } catch (e) {
    console.log("error set group id");
  }
}
import { Dimensions } from 'react-native';
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const getAvatarByUserId = async (userId) => {
  const pathImage = userId + '.jpg';
  try {
    const storageRef = storage().ref(pathImage);
    const url = await storageRef.getDownloadURL();
    if (typeof url === 'string' || url instanceof String) {
      return url;
    }
    else return null;
  } catch (e) {
    console.log("Error get firestore:", e);
    return null;
  }
}

export const getUserInfoById = async (userId) => {
  let myUserId = await getDataFromAsyncStorage(userId);
  let request = `${endpoints.members}/${myUserId}/detail`;
  data = null;
  try {
    await axios.get(request)
      .then(function (response) {
        console.log("getUserInfoById", response.data);
        data = response.data;
        return response.data;
      })

  } catch (error) {
    console.log(error);
  };
  return data;
}