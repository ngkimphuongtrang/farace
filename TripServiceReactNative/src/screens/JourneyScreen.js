import React from 'react';
import {
    View,
    StyleSheet, TouchableOpacity, Image
} from 'react-native';
import JourneyComponent from '../components/JourneyComponent.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ADD_ICON } from '../assets/image/index.js';
import { useNavigation } from '@react-navigation/native';

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

const JourneyScreen = ({ navigation }) => {
    // const navigation = useNavigation();
    return (
        <View style={mystyles.container}>
            <View style={{ flex: 8 }}>
                {journeyData.map((p, i) => (
                    <JourneyComponent key={i} data={p}></JourneyComponent>
                ))}

            </View>
            <View style={[
                { alignItems: 'center' },
                { flex: 2 }]}
            >
                <TouchableOpacity onPress={() => navigation.navigate("AddJourney")}>
                    <Image source={ADD_ICON}
                        style={
                            {
                                justifyContent: 'center',
                                height: 50,
                                width: 50,
                            }
                        }></Image></TouchableOpacity>
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
