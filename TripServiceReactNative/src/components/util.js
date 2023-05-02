import AsyncStorage from "@react-native-async-storage/async-storage";

export const getDataFromAsyncStorage = async (key) => {
  try {
    return await AsyncStorage.getItem(key).then((response) => { return response });
  } catch (error) {
    console.log("GET fail", key);
  }
}