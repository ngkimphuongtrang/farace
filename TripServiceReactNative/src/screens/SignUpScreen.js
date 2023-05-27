import { React, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Alert,
  Image, Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { endpoints } from '../constants';
import { LOGO_GREEN, icons } from '../assets/image';
import { styles } from '../styles/CommonStyles';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [FirstName, setFirstname] = useState("trang");
  // const [LastName, setLastName] = useState("nguyen");
  const [registerInfo, setData] = useState({
    username: '',
    password: '',
    rePassword: '',
    firstName: '',
    lastName: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidRePassword: true,
  });

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
  const handleRePasswordChange = (val) => {
    if (val == registerInfo.password) {
      setData({
        ...registerInfo,
        rePassword: val,
        isValidRePassword: true
      });
    } else {
      setData({
        ...registerInfo,
        rePassword: val,
        isValidRePassword: false
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
  const registerFailNotifier = () =>
    Alert.alert('Đăng ký tài khoản thất bại', "Hãy nhập thông tin đăng ký hợp lệ hoặc chọn một tên đăng nhập khác", [
      {
        text: 'OK'
      },
    ]);
  const handleRegister = async () => {
    Email = registerInfo.username;
    Password = registerInfo.password;
    PhoneNumber = '';
    // BirthDay = date;
    LastName = '';
    ImgUrl = "";
    try {
      await axios.post(endpoints.register, {
        Email, Password, FirstName, LastName, PhoneNumber, ImgUrl
      }).then(function (response) {
        // console.log(response);
        registerSuccessfullyNotifier();
      })
    } catch (error) {
      console.log("ERROR register:", error.response);
      registerFailNotifier();
    }
  }

  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };
  return (
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
          <TextInput
            placeholder="Tên đăng nhập"
            placeholderTextColor="#666666"
            style={myStyles.textInput}
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
              // color: colors.text
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

        <View style={myStyles.action}>
          <TextInput
            placeholder="Nhập lại mật khẩu"
            placeholderTextColor="#666666"
            secureTextEntry={registerInfo.secureTextEntry ? true : false}
            style={[myStyles.textInput, {
              // color: colors.text
            }]}
            autoCapitalize="none"
            onChangeText={(val) => handleRePasswordChange(val)}
          />
          <TouchableOpacity
            onPress={updateSecureTextEntry}
          >
          </TouchableOpacity>
        </View>
        {registerInfo.isValidRePassword ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={myStyles.errorMsg}>Nhập lại mật khẩu không khớp với mật khẩu</Text>
          </Animatable.View>
        }
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}> */}
        <View style={[myStyles.action]}>
          <TextInput
            placeholder="Nhập tên"
            placeholderTextColor="#666666"
            style={myStyles.textInput}
            onChangeText={(val) => setFirstname(val)} />
        </View>
        {/* <View style={[myStyles.action, { width: '50%' }]}>
            <TextInput
              placeholder='Nhập họ'
              placeholderTextColor="#666666"
              style={myStyles.textInput}
              onChangeText={(val) => setLastName(val)} />
          </View> */}
        {/* </View> */}
        {/* <View style={[myStyles.action, {
          flexDirection: 'row', alignItems: 'center', borderWidth: 1,
          borderColor: colors.primary,
          borderRadius: 5,
          // padding: 10,
          // marginBottom: 10,
        }]}>
          <TextInput
            placeholder="Ngày sinh"
            placeholderTextColor="#666666"
          value={date.toDateString()}
          />
          <TouchableOpacity onPress={showDatepicker} style={{ marginLeft: 250 }}>
            <Image source={icons.birthday}
              style={
                {
                  justifyContent: 'center',
                  height: 20,
                  width: 20,
                }
              }></Image></TouchableOpacity>
        </View> */}
        <View style={[myStyles.button, { justifyContent: 'space-between', flexDirection: 'row' }]}>
          <View style={[{ width: "40%", alignContent: 'center', marginBottom: 5 }, styles.BorderStyle, { borderColor: colors.primary }]}>
            <Button
              onPress={() => handleRegister()}
              title="Đăng ký"
              color={colors.primary}
            />
          </View>
          <View style={[{ width: "40%", alignContent: 'center', marginBottom: 5 }, styles.BorderStyle, { borderColor: colors.switch2 }]}>
            <Button
              onPress={() => { navigation.navigate("SignInScreen"); }}
              title="Đăng nhập"
              color={colors.switch2}
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
    // paddingBottom: 5
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
    // marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: 'black',
    // fontWeight: 'bold'
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
