import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity, Button
} from 'react-native';

import { primaryColor } from '../constants/index.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ADD_ICON, BACK_ICON } from '../assets/image/index.js';
import { styles } from "../styles/FooterStyles";
// import { enableLatestRenderer } from 'react-native-maps';

// enableLatestRenderer();
const AddJourneyScreen = ({ navigation: { goBack } }) => {

    return (
        <View style={mystyles.container}>
            <View style={[{
                flex: 1,
                backgroundColor: primaryColor,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',

            },
                // styles.bottomContainer
            ]}
            >
                <View
                    style={{ alignItems: 'center' }}
                >
                    <View >

                        <TouchableOpacity onPress={() => goBack()} >
                            <Image source={BACK_ICON} style={
                                {
                                    justifyContent: 'center',
                                    height: 40,
                                    width: 40,
                                }
                            }>
                            </Image>
                        </TouchableOpacity>
                    </View>
                    {/* <Button onPress={() => goBack()} title="">
                        <Image source={BACK_ICON} style={
                            {
                                justifyContent: 'center',
                                height: 40,
                                width: 40,
                            }
                        }>
                        </Image>
                    </Button> */}
                </View>
                <View ><Text style={mystyles.text_header}>
                    Thêm mới hành trình
                </Text></View>
                {/* <View style={{ flex: 2 }}></View> */}

            </View>

            <View style={{ flex: 8 }}>

            </View>
            <View style={[
                { alignItems: 'center' },
                { flex: 2 }]}
            >
                {/* <TouchableOpacity onPress={() => navigation.navigate("AddJourney")}>
                    <Image source={ADD_ICON}
                        style={
                            {
                                justifyContent: 'center',
                                height: 80,
                                width: 80,
                            }
                        }></Image></TouchableOpacity> */}
            </View>

        </View>
    );
};

export default AddJourneyScreen;

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
