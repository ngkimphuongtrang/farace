import React, { useState, useEffect } from 'react';
import { View,  StyleSheet} from 'react-native';
import {  getAvatarByUserId } from '../components/util';
import { colors, endpoints } from '../constants';
import axios from 'axios';
import UserProfile from '../components/UserProfile';

const FriendProfileScreen = ({ route, navigation }) => {
    const { FriendId } = route.params;

    const [userInfo, setUserInfo] = useState({
        firstName: 'dummy name',
        phoneNumber: '',
        email: 'dummy@email',
        id: '',
        imgUrl: '',
    });

    useEffect(() => {
        async function getData() {
            // console.log("FriendProfile, friendId", FriendId);
            let request = `${endpoints.members}/${FriendId}/detail`;
            // console.log("FriendProfileScreen:", request);
            axios.get(request)
                .then(function (response) {
                    setUserInfo(response.data);
                    // console.log("/api/v1/user detail:", response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
        getData();
        getImage();
    }, [])

    const getImage = async () => {
        const url = await getAvatarByUserId(FriendId);
        // console.log("get image", uri);
        if (typeof url === 'string' || url instanceof String) {
            handleInputChange("imgUrl", url);
            setDone(true);
        }
    }

    return (
        <View style={myStyles.container}>
            <>
                {userInfo && (
                    <UserProfile
                        done={true}
                        avatar={userInfo.imgUrl}
                        name={`${userInfo.firstName}`}
                        phoneNumber={userInfo.phoneNumber}
                        username={userInfo.email}
                    />
                )}
            </>
        </View >
    );
};

export default FriendProfileScreen;

const myStyles = StyleSheet.create({
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 20,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        fontSize: 18,
        marginBottom: 5,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
})

