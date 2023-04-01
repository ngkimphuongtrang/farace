import React from 'react';
import {
    View,
    Text, TouchableOpacity, StyleSheet
} from 'react-native';
import { primaryColor } from '../constants';

const ProfileScreen = ({ navigation }) => {
    // console.log("navigation:", navigation)
    return (

        <TouchableOpacity
            style={[textButtonStyles.appButtonContainer, {
                backgroundColor: primaryColor
            }]}
        // onPress={() => navigation.navigate("SignInScreen") } 
        >
            <Text style={[textButtonStyles.appButtonText, {
                color: 'white',
            }]}>Đăng xuất</Text>
        </TouchableOpacity >
    );
};

export default ProfileScreen;

export const textButtonStyles = StyleSheet.create({
    borderStyle: {
        borderRadius: 10,
        borderWidth: 3,
        borderColor: primaryColor,
    },
    appButtonContainer: {
        elevation: 8,
        borderRadius: 5,
        paddingVertical: 8,
        // paddingHorizontal: 40,
        height: 40,
        width: 140,
    },
    appButtonText: {
        alignSelf: "center",
        textTransform: "uppercase",
    }
});
