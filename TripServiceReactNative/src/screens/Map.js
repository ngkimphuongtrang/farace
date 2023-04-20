import React, { useState,useEffect } from "react";
import { Animated, Vibration,StyleSheet, Text, ScrollView , View , Platform, PermissionsAndroid,Image, Dimensions, Modal,TouchableOpacity} from "react-native";
import MapView,{Marker} from "react-native-maps";
import Footer from "../components/Footer";
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




const Map = () => {
  const groupId = "063cc4af-47a6-446a-a6a2-c7b95bacd5e3";
  const ownerId= "3ff64-5717-4562-b3fc-2c963f66afa6";
  const imgUrl = "https://bedental.vn/wp-content/uploads/2022/11/ce4f544cf302130777ecf32e24b1b9f8.png";
  const firstName = "Hien";
  const [distanceLocation, SetDistanceLocation] = useState(
    [
      {
        locationName : "ABC",
        latitude : 10.8002149,
        longitude : 106.6673316,
        distance : 123.2,
        isCompleted : true
      },
      {
        locationName : "DEF",
        latitude : 10.8002149,
        longitude : 106.6673316,
        distance : 123.2,
        isCompleted : true
      },
      {
        locationName : "GHK",
        latitude : 10.8002149,
        longitude : 106.6673316,
        distance : 123.2,
        isCompleted : false
      }
      
    ]
  )

  const [distanceMember, setDistanceMember] = useState([
    {
        firstName: "abc",
        imgUrl : imgUrl,
        distance : 10
    },
    {
        imgUrl: imgUrl,
        firstName: "abc",
        distance : 10
    },
    {
        imgUrl : imgUrl,
        firstName: "abc",
        distance : 10
    }
  ])

  const [coordinates, setCoordinates] = useState([
    {
      customerId : "ngvd-5717-4562-b3fc-2c963f66afa6",
      latitude: 10.7112349,
      longitude: 106.6673316,
      ImgUrl:""
    },
    {
      customerId : "dsfghg-5717-4562-b3fc-2c963f66afa6",
      latitude: 10.7312149,
      longitude: 106.6673316,
      ImgUrl:""
    }
  ])
  const [ownerLocation, setOwnerLocation] = useState(
    {
      customerId : ownerId,
      latitude: 10.7212249,
      longitude: 106.6673316,
    })

  useEffect(() => {
    setInterval(() => {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude)
          console.log(position.coords.longitude)
          var distances = axios.post(' https://7277-2001-ee0-51d1-e6e0-41c8-1910-37ff-563f.ngrok-free.app/api/v1/trip/realtime', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            customerId: ownerId,
            groupId: groupId,
            firstName : firstName,
            imgUrl : imgUrl
          })
          .then(function (response) {
            console.log(response.data);
            var responseData = response.data
            SetDistanceLocation(responseData["locationRealtimes"])
            setDistanceMember(responseData["customerRealtimes"])
            setCoordinates(responseData["customerRealtimes"])
            setOwnerLocation({customerId: ownerId, latitude: position.coords.latitude,longitude: position.coords.longitude})
          })
          .catch(function (error) {
            console.log(error);
          });
          })
    }, 100000000);
  },[]);

  const [dataFirebase, setDataFirebase] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const notification = ref(db, 'group/'+ groupId+ '/user/'+ ownerId +'/event/arrived');
    onChildChanged(
      notification, (snapshot) => {
        setShowPopup(true);
        console.log(snapshot.val())
      });

    onValue(notification, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        if (data != null)
        {
          var text = data["text"]
          setDataFirebase(text)
          Vibration.vibrate([500, 1000, 500]);
          console.log(text)
        }
      }); 
  },[])

  
  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <View style={styles.header.box}>
          <ScrollView>
            {distanceMember.map((p, i) => (
                <View style = {styles.info} key={i}>
                  <Image
                        style={styles.image}
                        source={{uri : p.imgUrl}}></Image>
                    <Text style = {{marginLeft: 10,fontSize:10}}>{p.firstName}</Text>
                    <Text style = {{marginLeft: 10,fontSize:10}}>{p.distance}</Text>
                </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.header.box}>
          <ScrollView>
                  {
                    distanceLocation.map((x,i) =>
                    <View style = {styles.info} key={i}>
                      <Text style = {{marginLeft: 10,fontSize:10, width : 55}}>{x.locationName}</Text>
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
          coordinates.map((coordinate,index) =>
          <Marker
            key={index}
            coordinate={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
            }}
            icon={coordinate.ImgUrl}
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
      <Footer id="2"/>
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
            source={AnimationJson}
            loop
            autoPlay
            style={{ width: 300, height: 300 }}
          />
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
  header:{
    flex: 0.3,
    flexDirection: 'row',
    alignItems : "center",
    box : {
      height: '70%', 
      width: '40%', 
      backgroundColor: '#D9D9D9' ,
      borderRadius: 10,
      margin: '5%',
      padding : 10
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