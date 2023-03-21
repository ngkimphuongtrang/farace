import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';


import JourneyComponent from '../components/JourneyComponent.js';
import { primaryColor } from '../constants/index.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ADD_ICON } from '../assets/image/index.js';
import { styles } from '../styles/FooterStyles';

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

    return (
        <View style={mystyles.container}>
            <View style={{
                flex: 2,
                backgroundColor: primaryColor,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            >
                <Text style={mystyles.text_header}>
                    Danh sách hành trình
                </Text>
            </View>

            <View style={{ flex: 8 }}>
                {journeyData.map((p, i) => (
                    <JourneyComponent key={i} data={p}></JourneyComponent>
                ))}
                {/* <Text style={
                    { justifyContent: 'center', alignItems: 'center', }
                }>Trang</Text> */}
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
                                height: 80,
                                width: 80,
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
