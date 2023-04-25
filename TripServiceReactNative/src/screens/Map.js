import React, { useState,useEffect } from "react";
import { StyleSheet, Text, ScrollView , View , Platform, PermissionsAndroid,Image, Dimensions} from "react-native";
import MapView,{Marker} from "react-native-maps";
import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';
import { TRIP_ICON } from "../images";
import axios from "axios";
import Geolocation from "@react-native-community/geolocation";
import MapViewDirections from "react-native-maps-directions";
import {PROFILE_ICON } from '../images';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
const User = [
  {
      icon: PROFILE_ICON,
      text: 'User1',
  },
  {
      icon: PROFILE_ICON,
      text: 'User2',
  },
  {
      icon: PROFILE_ICON,
      text: 'User3',
  },
  {
      icon: PROFILE_ICON,
      text: 'User4',
  },
  {
      icon: PROFILE_ICON,
      text: 'User5'
  },

]


const Map = () => {
  const [distanceLocation, SetDistanceLocation] = useState(
    [
      {
        locationName : "ABC",
        latitude : 10.8002149,
        longitude : 106.6673316,
        distance : 123.2
      },
      {
        locationName : "DEF",
        latitude : 10.8002149,
        longitude : 106.6673316,
        distance : 123.2
      },
      {
        locationName : "GHK",
        latitude : 10.8002149,
        longitude : 106.6673316,
        distance : 123.2
      }
      
    ]
  )
  const [coordinates, setCoordinates] = useState([
    {
      userId : "1",
      latitude: 10.8002149,
      longitude: 106.6673316,
    },
    {
      userId : "2",
      latitude: 10.8002149,
      longitude: 106.6793316,
    }
  ])
  const [ownerLocation, setOwnerLocation] = useState([
    {
      userId : ownerId,
      latitude: 10.8002149,
      longitude: 106.6673316,
    }
  ])
  const groupId = "1";
  const ownerId= "1";
  const pusher = Pusher.getInstance();

  pusher.init({
    apiKey: "9ce4abce09e857dc02f8",
    cluster: "ap1"
  });
  pusher.connect();
  pusher.subscribe({
    channelName: groupId, 
    onEvent: (event: PusherEvent) => { 
      console.log(event);
        setCoordinates(coordinates.map(
          (coordinate) => {
            if(coordinate.userId == event.eventName) 
            {
              var coordinateJson = JSON.parse(event.data)
              return { ...coordinate, latitude: parseFloat(coordinateJson['latitude']), longitude: parseFloat(coordinateJson['longitude'])};
            }
            else
            {
              return coordinate
            }
          }
        )
      )
    }
  });

  Geolocation.getCurrentPosition(
    (position) => {
      setOwnerLocation(preStage =>(
        {
          ...preStage,
          latitude: position.coords.latitude,
          longtitude: position.coords.longitude,
        }
      ))}
  )

  useEffect(() => {
    setInterval(() => {
      Geolocation.getCurrentPosition(
        (position) => {
          var distances = axios.post('https://b12b-2001-ee0-5202-3e00-3c0e-d994-f63-a1ef.ap.ngrok.io/DistanceLocation', {
            latitude: position.coords.latitude,
            longtitude: position.coords.longitude,
            userId: ownerId
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          SetDistanceLocation(distanceLocation.map(
            (distanceLocation) => {
              return {...distanceLocation, 
                distance : distances['distance'],
                locationName : distances['locationName'] };
            }
          ))
          })
    }, 500000);
  },[]);
  
  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <View style={styles.header.box}>
          <ScrollView>
            {User.map((p, i) => (
                <View style = {styles.info} key={i}>
                    <Image
                        style={styles.image}
                        source={p.icon}></Image>
                    <Text style = {{marginLeft: 10,fontSize:12}}>10 km</Text>
                    <Text style = {{marginLeft: 10,fontSize:12}}>Di chuyển</Text>
                </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.header.box}>
          <ScrollView>
                  {
                    distanceLocation.map((x,i) =>
                    <View style = {styles.info} key={i}>
                      <Text style = {{marginLeft: 5,fontSize:12}}>{x.locationName}</Text>
                      <Text style = {{marginLeft: 5,fontSize:12}}>{x.distance}</Text>
                    </View>
                    )
                  }
          </ScrollView>
        </View>
      </View>
      {/* <TouchableOpacity onPress={SendLocation}>
        <Text>Press here</Text>
      </TouchableOpacity> */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: ownerLocation[0].latitude,
          longitude: ownerLocation[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
        }>
        {
          coordinates.map((coordinate,index) =>
          <Marker
            key={index}
            coordinate={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
            }}
          />
          )
        } 
        {/* <MapViewDirections
          origin={{
            latitude: 10.8002149,
            longitude: 106.6673316,
          }}
          destination={{
            latitude: 10.7002149,
            longitude: 106.6673316,
          }}
          apikey={"AIzaSyCLC8Dw7wItISMh9A_m34OtUFQt2hD3IB8"}
          strokeWidth={4}
          strokeColor="rgb(0,139,241)"
        /> */}
      </MapView>
      {/* <Footer id="2"/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  header:{
    flex: 0.3,
    flexDirection: 'row',
    alignItems : "center",
    box : {
      height: '70%', 
      width: '40%', 
      backgroundColor: '#D9D9D9' ,
      borderRadius: 10,
      margin: '5%'
    },
    
  },
  map: {
    flex: 0.6
  },
  image: {
    width: 30,
    height: 30,
  },
  info:{
    paddingTop:15,
    paddingLeft:5,
    paddingRight:5,
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
  }
});
export default Map;