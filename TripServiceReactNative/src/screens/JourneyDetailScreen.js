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
    console.log("GET:", `${endpoints.tripDetail}/${groupId}/detail`, typeof groupIdValue);

    async function getData() {
      axios.get(`${endpoints.tripDetail}/${groupId}/detail`)
        .then(function (response) {
          console.log("Journey Detail Screen:", response, response.data);
          setLocation(response.data.locations);
          setMember(response.data.customers);

          console.log(location, member);
        })
    }
    getData()

  }, [])

  return (
    <View style={styles.ContainerScreen}>
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
              ]}key={i}>
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
