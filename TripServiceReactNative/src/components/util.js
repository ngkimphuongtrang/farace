import AsyncStorage from "@react-native-async-storage/async-storage";
import storage from '@react-native-firebase/storage';

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
  // console.log("userId+:", pathImage);
  try {
    const storageRef = storage().ref(pathImage);
    const url = await storageRef.getDownloadURL();
    // console.log("get url image:", url);
    if (typeof url === 'string' || url instanceof String) {
      // console.log("get url success");
      return url;
    }
    else return null;
  } catch (e) {
    console.log("Error get firestore:", e);
    return null;
  }
}