import { React, useState, useEffect } from 'react';
import {
    View, StyleSheet, Image, Text, Button, ScrollView, SafeAreaView, StatusBar
} from 'react-native';
import { CheckBox } from '@rneui/themed';
import { styles } from '../styles/CommonStyles';
import { PROFILE_ICON } from '../images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endpoints, keys, colors } from '../constants';
import axios from 'axios';
import { getDataFromAsyncStorage } from '../components/util';

const AddMemberScreen = ({ navigation }) => {
    const [members, setMembers] = useState([]);
    const [checkedState, setCheckedState] = useState(
        new Array(1000).fill(false)
    );
    const handleOnCheckbox = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        ); setCheckedState(updatedCheckedState);
    }
    const storeMembers = async (member) => {
        try {
            await AsyncStorage.setItem('@member', JSON.stringify(member));
            console.log('Set @member in AsyncStorage done:', member);
        } catch (e) {
            // save error
        }
    }
    const storeGroupId = async (groupId) => {
        try {
            await AsyncStorage.setItem("groupId", groupId);
        } catch (e) {
            console.log("error set group id");
        }
    }
    useEffect(() => {
        axios.get(endpoints.members)
            .then(function (response) {
                setMembers(response.data);
                console.log("/api/v1/user response:", members);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const postTripHandle = async () => {
        const locationSerialized = await AsyncStorage.getItem("@location");
        var _locationData;
        if (locationSerialized) {
            _locationData = JSON.parse(locationSerialized);
            console.log("location get from asyncstorage:", _locationData, members)
        }
        var customers = []
        var j = 0;
        for (let i = 0; i < members.length; i++) {
            if (checkedState[i]) {
                customers[j++] = members[i]
            }
        }
        let myUserId = await getDataFromAsyncStorage(keys.userId);
        customers[j++] = { "id": myUserId }

        let locations = _locationData;
        storeMembers(customers);
        console.log("payload", { locations, customers });
        await axios.post(endpoints.postTrip, {
            locations,
            customers,
        }).then(function (response) {
            console.log("post trip:", response, response.data, locations, customers);
            storeGroupId(response.data.id);
        });
        navigation.navigate("JourneySummary");
    }
    return (
        <View style={styles.ContainerScreen}>
            <SafeAreaView style={{
                flex: 1,
                paddingTop: StatusBar.currentHeight
            }}>
                <ScrollView style={{
                    marginHorizontal: 20,
                }}>
                    {
                        members.map((member, i) => {
                            return (
                                <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Image
                                        style={styles.image}
                                        resizeMode="cover"
                                        source={PROFILE_ICON}
                                    />
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ fontWeight: 'bold' }} >{member.orderId + 1}:{member.firstName} {member.lastName}</Text>
                                        <Text>{member.email}</Text></View>
                                    <CheckBox
                                        checked={checkedState[member.orderId]}
                                        onPress={() => handleOnCheckbox(i)}
                                        iconType="material-community"
                                        checkedIcon="checkbox-outline"
                                        uncheckedIcon={'checkbox-blank-outline'}
                                    />
                                </View>
                            );
                        })
                    }
                </ScrollView>
            </SafeAreaView>
            <View style={[mystyles.button, { alignContent: 'space-between' }]}>

                <View style={[{ width: "40%", alignContent: 'center', marginBottom: 5 }, styles.BorderStyle]}>
                    <Button
                        onPress={() => postTripHandle()}
                        title="Tiếp tục"
                        color={colors.primary}
                    />
                </View>
            </View>
            {/* <View style={{ alignItems: 'center' }}>
                <Button
                    onPress={() => postTripHandle()}
                    title="Tiếp tục">
                </Button>
            </View> */}
        </View >
    );
};

export default AddMemberScreen;
const mystyles = StyleSheet.create({
    container: {
        flex: 1,
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