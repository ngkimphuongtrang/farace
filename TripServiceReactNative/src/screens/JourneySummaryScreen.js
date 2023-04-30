import { React, useEffect, useState } from 'react';
import {
  View, StyleSheet, Button, SafeAreaView, ScrollView, StatusBar, Text
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { primaryColor } from '../constants';
import { styles } from '../styles/CommonStyles';
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
        console.log("JourneySummaryScreen location:", _locationData);
        setLocation(_locationData);
      }
      const memberSerialized = await AsyncStorage.getItem('@member');
      if (memberSerialized) {
        const _memberData = JSON.parse(memberSerialized);
        console.log("JourneySummaryScreen member:", _memberData);
        setMember(_memberData);
      }
    }
    getData()

  }, [])
  return (
    <View style={styles.ContainerScreen}>
      <SafeAreaView style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight
      }}>

        <ScrollView style={{
          marginHorizontal: 20,
        }}>

          {location.map((l, i) =>
            <View style={[{ alignContent: 'center', marginBottom: 5, backgroundColor: primaryColor }, styles.BorderStyle]}>
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