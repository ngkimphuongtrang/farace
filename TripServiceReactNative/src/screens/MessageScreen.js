import React from 'react';
import {
    View,
    Text,
} from 'react-native';

const MessageScreen = ({ navigation }) => {
    console.log("navigation:", navigation)
    return (
        <View >
            <Text>Message</Text>
        </View>
    );
};

export default MessageScreen;


