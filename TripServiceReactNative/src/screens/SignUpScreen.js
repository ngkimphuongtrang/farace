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
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import { loginDomain, primaryColor, registerDomain } from '../constants';
import { LOGO_GREEN } from '../assets/image';
import { useAuth } from '../contexts/Auth';
import TextButtonComponent, { textButtonStyles } from '../components/TextButtonComponent';
const Users = [
  {
    id: 1,
    email: 'user1@email.com',
    username: 'aaaaa',
    password: '11111111',
    userToken: 'token123'
  },
  {
    id: 2,
    email: 'user2@email.com',
    username: 'user2',
    password: 'pass1234',
    userToken: 'token12345'
  },
  {
    id: 3,
    email: 'testuser@email.com',
    username: 'testuser',
    password: 'testpass',
    userToken: 'testtoken'
  },
];

const SignUpScreen = () => {
  const auth = useAuth();
  const signIn = async () => {
    // isLoading(true);
    await auth.signIn();
  };
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
  const handleRegister = async () => {
    email = registerInfo.username;
    password = registerInfo.password;
    Email = "nkpt4";
    Password = "11111111";
    try {
      await axios.post(registerDomain, {
        Email, Password, FirstName, LastName
      }).then(function (response) {
        console.log(response);
        navigation.navigate("SignInScreen");
      })
    } catch (error) {
      console.log("ERROR register:", error.response)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
      <View style={styles.header}>
        <Image
          source={LOGO_GREEN}
          style={{ height: 100, width: 200 }}
        ></Image>

      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, {
          backgroundColor: colors.background
        }]}
      >
        <View style={styles.action}>
          <TextInput
            placeholder="Tên đăng nhập"
            placeholderTextColor="#666666"
            style={[styles.textInput, {
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
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
          </Animatable.View>
        }
        <View style={styles.action}>
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={registerInfo.secureTextEntry ? true : false}
            style={[styles.textInput, {
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
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
          </Animatable.View>
        }
        <TextInput
          placeholder="Tên"
          onChangeText={(val) => setFirstname(val)} />
        <TextInput placeholder='Họ' onChangeText={(val) => setLastName(val)} />
        <View style={[styles.button, { alignContent: 'space-between' }]}>
          <View style={[{ width: "40%", alignContent: 'center', marginBottom: 5 }, textButtonStyles.borderStyle]}>
            <Button
              onPress={() => handleRegister()}
              title="Đăng ký"
              color={primaryColor}
            />
          </View>
          <View style={[{ width: "40%", alignContent: 'center', marginBottom: 5 }, textButtonStyles.borderStyle]}>
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

const styles = StyleSheet.create({
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
