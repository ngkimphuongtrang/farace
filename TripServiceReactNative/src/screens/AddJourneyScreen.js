import React, { useState, useEffect, useRef } from 'react';
import {
    View, StyleSheet, Button, ScrollView, StatusBar, Alert, TouchableOpacity, Image, Text
} from 'react-native';
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/CommonStyles.js';
import { colors } from '../constants/index.js';
import Geolocation from "@react-native-community/geolocation";
import MapViewDirections from 'react-native-maps-directions';
import { REMOVE_ICON, markers } from '../assets/image/index.js';
import LocationComponent from '../components/LocationComponent';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const AddJourneyScreen = ({ route, navigation }) => {
    var Locations;
    if (route.params) {
        Locations = route.params
    }
    const autocompleteRef = useRef(null);
    const [locations, setLocations] = useState([]);
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
        if (Locations) {
            const { Locations } = route.params;
            console.log("locationsparams:", Locations);
            setLocations(Locations);
        }
    }, []);

    const [routes, setRoutes] = useState([]);
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
    const setLocationValue = async () => {
        try {
            await AsyncStorage.setItem('@location', JSON.stringify(locations))
        } catch (e) {
            // save error
        }
        console.log('Set @location in AsyncStorage done:', JSON.stringify(locations));
    }
    const [date, setDate] = useState(new Date());
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        console.log("date selected", date);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };
    const handlePlaceSelected = (data, details = null) => {
        showDatepicker();
        const newLocation = details?.geometry?.location;
        const locationObj = {
            latitude: newLocation.lat,
            longitude: newLocation.lng,
            name: data.description,
            estimatedTimeOfArrival: date,
        };
        setLocations((oldArray) => [...oldArray, locationObj]);
        autocompleteRef.current?.setAddressText('');
    };
    const handleAddLocations = () => {
        if (locations.length < 1) {
            Alert.alert('Chọn địa điểm không hợp lệ', "Hành trình chứa ít nhất 1 địa điểm.", [
                {
                    text: 'Thử lại',
                    onPress: () => console.log('OK Pressed'),
                },
            ]);
            return;
        }
        setLocationValue();
        if (Locations) {
            const { Members } = route.params;
            navigation.navigate("AddMember", { Members: Members })
        } else
            navigation.navigate("AddMember");
    }
    const handleClickLocation = (index) => {
        Alert.alert('Xóa địa điểm này?', "", [
            {
                text: 'Xóa',
                onPress: () => {
                    let chosenLocation = []
                    let j = 0
                    for (let i = 0; i < locations.length; i++) {
                        if (i != index) {
                            chosenLocation[j++] = locations[i]
                        }
                    }
                    setLocations(chosenLocation);
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
                locations === undefined || locations.length === 0 ?
                    (
                        <MapView
                            style={myStyles.map}
                            initialRegion={{
                                latitude: coordinate.latitude,
                                longitude: coordinate.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            onPress={(e) => {
                                console.log("press:", e.nativeEvent, e.nativeEvent.coordinate);
                                setLocations((oldArray) => [...oldArray, e.nativeEvent.coordinate]);
                                // setLocation({ markers: [...location, e.nativeEvent.coordinate}] })
                                console.log(locations);
                            }}>
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
                        }}
                        onPress={(e) => {
                            console.log("press:", e.nativeEvent);
                            setLocations({ markers: [...locations, { latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.latitude }] }
                            )
                        }}>
                        {
                            locations.map((coordinate, index) =>
                                // index == locations.length - 1 ? <Marker
                                //     key={index}
                                //     coordinate={{
                                //         latitude: coordinate["latitude"],
                                //         longitude: coordinate["longitude"],
                                //     }}
                                //     draggable

                                // /> : 
                                <Marker
                                    key={index}
                                    coordinate={{
                                        latitude: coordinate["latitude"],
                                        longitude: coordinate["longitude"],
                                    }}
                                    draggable
                                    image={markers[index]} // red is destination
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
                        ref={autocompleteRef}
                        GooglePlacesDetailsQuery={{ fields: "geometry" }}
                        fetchDetails={true}
                        styles={myStyles.autocomplete}
                        placeholder='Chọn địa điểm'
                        onPress={handlePlaceSelected}
                        query={{
                            key: 'AIzaSyCLC8Dw7wItISMh9A_m34OtUFQt2hD3IB8',
                            language: 'en',
                        }}
                    />
                </View>
                <View style={{
                    flex: 1,
                    paddingTop: StatusBar.currentHeight
                }}>
                    <ScrollView style={{
                        marginHorizontal: 20,
                    }}>
                        {locations.map((l, i) =>
                            <View key={i} style={[styles.BorderStyle,
                            { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.switch1, borderColor: colors.switch1 }]}>
                                <View style={{ flexDirection: 'column' }}>
                                    {/* <Text>{l.estimatedTimeOfArrival?.toLocaleString()}</Text> */}
                                    <LocationComponent location={l} i={i} backgroundColor={colors.switch1} otherStyle={{ maxWidth: 320 }} />
                                </View>
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
