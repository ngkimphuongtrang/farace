import { React, useEffect, useState } from 'react';
import {
  View, Button, SafeAreaView, ScrollView, StatusBar, Text, StyleSheet
} from 'react-native';
import { colors, endpoints } from '../constants';
import { styles } from '../styles/CommonStyles';
import axios from 'axios';
import MapViewDirections from 'react-native-maps-directions';
import { BLUE_MARKER_ICON } from '../assets/image/index.js';
import MapView, { Marker } from "react-native-maps";

const JourneyDetailScreen = ({ route, navigation }) => {
  const { groupId } = route.params;
  const [location, setLocation] = useState([]);
  const [member, setMember] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [coordinate, setCoordinate] = useState(
    {
      latitude: 10.7212249,
      longitude: 106.6673316,
    })
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
  useEffect(() => {
    calculateRoutes();
  }, [location]);
  const calculateRoutes = () => {
    const routes = [];
    for (let i = 0; i < location.length - 1; i++) {
      const origin = location[i];
      const destination = location[i + 1];
      routes.push({
        origin,
        destination,
        waypoints: [],
      });
    }
    setRoutes(routes);
  };
  return (
    <View style={styles.ContainerScreen}>
      {
        location.length === 0 ?
          (
            <MapView
              style={myStyles.map}
              initialRegion={
                {
                  latitude: coordinate.latitude,
                  longitude: coordinate.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
              }>
            </MapView>
          ) :
          (<MapView
            style={myStyles.map}
            initialRegion={
              {
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            }
            region={{
              latitude: location[location.length - 1].latitude,
              longitude: location[location.length - 1].longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }
            }>
            {
              location.map((coordinate, index) =>
                index == location.length - 1 ? <Marker
                  key={index}
                  coordinate={{
                    latitude: coordinate["latitude"],
                    longitude: coordinate["longitude"],
                  }}
                  draggable

                /> : <Marker
                  key={index}
                  coordinate={{
                    latitude: coordinate["latitude"],
                    longitude: coordinate["longitude"],
                  }}
                  draggable
                  image={BLUE_MARKER_ICON} // red is destination
                />


              )
            }
            {routes.map((route, index) => (
              <MapViewDirections
                key={index}
                origin={route.origin}
                waypoints={route.waypoints}
                destination={route.destination}
                apikey={"AIzaSyCLC8Dw7wItISMh9A_m34OtUFQt2hD3IB8"}
                strokeWidth={4}
                strokeColor="rgb(0,139,241)"
              />
            ))}
          </MapView>
          )
      }
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
  },
  map: {
    flex: 3
  }
})
