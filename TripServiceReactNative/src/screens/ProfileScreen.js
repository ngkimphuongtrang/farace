import React, { useState, useEffect } from 'react';
import {
    Text, TouchableOpacity, View
} from 'react-native';
import { keys } from '../constants';
import { useAuth } from '../contexts/Auth';
import { styles } from '../styles/CommonStyles';
import { getDataFromAsyncStorage } from '../components/util';
import { colors } from '../constants';

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
        <View>
            {/* <TouchableOpacity
                style={[styles.AppButtonContainer, {
                    backgroundColor: primaryColor
                }]}
                onPress={() => {
                    getData()
                }}
            > */}
            <Text style={[styles.AppButtonText, {
                color: 'black',
            }]}>{username}</Text>
            {/* </TouchableOpacity > */}
            <TouchableOpacity
                style={[styles.AppButtonContainer, {
                    backgroundColor: colors.primary
                }]}
                onPress={() => {
                    logOut();
                    navigation.navigate("SignInScreen");
                }}
            >
                <Text style={[styles.AppButtonText, {
                    color: 'white',
                }]}>Đăng xuất</Text>
            </TouchableOpacity ></View>
    );
};

export default ProfileScreen;

