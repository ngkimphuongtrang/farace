import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';


import JourneyComponent from '../components/JourneyComponent.js';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ADD_ICON } from '../assets/image/index.js';
import ImageButtonComponent from '../components/ImageButtonComponent.js';
import HeaderComponent from '../components/HeaderComponent.js';

const journeyData = [
    {
        id: 1,
        origin: "Hồ Chí Minh",
        destination: "Phú Yên",
        departureTime: new Date("2023-02-24"),
        arrivalTime: new Date("2023-02-25"),
    },
    {
        id: 1,
        origin: "Hồ Chí Minh",
        destination: "Phú Yên",
        departureTime: new Date("2023-02-24"),
        arrivalTime: new Date("2023-02-25"),
    }
]
const Tab = createBottomTabNavigator();

const JourneyScreen = ({ navigation: { goBack } }) => {

    return (
        <View style={mystyles.container}>
            <HeaderComponent text="Danh sách hành trình" style={{ flex: 2 }} goBack={goBack} />
            <View style={{ flex: 8 }}>
                {journeyData.map((p, i) => (
                    <JourneyComponent key={i} data={p}></JourneyComponent>
                ))}

            </View>
            <View style={[
                { alignItems: 'center' },
                { flex: 2 }]}
            >
                <ImageButtonComponent screen="AddJourney" image={ADD_ICON} />

            </View>

        </View>
    );
};

export default JourneyScreen;

const mystyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
});
