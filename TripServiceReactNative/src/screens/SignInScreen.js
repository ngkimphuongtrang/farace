import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    Image, Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'react-native-paper';
import { loginDomain, primaryColor } from '../constants';
import { LOGO_GREEN } from '../assets/image';
import { useAuth } from '../contexts/Auth';
import { styles } from '../styles/CommonStyles';

const SignInScreen = ({ navigation }) => {
    const auth = useAuth();
    const signIn = async (email, password) => {
        // isLoading(true);
        return await auth.signIn(email, password);
    };
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();

    //const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const signInFail = () =>
        Alert.alert('Tài khoản không hợp lệ', "Thử lại", [
            {
                text: 'OK',
                onPress: () => navigation.navigate("SignInScreen"),
            },
        ]);

    return (
        <View style={myStyles.container}>
            <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
            <View style={myStyles.header}>
                <Image
                    source={LOGO_GREEN}
                    style={{ height: 100, width: 200 }}
                ></Image>

            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[myStyles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[myStyles.text_footer, {
                    color: colors.text
                }]}>Username</Text>
                <View style={myStyles.action}>
                    <TextInput
                        placeholder="Your Username"
                        placeholderTextColor="#666666"
                        style={[myStyles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={myStyles.errorMsg}>Username must be 4 characters long.</Text>
                    </Animatable.View>
                }
                <Text style={[myStyles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Password</Text>
                <View style={myStyles.action}>
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[myStyles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={myStyles.errorMsg}>Password must be 8 characters long.</Text>
                    </Animatable.View>
                }


                <TouchableOpacity>
                    <Text style={{ color: { primaryColor } }}>Quên mật khẩu</Text>
                </TouchableOpacity>
                <View style={[myStyles.button, { alignContent: 'space-between' }]}>
                    <View style={[{ width: "40%", alignContent: 'center', marginBottom: 5 }, styles.BorderStyle]}>
                        <Button
                            onPress={async () => {
                                let success = await signIn(data.username, data.password);
                                console.log("success:", success);
                                if (success) {
                                    navigation.navigate("BottomTab", { screen: 'Home' });
                                } else {
                                    signInFail();
                                }
                            }}
                            title="Đăng nhập"
                            color={primaryColor}
                        />
                    </View>
                    <View style={[{ width: "40%", alignContent: 'center', marginBottom: 5 }, styles.BorderStyle]}>
                        <Button
                            onPress={() => { navigation.navigate("SignUpScreen"); }}
                            title="Đăng ký"
                            color={primaryColor}
                        />
                    </View>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const myStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primaryColor
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
