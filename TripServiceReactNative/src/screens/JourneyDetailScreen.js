import { React, useEffect, useState } from 'react';
import {
  View, Button, SafeAreaView, ScrollView, StatusBar, Text, StyleSheet
} from 'react-native';
import { colors, endpoints } from '../constants';
import { styles } from '../styles/CommonStyles';
import axios from 'axios';

const JourneyDetailScreen = ({ route, navigation }) => {
  const { groupId } = route.params;
  const [location, setLocation] = useState([]);
  const [member, setMember] = useState([]);
  useEffect(() => {
    let groupIdValue = JSON.stringify(groupId);
    groupIdValue = groupIdValue.substring(1, groupIdValue.length - 1);
    console.log("GET:", endpoints.tripDetail + groupIdValue + "/detail", typeof groupIdValue);
    async function getData() {
      axios.get(`${endpoints.tripDetail}${groupId}/detail`)
        .then(function (response) {
          console.log("Journey Detail Screen:", response, response.data);
          setLocation(response.data.locations);
          setMember(response.data.customers);
        })
    }
    getData()

  }, [])
  const renderLocations = () => {
    return location.map((l, i) => (
      <View
        key={i}
        style={[
          styles.locationContainer,
          { backgroundColor: i % 2 === 0 ? colors.generic3 : colors.generic4 }
        ]}
      >
        <Text style={styles.locationText}>{`${i + 1} - ${l.name}`}</Text>
      </View>
    ));
  };

  const renderMembers = () => {
    return member.map((m, i) => (
      <View
        key={i}
        style={[
          styles.memberContainer,
          { backgroundColor: i % 2 === 0 ? colors.spot1 : colors.spot2 }
        ]}
      >
        <Text style={styles.memberText}>{`${i + 1} - ${m.firstName} ${m.lastName} - ${m.email}\n`}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.ContainerScreen}>
      <SafeAreaView style={[myStyles.safeAreaViewContainer, styles.BorderStyle]}>

        <ScrollView style={myStyles.scrollViewContainer}>
          {renderLocations}
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={myStyles.safeAreaViewContainer}>

        <ScrollView style={myStyles.scrollViewContainer}>
          {renderMembers}
        </ScrollView>
      </SafeAreaView>
      <View style={myStyles.buttonContainer}>
        <Button
          title="Bắt đầu"
          onPress={() => navigation.navigate("LiveJourney")}>
        </Button>
      </View>
    </View>
  );
};
export default JourneyDetailScreen;

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
