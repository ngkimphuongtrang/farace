import React, { useState } from 'react';
import {
    View, StyleSheet, Button
} from 'react-native';


import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Header } from 'react-native/Libraries/NewAppScreen';
import HeaderComponent from '../components/HeaderComponent.js';
import TextButtonComponent from '../components/TextButtonComponent.js';

const AddJourneyScreen = ({ navigation: { goBack } }) => {
    const [location, setLocation] = useState([]);
    return (
        <View style={mystyles.container
        }>
            <View style={{ flex: 0.15 }}>
                <HeaderComponent
                    text="Thêm mới hành trình"
                    goBack={goBack}
                />
            </View>


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
            <View style={mystyles.input}>
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
                    placeholder='Chọn điểm bắt đầu'
                    onPress={(data, details = null) => {
                        var newLocation = JSON.stringify(details?.geometry?.location);
                        console.log(newLocation);
                        setLocation(oldArray => [...oldArray, newLocation]);
                    }}
                    query={{
                        key: 'AIzaSyCLC8Dw7wItISMh9A_m34OtUFQt2hD3IB8',
                        language: 'en',
                    }}
                />
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
                            marginTop: 10,
                            flex: 1,
                        }
                    }}
                    placeholder='Chọn điểm đến'
                    onPress={(data, details = null) => {
                        console.log("data:", data, details)
                        var newLocation = JSON.stringify(details?.geometry?.location);
                        console.log(newLocation);
                        setLocation(oldArray => [...oldArray, newLocation]);
                    }}
                    query={{
                        key: 'AIzaSyCLC8Dw7wItISMh9A_m34OtUFQt2hD3IB8',
                        language: 'en',
                    }}
                />
            </View>
            <View style={{ alignItems: 'center' }}>
                <Button onPress={() => console.log("Location:", location)} title="Tiep tuc"></Button>
                {/* <TextButtonComponent
                    screen="AddMember"
                    text="Tiếp tục"
                    backgroundColor={primaryColor}
                    textColor={'white'}
                    onPress={() => console.log("Location:", location)} // TODO: Send api
                /> */}
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
