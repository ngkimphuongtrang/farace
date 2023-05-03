import React, { useState, useEffect } from 'react';
import {
    Text, TouchableOpacity, View, Image, StyleSheet
} from 'react-native';
import { keys } from '../constants';
import { useAuth } from '../contexts/Auth';
import { styles } from '../styles/CommonStyles';
import { getDataFromAsyncStorage } from '../components/util';
import { colors } from '../constants';
import { BACKGROUND_PROFILE } from '../assets/image';

const ProfileScreen = ({ navigation }) => {
    const [username, setUsername] = useState();
    const auth = useAuth();
    const logOut = async () => {
        // isLoading(true);
        await auth.signOut();
    };
    useEffect(() => {
        async function getData() {
            let myUsername = await getDataFromAsyncStorage(keys.username);
            setUsername(myUsername)
        }
        getData()
    }, [])
    return (
        <View style={myStyles.container}>
            <Image source={BACKGROUND_PROFILE} style={{
                width: '100%',
                height: '100%',
                // aspectRatio: 1,
            }}></Image>
            <View style={{ position: 'absolute' }}>
                <Text style={{
                    color: 'white', fontWeight: 'bold'
                }}>{username}</Text>
            </View>
            <TouchableOpacity
                style={[styles.AppButtonContainer, myStyles.container, {
                    backgroundColor: colors.primary, position: 'absolute',
                }]}
                onPress={() => {
                    logOut();
                    navigation.navigate("SignInScreen");
                }}
            >
                <Text style={[styles.AppButtonText, {
                    color: 'white',
                }]}>Đăng xuất</Text>
                <Text style={{
                    color: 'white', fontWeight: 'bold'
                }}>{username}</Text>
            </TouchableOpacity >
        </View>
    );
};

export default ProfileScreen;

const myStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

