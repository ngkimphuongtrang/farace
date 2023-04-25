import { React, useEffect, useState } from 'react';
import {
  View, StyleSheet, Button, SafeAreaView, ScrollView, StatusBar, Text
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { primaryColor } from '../constants';
import { textButtonStyles } from '../components/TextButtonComponent';
import { useNavigation } from '@react-navigation/native';

const JourneySummaryScreen = ({ navigation: { goBack } }) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState([]);
  const [member, setMember] = useState([]);
  useEffect(() => {
    async function getData() {
      const locationSerialized = await AsyncStorage.getItem("@locationName");
      if (locationSerialized) {
        const _locationData = JSON.parse(locationSerialized);
        console.log("location:", _locationData);
        setLocation(_locationData);
      }
      const memberSerialized = await AsyncStorage.getItem('@member');
      if (memberSerialized) {
        const _memberData = JSON.parse(memberSerialized);
        console.log("member:", _memberData);
        setMember(_memberData);
      }
    }
    getData()

  }, [])
  return (
    <View style={mystyles.container}>
      <SafeAreaView style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight
      }}>

        <ScrollView style={{
          marginHorizontal: 20,
        }}>

          {location.map((l, i) =>
            <View style={[{ alignContent: 'center', marginBottom: 5, backgroundColor: primaryColor }, textButtonStyles.borderStyle]}>
              <Text>{i + 1} - {l}</Text>
            </View>)}

        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight
      }}>

        <ScrollView style={{
          backgroundColor: primaryColor,
          marginHorizontal: 20,
        }}>

          {member.map((l, i) => <Text>{i + 1} - {l.firstName}{l.lastName} {'\n'}</Text>)}

        </ScrollView>
      </SafeAreaView>
      <View style={{ alignItems: 'center' }}>
        <Button
          title="Bắt đầu"
          onPress={() => navigation.navigate("LiveJourney")}>
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