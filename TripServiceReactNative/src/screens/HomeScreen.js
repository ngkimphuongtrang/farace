import React from 'react';
import {
    View,
    Image,
    StyleSheet,
} from 'react-native';
import { LOGO_GREEN } from '../assets/image/index.js';

import { primaryColor } from '../constants/index.js';

const HomeScreen = ({ navigation }) => {
    console.log("navigation:", navigation)
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>


            </View>

            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={LOGO_GREEN}
                    style={{ height: 50, width: 50 * 2.7 }}
                ></Image>
            </View>
            <View style={{
                flex: 3,
            }}
            >
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primaryColor,
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
