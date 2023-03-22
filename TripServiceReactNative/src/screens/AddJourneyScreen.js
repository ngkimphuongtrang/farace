import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';


import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Header } from 'react-native/Libraries/NewAppScreen';
import HeaderComponent from '../components/HeaderComponent.js';


const AddJourneyScreen = ({ navigation: { goBack } }) => {


    return (
        <View style={mystyles.container}>
            <HeaderComponent
                text="Thêm mới hành trình"
                goBack={goBack}
            />

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
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: 'AIzaSyCLC8Dw7wItISMh9A_m34OtUFQt2hD3IB8',
                        language: 'en',
                    }}
                />
                <GooglePlacesAutocomplete
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
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: 'AIzaSyCLC8Dw7wItISMh9A_m34OtUFQt2hD3IB8',
                        language: 'en',
                    }}
                />
            </View>
        </View>
    );
};

export default AddJourneyScreen;

const mystyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 0.4
    },
    input: {
        flex: 0.5
    },
    input: {
        flex: 0.2,
        flexDirection: 'column',
    }

});
