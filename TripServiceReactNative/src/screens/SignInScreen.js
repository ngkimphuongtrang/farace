import React, { useState } from 'react';
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
import { LOGO_GREEN } from '../assets/image';
import { useAuth } from '../contexts/Auth';
import { colors } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

const SignInScreen = ({ navigation }) => {
    const [loading, isLoading] = useState(false);
    const auth = useAuth();
    const signIn = async (email, password) => {
        isLoading(true);
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
    const handleLogIn = async () => {
        let success = await signIn(data.username, data.password);
        // console.log("success:", success);
        if (success) {
            // navigation.navigate("BottomTab", { screen: 'Home' });
            navigation.navigate('Home');
        } else {
            signInFail();
        }
    }
    return (
        <SafeAreaView style={myStyles.container}>
            <View style={myStyles.container}>
                <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

                <View style={myStyles.header}>
                    <Image
                        source={LOGO_GREEN}
                        style={{ height: 100, width: 200 }}
                    ></Image>

                </View>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={[myStyles.footer, {
                        // backgroundColor: colors.background
                    }]}
                >
                    <View style={myStyles.action}>
                        <FormInput
                            // labelValue={email}
                            onChangeText={(val) => textInputChange(val)}
                            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                            placeholderText="Tên đăng nhập"
                            iconType="user"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        {/* <TextInput
                            placeholder="Tên đăng nhập"
                            placeholderTextColor="#666666"
                            style={[myStyles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                        /> */}
                        {data.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                            </Animatable.View>
                            : null}
                    </View>
                    {data.isValidUser ? null :
                        <Animatable.View animation="fadeInLeft" duration={500} style={{ marginBottom: 20 }}>
                            <Text style={myStyles.errorMsg}>Tên đăng nhập có độ dài ít nhất 4</Text>
                        </Animatable.View>
                    }
                    <View style={myStyles.action}>
                        {/* <TextInput
                            placeholder="Mật khẩu"
                            placeholderTextColor="#666666"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={[myStyles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                        /> */}
                        <FormInput
                            // labelValue={password}
                            onChangeText={(val) => handlePasswordChange(val)}
                            placeholderText="Mật khẩu"
                            iconType="lock"
                            secureTextEntry={true}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                        </TouchableOpacity>
                    </View>
                    {data.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500} style={{ marginBottom: 20 }}>
                            <Text style={myStyles.errorMsg}>Mật khẩu có độ dài ít nhất 8</Text>
                        </Animatable.View>
                    }


                    {/* <TouchableOpacity>
                        <Text style={{ color: colors.primary }}>Quên mật khẩu</Text>
                    </TouchableOpacity> */}
                    <View style={[myStyles.button, { alignContent: 'space-between' }]}>
                        {/* <View style={[
                            { width: "40%", alignContent: 'center', marginBottom: 5 },
                            styles.BorderStyle,
                            { borderColor: colors.primary }]}>
                            <Button
                                onPress={handleLogIn}
                                title="Đăng nhập"
                                color={colors.primary}
                            />
                        </View> */}
                        <FormButton
                            buttonTitle="Đăng nhập"
                            onPress={handleLogIn}
                            textColor='white'
                            bgColor={colors.primary}
                        />
                        <FormButton
                            buttonTitle="Đăng ký"
                            onPress={() => { navigation.navigate("SignUpScreen") }}
                            textColor={colors.switch2}
                            bgColor={colors.switch1}
                        />

                    </View>
                </Animatable.View>
            </View>
            {/* )} */}
        </SafeAreaView >
    );
};

export default SignInScreen;

const myStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
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
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
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
