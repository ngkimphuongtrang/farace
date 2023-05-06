import { React, useEffect, useState } from 'react';
import {
  View, Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text
} from 'react-native';
import { colors, endpoints, keys } from '../constants';
import { styles } from '../styles/CommonStyles';
import axios from 'axios';
import MapViewDirections from 'react-native-maps-directions';
import { BLUE_MARKER_ICON } from '../assets/image/index.js';
import MapView, { Marker } from "react-native-maps";
import MemberComponent from '../components/MemberComponent';
import LocationComponent from '../components/LocationComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JourneyDetailScreen = ({ route, navigation }) => {
  let groupId;
  if (route.params) {
    groupId = route.params;
  }
  const [locations, setLocations] = useState([]);
  const [members, setMembers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [coordinate, setCoordinate] = useState(
    {
      latitude: 10.7212249,
      longitude: 106.6673316,
    })
  const [distances, setDistances] = useState([]);
  const [travelTimes, setTravelTimes] = useState([]);
  useEffect(() => {
    async function getData() {
      const { groupId } = route.params;
      let groupIdValue = JSON.stringify(groupId);
      groupIdValue = groupIdValue.substring(1, groupIdValue.length - 1);
      console.log("GET:", `${endpoints.tripDetail}/${groupId}/detail`, typeof groupIdValue);
      axios.get(`${endpoints.tripDetail}/${groupId}/detail`)
        .then(function (response) {
          console.log("Journey Detail Screen:", response, response.data);
          setLocations(response.data.locations);
          setMembers(response.data.customers);

          console.log(locations, members);
        })
    }
    async function getData2() {
      const locationSerialized = await AsyncStorage.getItem(keys.location);
      if (locationSerialized) {
        const _locationData = JSON.parse(locationSerialized);
        console.log("JourneySummaryScreen location:", _locationData);
        setLocations(_locationData);
      }
      const memberSerialized = await AsyncStorage.getItem(keys.member);
      if (memberSerialized) {
        const _memberData = JSON.parse(memberSerialized);
        console.log("JourneySummaryScreen member:", _memberData);
        setMembers(_memberData);
      }
    }
    async function getDistance() {
      let n = locations.length;
      var Distances = [];
      var TravelTimes = [];
      for (let i = 0; i < n - 1; i++) {
        const request = `${endpoints.getDistance}?travel_mode=driving&origin_lng=${locations[i].longitude}&destination_lat=${locations[i + 1].latitude}&destination_lng=${locations[i + 1].longitude}&origin_lat=${locations[i].latitude}`;
        console.log('GET request distance', request);
        axios.get(request)
          .then(function (response) {
            console.log("GET distance:", response, response.data.route);
            Distances.push(response.data["route"]["distance"]);
            TravelTimes.push(response.data["route"]["travel_time"]);
          })
      }
      // source to destination
      setDistances(Distances);
      setTravelTimes(TravelTimes);
    }
    if (groupId)
      getData()
    else
      getData2()
    console.log("length location:", locations.length);
    // getDistance();
    // console.log(distances, travelTimes);

  }, [])
  useEffect(() => {
    calculateRoutes();
  }, [locations]);
  const calculateRoutes = () => {
    const routes = [];
    for (let i = 0; i < locations.length - 1; i++) {
      const origin = locations[i];
      const destination = locations[i + 1];
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
        locations === undefined || locations.length === 0 ?
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
              latitude: locations[locations.length - 1].latitude,
              longitude: locations[locations.length - 1].longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }
            }>
            {
              locations.map((coordinate, index) =>
                index == locations.length - 1 ? <Marker
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

          {locations.map((l, i) =>
            i % 2 == 0 ?
              <LocationComponent key={i} location={l} i={i} backgroundColor={colors.generic3} />
              :
              <LocationComponent key={i} location={l} i={i} backgroundColor={colors.generic4} />
          )
          }
          {/* {distances.map((d, i) => <Text key={i + locations.length}>{d}</Text>)} */}
          {/* {travelTimes.map((d, i) => <Text key={i}>{d}</Text>)} */}
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={myStyles.safeAreaViewContainer}>

        <ScrollView style={myStyles.scrollViewContainer}>
          {members.map((l, i) =>
            i % 2 == 0 ?
              <MemberComponent
                member={l}
                i={i}
                backgroundColor={colors.spot1} />
              :
              <MemberComponent
                member={l}
                i={i}
                backgroundColor={colors.spot2} />
          )
          }
        </ScrollView>
      </SafeAreaView>
      <View style={myStyles.buttonContainer}>
        <Button
          title="Bắt đầu"
          onPress={() => navigation.navigate("LiveJourney", { groupId: groupId })}>
        </Button>
      </View>
    </View >
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
