import { React, useState, useEffect } from 'react';
import {
    View, StyleSheet, Image, Text, Button
} from 'react-native';
import { Card, CheckBox } from '@rneui/themed';
import { styles } from '../styles/CommonStyles';
import { PROFILE_ICON } from '../images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getMembersDomain, postTripDomain } from '../constants';
import axios from 'axios';

var users = [
    {
        name: 'brynn',
        avatar: PROFILE_ICON,
        checked: false,
    },
    {
        name: 'nkpt',
        avatar: PROFILE_ICON,
        checked: false,
    },
    {},
];

const AddMemberScreen = ({ navigation: { goBack } }) => {

    const navigation = useNavigation();
    const [location, setLocation] = useState();
    const [members, setMembers] = useState([]);

    const [checkedState, setCheckedState] = useState(
        new Array(users.length).fill(false)
    );
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        ); setCheckedState(updatedCheckedState);
    }
    const setMemberValue = async (member) => {
        try {
            await AsyncStorage.setItem('@member', JSON.stringify(member));
            console.log('Set @member in AsyncStorage done:', member);
        } catch (e) {
            // save error
        }
    }

    useEffect(() => {
        axios.get(getMembersDomain, {
        })
            .then(function (response) {
                setMembers(response.data);
                console.log("member response:", members);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    return (
        <View style={mystyles.container}>
            <View
                style={{ flex: 8 }}
            >
                <Card>
                    {
                        members.map((member, i) => {
                            return (
                                <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Image
                                        style={styles.image}
                                        resizeMode="cover"
                                        source={PROFILE_ICON}
                                    />
                                    <Text >{member.orderId + 1}:{member.firstName} {member.lastName}</Text>
                                    <CheckBox
                                        checked={checkedState[member.orderId]}
                                        onPress={() => handleOnChange(i)}
                                        iconType="material-community"
                                        checkedIcon="checkbox-outline"
                                        uncheckedIcon={'checkbox-blank-outline'}
                                    />
                                </View>
                            );
                        })
                    }
                </Card>

            </View>
            <View style={{ alignItems: 'center' }}>
                <Button
                    onPress={async () => {
                        const locationSerialized = await AsyncStorage.getItem("@location");
                        if (locationSerialized) {
                            const _locationData = JSON.parse(locationSerialized);
                            setLocation(_locationData);
                            console.log("location:", _locationData, members, checkedState)
                        }
                        var chosenMembers = []
                        var j = 0;
                        for (let i = 0; i < members.length; i++) {
                            if (checkedState[i]) {
                                chosenMembers[j++] = members[0]
                            }
                        }
                        setMemberValue(chosenMembers);

                        // await axios.post(postTripDomain, {
                        //     location,
                        //     chosenMembers,
                        // }).then(function (response) {
                        //     console.log(response.data);
                        // });

                        navigation.navigate("JourneySummary");
                    }}
                    title="Tiếp tục">
                </Button>
            </View>


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