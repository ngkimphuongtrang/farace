import React, { useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableHighlight, TextInput
} from 'react-native';
import { BACKGROUND_HOME, LOGO_GREEN } from '../assets/image/index.js';
import { colors, keys } from '../constants/index.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [showTextInput, setShowTextInput] = useState(false);
    const handleSetConfig = async () => {
        if (showTextInput == false) {
            setShowTextInput(true);
        } else {
            await AsyncStorage.setItem(keys.userDomain, userId);
        }
        console.log("text:", showTextInput);
    }
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
                <TouchableHighlight onPress={handleSetConfig}>
                    <Image
                        source={LOGO_GREEN}
                        style={styles.logo}
                    ></Image>
                </TouchableHighlight>
                {showTextInput &&
                    <>
                        <TextInput placeholder="User domain" />
                        <TextInput placeholder="Trip domain" style={{ color: 'black' }} />
                    </>
                }
            </View>
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
