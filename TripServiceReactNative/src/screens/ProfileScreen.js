import React from 'react';
import { Text, TouchableOpacity
} from 'react-native';
import { primaryColor } from '../constants';
import { useAuth } from '../contexts/Auth';
import { styles } from '../styles/CommonStyles';
const ProfileScreen = ({ navigation }) => {

    const auth = useAuth();
    const logOut = async () => {
        // isLoading(true);
        await auth.signOut();
    };
    return (
        <TouchableOpacity
            style={[styles.AppButtonContainer, {
                backgroundColor: primaryColor
            }]}
            onPress={() => {
                logOut();
                navigation.navigate("SignInScreen");
            }}
        >
            <Text style={[styles.AppButtonText, {
                color: 'white',
            }]}>Đăng xuất</Text>
        </TouchableOpacity >
    );
};

export default ProfileScreen;

