import React, { useState , useEffect} from 'react';
import {
    View, StyleSheet, Button, Text, ScrollView, StatusBar
} from 'react-native';
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/CommonStyles.js';
import { colors } from '../constants/index.js';
import Geolocation from "@react-native-community/geolocation";
const AddJourneyScreen = ({ navigation }) => {
    const [location, setLocation] = useState([]);
    const [locationName, setLocationName] = useState([]);
    const [coordinate, setCoordinate] = useState(
        {
          latitude: 10.7212249,
          longitude: 106.6673316,
        })    
    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                setCoordinate({latitude: position.coords.latitude,longitude: position.coords.longitude})
                })
        },[]);

    const setLocationValue = async () => {
        try {
            await AsyncStorage.setItem('@location', JSON.stringify(location))
            await AsyncStorage.setItem('@locationName', JSON.stringify(locationName))
        } catch (e) {
            // save error
        }
        console.log('Set @location in AsyncStorage done:', JSON.stringify(location))
    }
    const handlePlaceSelected = (data, details = null) => {
        
        const newLocation = details?.geometry?.location;
        const locationObj = {
            latitude: newLocation.lat,
            longitude: newLocation.lng,
            name: data.description,
        };
        setLocation((oldArray) => [...oldArray, locationObj]);
        setLocationName((oldArray) => [...oldArray, data.description]);
    };
    console.log(location)
    return (
        <View style={styles.ContainerScreen}>
            {
                location.length === 0 ? 
                (
                <MapView
                    style={mystyles.map}
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
                    style={mystyles.map}
                    initialRegion={
                        {
                            latitude: coordinate.latitude,
                            longitude: coordinate.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }
                    }
                        region={{
                        latitude: location[location.length-1].latitude,
                        longitude: location[location.length-1].longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                        }
                    }>
                {
                    location.map((coordinate,index) =>
                    <Marker
                        key={index}
                        coordinate={{
                        latitude: coordinate["latitude"],
                        longitude: coordinate["longitude"],
                        }}
                        draggable
                    />
                    )
                }
                </MapView>
                )
            }
            
            <View style={[mystyles.input, { flex: 0.8 }]}>
                <View style={[mystyles.input]}>
                    <GooglePlacesAutocomplete
                        GooglePlacesDetailsQuery={{ fields: "geometry" }}
                        fetchDetails={true}
                        styles={{
                            textInputContainer: {
                                borderRadius: 5,
                                borderWidth: 1,
                                flexDirection: 'row',
                                height: 40,
                            },
                            textInput: {
                                height: 38,
                                color: '#A11919',
                                fontSize: 15,
                                flex: 1,
                                backgroundColor: "#F9F0F0"
                            },
                            container: {
                                margin: 20,
                                flex: 1,
                                marginBottom: 5
                            }
                        }}
                        placeholder='Chọn địa điểm'
                        onPress={handlePlaceSelected}
                        query={{
                            key: 'AIzaSyCLC8Dw7wItISMh9A_m34OtUFQt2hD3IB8',
                            language: 'en',
                        }}
                    />
                </View>
                <SafeAreaView style={{
                    flex: 1,
                    paddingTop: StatusBar.currentHeight
                }}>
                    <ScrollView style={{
                        marginHorizontal: 20,
                    }}>
                        {locationName.map((l, i) =>
                            <View style={[{ alignContent: 'center', marginBottom: 5, backgroundColor: colors.primary }, styles.BorderStyle]}>
                                <Text>{i + 1} - {l}</Text>
                            </View>
                        )}

                    </ScrollView>
                </SafeAreaView>
            </View>
            <View style={[mystyles.button, { alignContent: 'space-between' }]}>

                <View style={[{ width: "40%", alignContent: 'center', marginBottom: 5 }, styles.BorderStyle]}>
                    <Button
                        onPress={() => { setLocationValue(); navigation.navigate("AddMember"); }}
                        title="Tiếp tục"
                        color={colors.primary}
                    />
                </View>
            </View>
        </View >
    );
};
export default AddJourneyScreen;

const mystyles = StyleSheet.create({

    map: {
        flex: 0.6
    },
    input: {
        flex: 0.25,
        flexDirection: 'column',
        justifyContent: 'space-around',
        flexGrow: 1,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
});
