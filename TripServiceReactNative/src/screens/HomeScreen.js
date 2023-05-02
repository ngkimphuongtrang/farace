import React from 'react';
import {
    View,
    Image,
    StyleSheet,
} from 'react-native';
import { LOGO_GREEN } from '../assets/image/index.js';
import { colors } from '../constants/index.js';

const HomeScreen = ({ navigation }) => {
    console.log("navigation:", navigation)
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>


            </View>

            <View style={styles.logoContainer}>
                <Image
                    source={LOGO_GREEN}
                    style={styles.logo}
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
        backgroundColor: colors.primary,
    },
    // header: {
    //     flex: 1,
    //     justifyContent: 'flex-end',
    //     paddingHorizontal: 20,
    //     paddingBottom: 50
    // },
    logo: {
        height: 50,
        width: 50 * 2.7,
    },
    logoContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
