import React from 'react';
import {
    View, StyleSheet,
} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';

const AddMemberScreen = ({ navigation: { goBack } }) => {
    return (
        <View style={mystyles.container}>
            <HeaderComponent text="Thêm thành viên" style={{ flex: 2 }} goBack={goBack} />
            <View style={{ flex: 8 }}>

            </View>
            <View style={[
                { alignItems: 'center' },
                { flex: 2 }]}
            >

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