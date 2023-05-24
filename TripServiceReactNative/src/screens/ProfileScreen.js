import React, { useState, useEffect } from 'react';
import {
    Text, TouchableOpacity, View, Image, StyleSheet, TextInput, Alert, Platform,
} from 'react-native';
import { keys } from '../constants';
import { useAuth } from '../contexts/Auth';
import { styles } from '../styles/CommonStyles';
import { getDataFromAsyncStorage, getAvatarByUserId } from '../components/util';
import { colors, endpoints } from '../constants';
import { icons } from '../assets/image';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import UserProfile from '../components/UserProfile';


const ProfileScreen = ({ navigation }) => {
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [done, setDone] = useState(false);

    const [userInfo, setUserInfo] = useState({
        firstName: 'dummy name',
        phoneNumber: '',
        email: 'dummy@email',
        id: '',
        imgUrl: '',
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
        getData();
        getImage();
    }, [])
    const [isEditing, setIsEditing] = useState(false);

    const getImage = async () => {
        const userId = await getDataFromAsyncStorage(keys.userId);
        const url = await getAvatarByUserId(userId);
        console.log("get image", uri);
        if (typeof url === 'string' || url instanceof String) {
            handleInputChange("imgUrl", url);
            setDone(true);
        }
    }
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        setIsEditing(false);
        const imgUrl = await uploadImage();
        handleInputChange('imgUrl', imgUrl);
        let request = `${endpoints.members}/${userInfo.id}/update`;
        const clone = userInfo;
        clone['imgUrl'] = imgUrl;
        console.log(request, clone);
        await axios.put(request, clone)
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
    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 2000,
            height: 2000,
            cropping: true,
        }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
            setDone(true);
            console.log(imageUri, image != null);
        });
    };

    const uploadImage = async () => {
        if (image == null) {
            return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        setUploading(true);
        setTransferred(0);
        const filename2 = await getDataFromAsyncStorage(keys.userId) + '.jpg';
        console.log('userid:', filename2);
        const storageRef = storage().ref(filename2);
        const task = storageRef.putFile(uploadUri);
        console.log(storageRef, '\n', task, '\n', uploadUri, '\n', filename2);

        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });

        try {
            await task;

            const url = await storageRef.getDownloadURL();
            console.log("down", url);
            setUploading(false);
            handleInputChange("imgUrl", url);
            setDone(true);

            console.log("done:", userInfo.imgUrl, url, done);
            Alert.alert(
                'Ảnh của bạn đã được lưu!',
                url,
            );
            return url;

        } catch (e) {
            console.log("profile2:", e);
            return null;
        }

    };
    return (
        <View style={myStyles.container}>
            {isEditing ? (
                <>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <TouchableOpacity onPress={choosePhotoFromLibrary} style={{ flexDirection: 'column', alignItems: 'center' }}>
                            {done || userInfo.imgUrl ? <Image source={{ uri: userInfo.imgUrl }} style={myStyles.avatar} /> :
                                <Image source={icons.greenBiker} style={myStyles.avatar} />}
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{userInfo.email}</Text>
                    </View>
                    <Text style={myStyles.label}>Tên</Text>
                    <TextInput
                        style={myStyles.input}
                        value={userInfo.firstName}
                        onChangeText={(value) => handleInputChange('firstName', value)}
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
                            done={done}
                            avatar={userInfo.imgUrl}
                            name={`${userInfo.firstName}`}
                            phoneNumber={userInfo.phoneNumber}
                            username={userInfo.email}
                            onEdit={handleEdit}
                        />
                    )}
                    <TouchableOpacity style={[myStyles.button, styles.BorderStyle, { backgroundColor: colors.switch1, marginLeft: 100 }]} onPress={handleLogOut}>
                        <Text style={[myStyles.buttonText, { color: colors.switch2, fontSize: 18 }]}>Đăng xuất</Text>
                    </TouchableOpacity>
                </>
            )
            }
        </View >
    );
};

export default ProfileScreen;

const myStyles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
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

