import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMyUserId = async () => {
  try {
    return await AsyncStorage.getItem('@userId').then((response) => { return response });
  } catch (error) {
    console.log("get userId fail")
  }
}