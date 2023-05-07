import React, { useState,useEffect } from "react";
import { Animated, Vibration,StyleSheet, Text, ScrollView , View , Platform, PermissionsAndroid,Image, Dimensions, Modal,TouchableOpacity} from "react-native";
import MapView,{Marker} from "react-native-maps";
import axios from "axios";
import Geolocation from "@react-native-community/geolocation";
import { Icon } from '@rneui/base';
import { onChildChanged } from "firebase/database";
import { ref } from "firebase/database";
import { onValue } from "firebase/database";
import { db} from "../services/firebase-config";
import { CheckBox } from '@rneui/base';
import Lottie from 'lottie-react-native';
import { AnimationJson } from "../assets/image";
import { keys } from "../constants";
import { getDataFromAsyncStorage } from "../components/util";
import { endpoints } from "../constants";
import MapViewDirections from "react-native-maps-directions";
import { USER_ICON } from '../assets/image/index.js';

const Map = ({ route, navigation }) => {
  const groupId = route.params.groupId;
  const [ownerFirstName, setOwnerFirstName] = useState();
  const [location, setLocation] = useState([]);
  const [member, setMember] = useState([]);
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
    const userFirstName = await getData(userId);
    const start = await StartTrip(userId, userFirstName);
    IntervalRealtime(start.userId, start.userFirstName);

    const notification = ref(db, 'group/'+ groupId+ '/user/'+ start.userId +'/event/arrived');
    onChildChanged(
      notification, (snapshot) => {
        setShowPopup(true);
        Vibration.vibrate([500, 1000, 500]);
      });

    onValue(
      notification, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        if (data != null)
        {
          var locationName = data["locationName"]
          setDataFirebase(`Chúc mừng bạn đã đến ${locationName}`)
        }
      });

    const notificationComing = ref(db, 'group/'+ groupId+ '/user/'+ start.userId +'/event/coming');
    onChildChanged(
      notificationComing, (snapshot) => {
        setShowPopup(true);
        Vibration.vibrate([500, 1000, 500]);
      });

      onValue(
        notificationComing, (snapshot) => {
          const data = snapshot.val();
          console.log("data",data)
          if (data != null)
          {
            var locationName = data["locationName"]
            var distance = data["distance"]
            console.log(distance)
            console.log(locationName)
            setDataFirebase(`Bạn còn cách địa điểm ${locationName} ${distance} km`)
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
      setMember(response.data.customers);
      for (const element of response.data.customers) {
        if (element.customerId === userId) {
          setOwnerFirstName(element.firstName);
          return element.firstName;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const StartTrip = async (userId, userFirstName) => {
    Geolocation.getCurrentPosition(
      async (position) => {
        var start = await axios.post(endpoints.start, {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          customerId: userId,
          groupId: groupId,
          firstName : userFirstName,
        });
        var distances = axios.post(`${endpoints.realTime}`, {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            customerId: userId,
            groupId: groupId,
            firstName : userFirstName,
          })
          .then(function (response) {
            var responseData = response.data
            SetDistanceLocation(responseData["locationRealtimes"])
            setDistanceMember(responseData["customerRealtimes"])
            updateCoordinateMember(responseData)
          })
      })
      return { userId, userFirstName };
	}


  const updateCoordinateMember = (responseData) => {
    const updatedCoords = responseData.customerRealtimes.map((customer) => {
      if (customer.latitude !== 0 && customer.longitude !== 0) {
        return {
          latitude: customer.latitude,
          longitude: customer.longitude,
        };
      }
      return null;
    }).filter(Boolean); // Filter out any null values
  
    setCoordinateMember(updatedCoords);
  }

  const IntervalRealtime = (userId, userFirstName) => {
    setInterval(() => {
      Geolocation.getCurrentPosition(
        (position) => {
          setOwnerLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
          var distances = axios.post(`${endpoints.realTime}`, {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            customerId: userId,
            groupId: groupId,
            firstName : userFirstName,
          })
          .then(function (response) {
            var responseData = response.data
            SetDistanceLocation(responseData["locationRealtimes"])
            setDistanceMember(responseData["customerRealtimes"])
            updateCoordinateMember(responseData)
          })
          .catch(function (error) {
            console.log(error);
          });
          })
    }, 20000);
  }
  const [dataFirebase, setDataFirebase] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [checked, setChecked] = useState(false);

  const renderDirections = () => {
    const directions = [];
    for (let i = 0; i < location.length; i++) {
      const origin = i === 0 ? ownerLocation : location[i - 1];
      const destination = location[i];
      if (origin && destination) {
        directions.push(
          <MapViewDirections
            key={`${i}-${origin?.lat ?? 'undefined'}-${origin?.lng ?? 'undefined'}-${destination?.lat ?? 'undefined'}-${destination?.lng ?? 'undefined'}`}
            origin={origin}
            destination={destination}
            apikey={"AIzaSyCLC8Dw7wItISMh9A_m34OtUFQt2hD3IB8"} // Replace with your Google Maps API key
            strokeWidth={3}
            strokeColor="blue"
          />
        );
      }
    }
    return directions;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <View style={styles.header.box}>
          <ScrollView>
            {distanceMember.map((p, i) => (
                <View style = {styles.info} key={i}>
                  {/* <Image
                        style={styles.image}
                        source={{uri : p.imgUrl}}></Image> */}
                    <Text style = {{marginLeft: 10,fontSize:10}}>{p.firstName}</Text>
                    <Text style = {{marginLeft: 10,fontSize:10}}>{p.distance}</Text>
                </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.header.box}>
          <ScrollView>
                  {
                    distanceLocation.map((x,index) =>
                    <View style = {styles.info} key={index}>
                      <Text style = {{marginLeft: 10,fontSize:10, width : 55}}>{x.locationName.split(',')[0]}</Text>
                      <Text style = {{marginLeft: 5,fontSize:10, width : 35}}>{x.distance}</Text>
                      <CheckBox 
                        checked ={x.isCompleted} 
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
          coordinateMember.map((coordinate,index) =>
          <Marker
            key={index}
            coordinate={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
            }}
          >
            <View style={{ height: 30, width: 30 }}>
              <Image source={USER_ICON} style={{ height: '100%', width: '100%' }} />
            </View>
          </Marker>
          )
        }
        {
          location.map((coordinate,index) =>
          <Marker
            key={index}
            coordinate={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
            }}
            // icon={coordinate.ImgUrl}
          />
          )
        }
          <Marker
            key={1}
            coordinate={{
              latitude: ownerLocation.latitude,
              longitude: ownerLocation.longitude,
            }}
            pinColor = {'#269039'}
          />
        {renderDirections()}
      </MapView>
      {/* <Footer id="2"/> */}
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
          {/* <Lottie
            source={AnimationJson}
            loop
            autoPlay
            style={{ width: 300, height: 300 }}
          /> */}
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{dataFirebase}</Text>
            <TouchableOpacity style={styles.closeButton}  onPress={() => setShowPopup(false)}>
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
      padding : 10
    },

  },
  map: {
    flex: 0.8
  },
  image: {
    width: 30,
    height: 30,
  },
  info:{
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
    backgroundColor: '#189F59',
    padding: 10,
    paddingBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    height : 50
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
