import React, { useState, useEffect } from 'react';
import {
    Text, TouchableOpacity, View, Image, StyleSheet, TextInput, Alert
} from 'react-native';
import { keys } from '../constants';
import { useAuth } from '../contexts/Auth';
import { styles } from '../styles/CommonStyles';
import { getDataFromAsyncStorage } from '../components/util';
import { colors, endpoints } from '../constants';
import { icons } from '../assets/image';
import axios from 'axios';

const UserProfile = ({ avatar, name, dateOfBirth, phoneNumber, username, onEdit }) => {
    dateOfBirth = "06-08-2001";
    phoneNumber = "0334571352"
    return (
        <View style={myStyles.container}>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Image style={myStyles.avatar} source={avatar} />
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{username}</Text></View>
            <Text style={myStyles.label}>Tên</Text>
            <TextInput
                style={myStyles.input}
                value={name}
            />
            <Text style={myStyles.label}>Ngày sinh</Text>
            <TextInput
                style={myStyles.input}
                value={dateOfBirth}
            />
            <Text style={myStyles.label}>Số điện thoại</Text>
            <TextInput
                style={myStyles.input}
                value={phoneNumber}
            />
            <TouchableOpacity style={myStyles.button} onPress={onEdit}>
                <Text style={myStyles.buttonText}>Chỉnh sửa</Text>
            </TouchableOpacity>
        </View>
    );
};

const ProfileScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        birthDay: '',
        email: '',
        id: '',
    });
    const auth = useAuth();
    const logOut = async () => {
        // isLoading(true);
        await auth.signOut();
    };
    useEffect(() => {
        async function getData() {
            let myUserId = await getDataFromAsyncStorage(keys.userId);
            let request = `${endpoints.members}/${myUserId}/detail`;
            console.log(request);
            axios.get(request)
                .then(function (response) {
                    setUserInfo(response.data);
                    console.log("/api/v1/user detail:", response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
        getData()
    }, [])
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        setIsEditing(false);
        let request = `${endpoints.members}/${userInfo.id}/update`;
        console.log(request);
        await axios.put(request, userInfo)
            .then(function (response) {
                console.log("/api/v1/user/update:", response.data);
                Alert.alert('Cập nhật tài khoản thành công', '', [
                    {
                        text: 'OK',
                    },
                ]);
            })
            .catch(function (error) {
                console.log("ERROR:", error);
            });

    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleInputChange = (key, value) => {
        setUserInfo({
            ...userInfo,
            [key]: value,
        });
    };
    const handleLogOut = () => {
        logOut();
        navigation.navigate("SignInScreen");
    }
    return (
        <View style={myStyles.container}>
            {isEditing ? (
                <>
                    <Image source={icons.greenBiker} style={myStyles.avatar}
                    />
                    <Text style={myStyles.label}>Tên</Text>
                    <TextInput
                        style={myStyles.input}
                        value={userInfo.firstName}
                        onChangeText={(value) => handleInputChange('firstName', value)}
                    />
                    <Text style={myStyles.label}>Ngày sinh</Text>
                    <TextInput
                        style={myStyles.input}
                        value={userInfo.birthDay}
                        onChangeText={(value) => handleInputChange('birthDay', value)}
                    />
                    <Text style={myStyles.label}>Số điện thoại</Text>
                    <TextInput
                        style={myStyles.input}
                        value={userInfo.phoneNumber}
                        onChangeText={(value) => handleInputChange('phoneNumber', value)}
                    />
                    <TouchableOpacity style={[myStyles.button, { color: colors.switch2 }]} onPress={handleSave}>
                        <Text style={myStyles.buttonText}>Lưu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[myStyles.button, styles.BorderStyle, { backgroundColor: colors.switch1 }]} onPress={handleCancel}>
                        <Text style={[myStyles.buttonText, { color: colors.switch2 }]}>Hủy</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    {userInfo && (
                        <UserProfile
                            avatar={icons.greenBiker}
                            name={`${userInfo.firstName} ${userInfo.lastName}`}
                            dateOfBirth={userInfo.birthDay}
                            phoneNumber={userInfo.phoneNumber}
                            username={userInfo.email}
                            onEdit={handleEdit}
                        />
                    )}
                    <TouchableOpacity style={[myStyles.button, styles.BorderStyle, { backgroundColor: colors.switch1, marginLeft: 200 }]} onPress={handleLogOut}>
                        <Text style={[myStyles.buttonText, { color: colors.switch2, fontSize: 18 }]}>Đăng xuất</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default ProfileScreen;

const myStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 50,
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
    button2: {
        backgroundColor: colors.switch2,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
        width: 100,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
        fontStyle: 'italic',
    },
    input: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
        width: 150,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
})

