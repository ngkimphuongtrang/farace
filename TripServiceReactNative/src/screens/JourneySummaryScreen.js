import { React, useEffect, useState } from 'react';
import {
  View, Button, SafeAreaView, ScrollView, StatusBar, Text, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/CommonStyles';
import { colors } from '../constants';
import MapView, { Marker } from "react-native-maps";
import { BLUE_MARKER_ICON } from '../assets/image';
import MapViewDirections from 'react-native-maps-directions';

const JourneySummaryScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  const [location, setLocation] = useState([]);
  const [member, setMember] = useState([]);
  const [routes, setRoutes] = useState([]);
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
  console.log(location);
  return (
    <View style={styles.ContainerScreen}>
      <MapView
        style={myStyles.map}
        region={{
          latitude: location && location.length > 0 ? location[location.length - 1].latitude : 0,
          longitude: location && location.length > 0 ? location[location.length - 1].longitude : 0,
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
  },
  map: {
    flex: 3
  },
})