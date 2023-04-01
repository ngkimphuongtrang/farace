import { React, useState } from 'react';
import {
    View, StyleSheet, Image, Text, Button
} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { Card, CheckBox } from '@rneui/themed';
import { styles } from '../styles/CommonStyles';
import { PROFILE_ICON } from '../images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

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
];

const AddMemberScreen = ({ navigation: { goBack } }) => {
    const navigation = useNavigation();

    const [checkedState, setCheckedState] = useState(
        new Array(users.length).fill(false)
    );
    // TODO: map index to username
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        ); setCheckedState(updatedCheckedState);
    }
    const [member, setMember] = useState([]);
    const setMemberValue = async (member) => {
        try {
            const members = checkedState.map((item, index) => checkedState[index] ? index : undefined);
            await AsyncStorage.setItem('@member', JSON.stringify(members));
            console.log('Set @member in AsyncStorage done:', members);
        } catch (e) {
            // save error
        }
    }
    return (
        <View style={mystyles.container}>
            <View
                style={{ flex: 8 }}
            >
                <Card>
                    <Card.Divider />
                    {
                        users.map((u, i) => {
                            return (
                                <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Image
                                        style={styles.image}
                                        resizeMode="cover"
                                        source={u.avatar}
                                    />
                                    <Text >{u.name}</Text>
                                    <CheckBox
                                        checked={checkedState[i]}
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
                    onPress={() => {
                        setMemberValue(member);
                        console.log("Location from Journey:", AsyncStorage.getItem('@location'));
                        navigation.navigate("JourneySummary");
                    }}
                    title="Tiếp tục">
                </Button>
            </View>


        </View>
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