import React, { useState, useEffect } from 'react';
import {
    View, StyleSheet, Button, ScrollView, StatusBar, Alert, TouchableOpacity, Image
} from 'react-native';
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/CommonStyles.js';
import { colors } from '../constants/index.js';
import Geolocation from "@react-native-community/geolocation";
import MapViewDirections from 'react-native-maps-directions';
import { BLUE_MARKER_ICON } from '../assets/image/index.js';
import { REMOVE_ICON } from '../assets/image/index.js';
import LocationComponent from '../components/LocationComponent';

const AddJourneyScreen = ({ navigation }) => {
    const [location, setLocation] = useState([]);
    const [coordinate, setCoordinate] = useState(
        {
            latitude: 10.7212249,
            longitude: 106.6673316,
        })
    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                setCoordinate({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            })
    }, []);

    const [routes, setRoutes] = useState([]);
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
    const setLocationValue = async () => {
        try {

            await AsyncStorage.setItem('@location', JSON.stringify(location))
        } catch (e) {
            // save error
        }
        console.log('Set @location in AsyncStorage done:', JSON.stringify(location));
    }
    const handlePlaceSelected = (data, details = null) => {
        const newLocation = details?.geometry?.location;
        const locationObj = {
            latitude: newLocation.lat,
            longitude: newLocation.lng,
            name: data.description,
        };
        setLocation((oldArray) => [...oldArray, locationObj]);
        placeholder = "";
    };
    const handleAddLocations = () => {
        if (location.length < 2) {
            Alert.alert('Chọn địa điểm không hợp lệ', "Hành trình chứa ít nhất 2 địa điểm.", [
                {
                    text: 'Thử lại',
                    onPress: () => console.log('OK Pressed'),
                },
            ]);
            return;
        }
        setLocationValue();
        navigation.navigate("AddMember");
    }
    const handleClickLocation = (index) => {
        Alert.alert('Xóa địa điểm này?', "", [
            {
                text: 'Xóa',
                onPress: () => {
                    let chosenLocation = []
                    let j = 0
                    for (let i = 0; i < location.length; i++) {
                        if (i != index) {
                            chosenLocation[j++] = location[i]
                        }
                    }
                    setLocation(chosenLocation);
                },
            },
            {
                text: 'Quay lại',
                onPress: () => console.log('Go Back Pressed'),
            }
        ]);
    }
    return (
        <SafeAreaView style={styles.ContainerScreen}>
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

            <View style={[myStyles.input, { flex: 0.8 }]}>
                <View style={[myStyles.input]}>
                    <GooglePlacesAutocomplete
                        GooglePlacesDetailsQuery={{ fields: "geometry" }}
                        fetchDetails={true}
                        styles={myStyles.autocomplete}
                        placeholder='Chọn địa điểm'
                        onPress={handlePlaceSelected}
                        query={{
                            key: 'AIzaSyCLC8Dw7wItISMh9A_m34OtUFQt2hD3IB8',
                            language: 'en',
                        }}
                    // textInputProps={{
                    //     InputComp: Input,
                    // }}
                    />
                </View>
                <View style={{
                    flex: 1,
                    paddingTop: StatusBar.currentHeight
                }}>
                    <ScrollView style={{
                        marginHorizontal: 20,
                    }}>
                        {location.map((l, i) =>
                            <View key={i} style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                <LocationComponent location={l} i={i} backgroundColor={colors.spot1} otherStyle={{ maxWidth: 320 }} />
                                {/* <View style={[
                                    { alignContent: 'center', marginBottom: 5, backgroundColor: colors.spot1, flexDirection: 'row', maxWidth: 320 },
                                    myStyles.BorderStyle]}>
                                    <Text style={{ fontStyle: 'italic' }}>{i + 1}, </Text>
                                    <Text style={{ fontWeight: 'bold' }}>{l.name}</Text>
                                </View> */}
                                <TouchableOpacity onPress={() => handleClickLocation(i)} style={{ marginRight: 5 }}><Image source={REMOVE_ICON} /></TouchableOpacity>
                            </View>
                        )}

                    </ScrollView>
                </View>
            </View>
            <View style={[
                myStyles.button,
                { alignContent: 'space-between', flex: 0.2 }]}>
                <View style={[{ width: "40%", alignContent: 'center', marginBottom: 5 }, styles.BorderStyle]}>
                    <Button
                        onPress={handleAddLocations}
                        title="Tiếp tục"
                        color={colors.primary}
                    />
                </View>
            </View>
        </SafeAreaView >
    );
};
export default AddJourneyScreen;

const myStyles = StyleSheet.create({
    map: {
        flex: 0.6
    },
    input: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-around',
        flexGrow: 1,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    BorderStyle: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    autocomplete: {
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
    }
});
