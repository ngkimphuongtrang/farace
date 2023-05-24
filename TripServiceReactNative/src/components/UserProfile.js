import { styles } from "../styles/CommonStyles";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { icons } from "../assets/image";
import { colors } from "../constants";

const UserProfile = ({ done, avatar, name, phoneNumber, username, onEdit }) => {
  return (
    <View style={myStyles.container}>
      {
        onEdit && <TouchableOpacity onPress={onEdit} style={{ marginLeft: 280 }}>
          <Image source={icons.edit} style={styles.image} />
        </TouchableOpacity>
      }

      <View style={{ flexDirection: 'column', alignItems: 'center' }}>

        {done ? <Image source={{ uri: avatar }} style={myStyles.avatar} /> :
          <Image source={icons.greenBiker} style={myStyles.avatar} />}
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{username}</Text></View>
      <Text style={myStyles.label}>Tên</Text>
      <TextInput
        style={myStyles.input}
        value={name}
      />
      <Text style={myStyles.label}>Số điện thoại</Text>
      <TextInput
        style={myStyles.input}
        value={phoneNumber}
      />

    </View>
  );
};

export default UserProfile;

const myStyles = StyleSheet.create({
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
})