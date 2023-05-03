import React from 'react';
import {
    View,
    Image,
    StyleSheet,
} from 'react-native';
import { BACKGROUND_HOME, LOGO_GREEN } from '../assets/image/index.js';
import { colors } from '../constants/index.js';

const HomeScreen = ({ navigation }) => {
    console.log("navigation:", navigation)
    return (
        <View style={styles.container}>
            <Image source={BACKGROUND_HOME} style={{
                width: '100%',
                height: '100%',
                // aspectRatio: 1,
            }}></Image>
            {/* <View style={{ flex: 1 }}>


            </View> */}

            <View style={styles.logoContainer}>
                <Image
                    source={LOGO_GREEN}
                    style={styles.logo}
                ></Image>
            </View>
            {/* <View style={{
                 flex: 3,
             }}
             </View>  */}
        </View >
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    logo: {
        height: 60,
        width: 60 * 2.7,

    },
    logoContainer: {
        marginTop: 320,
        marginLeft: 30,
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
});
