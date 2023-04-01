import { React } from 'react';
import {
  View, StyleSheet, Button
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const JourneySummaryScreen = ({ navigation: { goBack } }) => {
  return (
    <View style={mystyles.container}>
      {/* <HeaderComponent text="Tổng quan hành trình" style={{ flex: 2 }} goBack={goBack} /> */}
      <View
        style={{ flex: 8 }}
      >


      </View>
      <View style={{ alignItems: 'center' }}>
        <Button
          // onPress={() => { setMemberValue(member); console.log(AsyncStorage.getItem('@location')); }}
          title="Tiếp tục">
        </Button>
      </View>


    </View>
  );
};

export default JourneySummaryScreen;

const mystyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
});