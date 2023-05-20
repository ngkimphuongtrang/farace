import AsyncStorage from "@react-native-async-storage/async-storage";

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