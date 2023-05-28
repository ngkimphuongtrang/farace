import React, { useState, useEffect } from "react";
import {  Vibration, StyleSheet, Text, ScrollView, View, Platform, PermissionsAndroid, Image, Dimensions, Modal, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import Geolocation from "@react-native-community/geolocation";
import { Icon } from '@rneui/base';
import { onChildChanged } from "firebase/database";
import { ref } from "firebase/database";
import { onValue } from "firebase/database";
import { db } from "../services/firebase-config";
import { CheckBox } from '@rneui/base';
import Lottie from 'lottie-react-native';
import { AnimationJson, AnimationWarningJson } from "../assets/image";
import { keys } from "../constants";
import { getDataFromAsyncStorage } from "../components/util";
import { endpoints, colors } from "../constants";
import MapViewDirections from "react-native-maps-directions";
import { icons } from '../assets/image/index.js';

const Map = ({ route, navigation }) => {
  const groupId = route.params.groupId;
  const [locations, setLocation] = useState([]);
  const [distanceLocation, SetDistanceLocation] = useState([])
  const [distanceMember, setDistanceMember] = useState([])
  const [coordinateMember, setCoordinateMember] = useState([])
  const [ownerLocation, setOwnerLocation] = useState({
    latitude: 10.7212249,
    longitude: 106.6673316,
  })

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setOwnerLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
      })
  }, []);

  useEffect(() => {
    loadData()
  }, [])


  async function loadData() {
    const userId = await InitData();
    const data = await getData(userId);
    const start = await StartTrip(userId, data.firstName, data.imgUrl);
    IntervalRealtime(start.userId, start.userFirstName, start.imgUrl);

    const notification = ref(db, 'group/' + groupId + '/user/' + start.userId + '/event/arrived');
    onChildChanged(
      notification, (snapshot) => {
        setShowPopup(true);
        Vibration.vibrate([500, 1000, 500]);
        setAnimation(AnimationJson)
      });

    onValue(
      notification, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        if (data != null) {
          var locationName = data["LocationName"]
          setDataFirebase(`Chúc mừng bạn đã đến ${locationName}`)
        }
      });

    const notificationComing = ref(db, 'group/' + groupId + '/user/' + start.userId + '/event/coming');
    onChildChanged(
      notificationComing, (snapshot) => {
        setShowPopup(true);
        Vibration.vibrate([500, 1000, 500]);
        setAnimation(AnimationJson)
      });

    onValue(
      notificationComing, (snapshot) => {
        const data = snapshot.val();
        console.log("data", data)
        if (data != null) {
          var locationName = data["LocationName"].split(',')[0];
          var distance = data["Distance"]
          setDataFirebase(`Bạn còn cách địa điểm ${locationName} ${distance} km`)
        }
      });

    const notificationWeather = ref(db, 'group/' + groupId + '/user/' + start.userId + '/event/weather');
    onChildChanged(
      notificationWeather, (snapshot) => {
        setShowPopup(true);
        Vibration.vibrate([500, 1000, 500]);
        setAnimation(AnimationWarningJson)
      });

    onValue(
      notificationWeather, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        if (data != null) {
          var text = data["Text"]
          setDataFirebase(text)
        }
      });

    const notificationGroup = ref(db, 'group/' + groupId + '/event/arrived');
    onChildChanged(
      notificationGroup, (snapshot) => {
        setShowPopup(true);
        setAnimation(AnimationJson)
      });

    onValue(
      notificationGroup, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        if (data != null) {
          var locationName = data["LocationName"].split(',')[0];
          var userName = data["CustomerName"]
          setDataFirebase(`Thành viên ${userName} đã đến điểm ${locationName}`)
        }
      });
  }

  const InitData = async () => {
    const userId = await getDataFromAsyncStorage(keys.userId);
    return userId;
  }

  const getData = async (userId) => {
    try {
      const response = await axios.get(`${endpoints.tripDetail}/${groupId}/detail`);
      setLocation(response.data.locations);
      for (const element of response.data.customers) {
        if (element.customerId === userId) {
          return { firstName: element.firstName, imgUrl: element.imgUrl };
        }
      }
    } catch (error) {
      console.log("GET detail:", error);
    }
  }

  const StartTrip = async (userId, userFirstName, imgUrl) => {
    Geolocation.getCurrentPosition(
      async (position) => {
        var start = await axios.post(endpoints.start, {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          customerId: userId,
          groupId: groupId,
          firstName: userFirstName,
          imgUrl: imgUrl
        });
        var distances = axios.post(`${endpoints.realTime}`, {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          customerId: userId,
          groupId: groupId,
          firstName: userFirstName,
        })
          .then(function (response) {
            var responseData = response.data
            SetDistanceLocation(responseData["locationRealtimes"])
            setDistanceMember(responseData["customerRealtimes"])
            updateCoordinateMember(responseData)
            setLocation(responseData["locationRealtimes"])
          })
      })
    return { userId, userFirstName, imgUrl };
  }


  const updateCoordinateMember = (responseData) => {
    const updatedCoords = responseData.customerRealtimes.map((customer) => {
      if (customer.latitude !== 0 && customer.longitude !== 0) {
        return {
          latitude: customer.latitude,
          longitude: customer.longitude,
          imgUrl: customer.imgUrl
        };
      }
      return null;
    }).filter(Boolean); // Filter out any null values

    setCoordinateMember(updatedCoords);
  }

  const IntervalRealtime = (userId, userFirstName, imgUrl) => {
    setInterval(() => {
      Geolocation.getCurrentPosition(
        (position) => {
          setOwnerLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
          var distances = axios.post(`${endpoints.realTime}`, {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            customerId: userId,
            groupId: groupId,
            firstName: userFirstName,
            imgUrl: imgUrl
          })
            .then(function (response) {
              var responseData = response.data
              SetDistanceLocation(responseData["locationRealtimes"])
              setDistanceMember(responseData["customerRealtimes"])
              updateCoordinateMember(responseData)
              setLocation(responseData["locationRealtimes"])
            })
            .catch(function (error) {
              console.log(error);
            });
        })
    }, 20000);
  }
  console.log(coordinateMember)
  const [dataFirebase, setDataFirebase] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [animation, setAnimation] = useState(AnimationJson);
  const getDirections = () => {
    const completedLocations = locations.filter(
      (location) => location.isCompleted
    );
    const incompleteLocations = locations.filter(
      (location) => !location.isCompleted
    );
    const directions = [];
    for (let i = 0; i < completedLocations.length; i++) {
      const source = completedLocations[i];
      let destination = completedLocations[i + 1];
      if (destination == null) {
        destination = ownerLocation
      }
      directions.push({
        source,
        destination,
        color: 'green',
      });
    }

    if (incompleteLocations[0] != null) {
      directions.push({
        source: ownerLocation,
        destination: incompleteLocations[0],
        color: 'red',
      });
    }


    for (let i = 0; i < incompleteLocations.length - 1; i++) {
      const source = incompleteLocations[i];
      const destination = incompleteLocations[i + 1];
      directions.push({
        source,
        destination,
        color: 'red',
      });
    }

    return directions;
  };
  const directions = getDirections();
  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <View style={styles.header.box}>
          <ScrollView>
            {distanceMember.map((p, i) => (
              <View style={styles.info} key={i}>
                {/* <Image
                        style={styles.image}
                        source={{uri : p.imgUrl}}></Image> */}
                <Text style={{ marginLeft: 10, fontSize: 10 }}>{p.firstName}</Text>
                <Text style={{ marginLeft: 10, fontSize: 10 }}>{p.distance}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.header.box}>
          <ScrollView>
            {
              distanceLocation.map((x, index) =>
                <View style={styles.info} key={index}>
                  <Text style={{ marginLeft: 10, fontSize: 10, width: 55 }}>{x.locationName.split(',')[0]}</Text>
                  <Text style={{ marginLeft: 5, fontSize: 10, width: 35 }}>{x.distance}</Text>
                  <CheckBox
                    checked={x.isCompleted}
                    size={25}
                    checkedColor="#0F0"
                    uncheckedColor="#F00"
                    style={styles.checkbox}
                    containerStyle={styles.containerCheckBox}
                  />
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
          latitude: ownerLocation.latitude,
          longitude: ownerLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
        }>
        {
          coordinateMember.map((coordinate, index) =>
            <Marker
              key={index}
              coordinate={{
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
              }}
            >
              <MarkerComponent image={icons.greenPin} number={index} />
            </Marker>
          )
        }
        <Marker
          key={1}
          coordinate={{
            latitude: ownerLocation.latitude,
            longitude: ownerLocation.longitude,
          }}
          pinColor={'#269039'}
        />
        {directions.map((direction, index) => (
          <MapViewDirections
            key={index}
            origin={{
              latitude: direction.source.latitude,
              longitude: direction.source.longitude,
            }}
            destination={{
              latitude: direction.destination.latitude,
              longitude: direction.destination.longitude,
            }}
            apikey={"AIzaSyCLC8Dw7wItISMh9A_m34OtUFQt2hD3IB8"}
            strokeWidth={3}
            strokeColor={direction.color}
          />
        ))}

        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          >{location.isCompleted ?
            <MarkerComponent image={icons.greenPin} number={index} /> :
            <MarkerComponent image={icons.redPin} number={index} />}

          </Marker>
        ))}
      </MapView>
      <Modal
        visible={showPopup}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0.5}
        backdropColor="black"
        transparent={true}
        style={{ margin: 0 }}
      >
        <View style={styles.modalBackground}>
          <Lottie
            source={animation}
            loop
            autoPlay
            style={{ width: 300, height: 300 }}
          />
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{dataFirebase}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowPopup(false)}>
              <Icon name="close" type="FontAwesome" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  header: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: "center",
    box: {
      height: '70%',
      width: '40%',
      backgroundColor: '#D9D9D9',
      borderRadius: 10,
      margin: '5%',
      padding: 10
    },

  },
  map: {
    flex: 0.8
  },
  image: {
    width: 30,
    height: 30,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    paddingTop: 70
  },
  modalContent: {
    backgroundColor: colors.switch1,
    padding: 10,
    paddingBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    height: 50,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#9E93B6',
    borderRadius: 5,
    padding: 5
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerCheckBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  checkbox: {
    width: 20,
    height: 20
  }
});
export default Map;
