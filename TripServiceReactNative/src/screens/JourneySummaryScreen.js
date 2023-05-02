import { React, useEffect, useState } from 'react';
import {
  View, Button, SafeAreaView, ScrollView, StatusBar, Text, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/CommonStyles';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants';

const JourneySummaryScreen = ({ navigation: { goBack } }) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState([]);
  const [member, setMember] = useState([]);
  useEffect(() => {
    async function getData() {
      const locationSerialized = await AsyncStorage.getItem("@location");
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
      {/* <SafeAreaView style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight
      }}>

        <ScrollView style={{
          marginHorizontal: 20,
        }}>

          {location.map((l, i) =>
            <View style={[{ alignContent: 'center', marginBottom: 5, backgroundColor: colors.primary }, styles.BorderStyle]}>
              <Text>{i + 1} - {l}</Text>
            </View>)}

        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight
      }}>

        <ScrollView style={{
          backgroundColor: colors.primary,
          marginHorizontal: 20,
        }}>
          {member.map((l, i) => <Text>{i + 1} - {l.firstName}{l.lastName} {'\n'}</Text>)}
        </ScrollView>
      </SafeAreaView> */}

      <SafeAreaView style={[myStyles.safeAreaViewContainer, styles.BorderStyle]}>

        <ScrollView style={myStyles.scrollViewContainer}>
          {location.map((l, i) =>
            i % 2 == 0 ?
              <View style={[
                {
                  alignContent: 'center', marginBottom: 5,
                  backgroundColor: colors.generic3
                },
                styles.BorderStyle, { borderColor: colors.generic3 }
              ]} key={i}>
                <Text style={{ fontWeight: 'bold' }}>{i + 1} - {l.name}</Text>
              </View> :
              <View style={[
                {
                  alignContent: 'center', marginBottom: 5,
                  backgroundColor: colors.generic4
                },
                styles.BorderStyle,
                { borderColor: colors.generic4 }]}>
                <Text style={{ fontWeight: 'bold' }}>{i + 1} - {l.name}</Text>
              </View>)
          }
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={myStyles.safeAreaViewContainer}>

        <ScrollView style={myStyles.scrollViewContainer}>
          {member.map((l, i) =>
            i % 2 == 0 ?
              <View style={[
                {
                  alignContent: 'center',
                  //  marginBottom: 5,
                  backgroundColor: colors.spot1
                },
                styles.BorderStyle, { borderColor: colors.spot1 }
              ]} key={i}>
                <Text style={{ fontWeight: 'bold' }}>{i + 1} - {l.firstName}{l.lastName} -  {l.email} {'\n'}</Text>
              </View> :
              <View style={[
                { alignContent: 'center', backgroundColor: colors.spot2 },
                styles.BorderStyle,
                { borderColor: colors.spot2 }]}>
                <Text style={{ fontWeight: 'bold' }}>{i + 1} - {l.firstName}{l.lastName} - {l.email} {'\n'}</Text>
              </View>)
          }
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

const myStyles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    margin: 10,
  },
  scrollViewContainer: {
    marginHorizontal: 20,
  },
  buttonContainer: {
    alignItems: 'center'
  }
})