import React, { useState } from 'react';
import {
    View, StyleSheet, Button, Text,ScrollView, StatusBar
} from 'react-native';

import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_ICON } from '../assets/image/index.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { primaryColor } from '../constants/index.js';
const AddJourneyScreen = ({ navigation: { goBack } }) => {
    const navigation = useNavigation();
    const [location, setLocation] = useState([]);
    const [locationName, setLocationName] = useState([]);

    const setLocationValue = async (location) => {
        try {
            await AsyncStorage.setItem('@location', JSON.stringify(location))
            await AsyncStorage.setItem('@locationName', JSON.stringify(locationName))
        } catch (e) {
            // save error
        }
        console.log('Set @location in AsyncStorage done:', JSON.stringify(location))
    }
    return (
        <View style={mystyles.container
        }>
            <MapView
                style={mystyles.map}
                initialRegion={{
                    latitude: 10.8002149,
                    longitude: 106.6673316,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }
                }>
            </MapView>
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
                        onPress={(data, details = null) => {
                            var newLocation = JSON.stringify(details?.geometry?.location);
                            console.log(newLocation, data);
                            setLocation(oldArray => [...oldArray, newLocation]);
                            setLocationName(oldArray => [...oldArray, data.description]);
                        }}
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
                        backgroundColor: primaryColor,
                        marginHorizontal: 20,
                    }}>

                        {locationName.map((l, i) => <Text>{i + 1} - {l} {'\n'}</Text>)}

                    </ScrollView>
                </SafeAreaView>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Button
                    onPress={() => { setLocationValue(location); navigation.navigate("AddMember"); }}
                    title="Tiếp tục">
                </Button>
            </View>

        </View >
    );
};

export default AddJourneyScreen;

const mystyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 0.6
    },
    input: {
        flex: 0.25,
        flexDirection: 'column',
        justifyContent: 'space-around',
        flexGrow: 1,
    },
});
