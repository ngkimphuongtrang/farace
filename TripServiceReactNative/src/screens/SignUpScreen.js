import { React, useState } from 'react';
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
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import { primaryColor, registerDomain } from '../constants';
import { LOGO_GREEN } from '../assets/image';
import { useAuth } from '../contexts/Auth';
import { styles } from '../styles/CommonStyles';
import { useNavigation } from '@react-navigation/native';


const SignUpScreen = () => {
  const navigation = useNavigation();
  const [FirstName, setFirstname] = useState("trang");
  const [LastName, setLastName] = useState("nguyen");
  const [registerInfo, setData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { colors } = useTheme();

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...registerInfo,
        username: val,
        check_textInputChange: true,
        isValidUser: true
      });
    } else {
      setData({
        ...registerInfo,
        username: val,
        check_textInputChange: false,
        isValidUser: false
      });
    }
  }

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...registerInfo,
        password: val,
        isValidPassword: true
      });
    } else {
      setData({
        ...registerInfo,
        password: val,
        isValidPassword: false
      });
    }
  }
  const updateSecureTextEntry = () => {
    setData({
      ...registerInfo,
      secureTextEntry: !registerInfo.secureTextEntry
    });
  }

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...registerInfo,
        isValidUser: true
      });
    } else {
      setData({
        ...registerInfo,
        isValidUser: false
      });
    }
  }
  const registerSuccessfullyNotifier = () =>
    Alert.alert('Đăng ký tài khoản thành công', "Đăng nhập với tài khoản mới: " + registerInfo.username, [
      {
        text: 'OK',
        onPress: () => navigation.navigate("SignInScreen"),
      },
    ]);

  const handleRegister = async () => {
    Email = registerInfo.username;
    Password = registerInfo.password;
    try {
      await axios.post(registerDomain, {
        Email, Password, FirstName, LastName
      }).then(function (response) {
        console.log(response);
        registerSuccessfullyNotifier();
      })
    } catch (error) {
      console.log("ERROR register:", error.response)
    }
  }

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
        <View style={myStyles.action}>
          <TextInput
            placeholder="Tên đăng nhập"
            placeholderTextColor="#666666"
            style={[myStyles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {registerInfo.check_textInputChange ?
            <Animatable.View
              animation="bounceIn"
            >
            </Animatable.View>
            : null}
        </View>
        {registerInfo.isValidUser ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={myStyles.errorMsg}>Tên đăng nhập có độ dài ít nhất 4</Text>
          </Animatable.View>
        }
        <View style={myStyles.action}>
          <TextInput
            placeholder="Mật khẩu"
            placeholderTextColor="#666666"
            secureTextEntry={registerInfo.secureTextEntry ? true : false}
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
        {registerInfo.isValidPassword ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={myStyles.errorMsg}>Mật khẩu có độ dài ít nhất 8</Text>
          </Animatable.View>
        }
        <TextInput
          placeholder="Nhập tên"
          onChangeText={(val) => setFirstname(val)} />
        <TextInput placeholder='Nhập họ' onChangeText={(val) => setLastName(val)} />
        <View style={[myStyles.button, { alignContent: 'space-between' }]}>
          <View style={[{ width: "40%", alignContent: 'center', marginBottom: 5 }, styles.BorderStyle]}>
            <Button
              onPress={() => handleRegister()}
              title="Đăng ký"
              color={primaryColor}
            />
          </View>
          <View style={[{ width: "40%", alignContent: 'center', marginBottom: 5 }, styles.BorderStyle]}>
            <Button
              onPress={() => { navigation.navigate("SignInScreen"); }}
              title="Đăng nhập"
              color={primaryColor}
            />
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

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
