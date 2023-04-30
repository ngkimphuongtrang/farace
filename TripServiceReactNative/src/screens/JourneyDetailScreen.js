import { React, useEffect, useState } from 'react';
import {
  View, StyleSheet, Button, SafeAreaView, ScrollView, StatusBar, Text
} from 'react-native';
import { genericColor3, genericColor4, getTripDetailDomain, spotColor1, spotColor2 } from '../constants';
import { styles } from '../styles/CommonStyles';
import axios from 'axios';

const JourneyDetailScreen = ({ route, navigation }) => {
  const { groupId } = route.params;
  const [location, setLocation] = useState([]);
  const [member, setMember] = useState([]);
  useEffect(() => {
    let groupIdValue = JSON.stringify(groupId);
    groupIdValue = groupIdValue.substring(1, groupIdValue.length - 1);
    console.log("GET:", getTripDetailDomain + groupIdValue + "/detail", typeof groupIdValue);
    async function getData() {
      axios.get(getTripDetailDomain + groupIdValue + "/detail")
        .then(function (response) {
          console.log("Journey Detail Screen:", response, response.data);
          setLocation(response.data.locations);
          setMember(response.data.customers);
        })
    }
    getData()

  }, [])
  return (
    <View style={styles.ContainerScreen}>
      <SafeAreaView style={[{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        margin: 10,
      }, styles.BorderStyle]}>

        <ScrollView style={{
          marginHorizontal: 20,
        }}>
          {location.map((l, i) =>
            i % 2 == 0 ?
              <View style={[
                {
                  alignContent: 'center', marginBottom: 5,
                  backgroundColor: genericColor3
                },
                styles.BorderStyle, { borderColor: genericColor3 }
              ]}>
                <Text style={{ fontWeight: 'bold' }}>{i + 1} - {l.name}</Text>
              </View> :
              <View style={[
                {
                  alignContent: 'center', marginBottom: 5,
                  backgroundColor: genericColor4
                },
                styles.BorderStyle,
                { borderColor: genericColor4 }]}>
                <Text style={{ fontWeight: 'bold' }}>{i + 1} - {l.name}</Text>
              </View>)
          }
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight
      }}>

        <ScrollView style={{
          marginHorizontal: 20,
        }}>
          {member.map((l, i) =>
            i % 2 == 0 ?
              <View style={[
                {
                  alignContent: 'center',
                  //  marginBottom: 5,
                  backgroundColor: spotColor1
                },
                styles.BorderStyle, { borderColor: spotColor1 }
              ]}>
                <Text style={{ fontWeight: 'bold' }}>{i + 1} - {l.firstName}{l.lastName} -  {l.email} {'\n'}</Text>
              </View> :
              <View style={[
                { alignContent: 'center', marginBottom: 5, backgroundColor: spotColor2 },
                styles.BorderStyle,
                { borderColor: spotColor2 }]}>
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
export default JourneyDetailScreen;

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