import { styles } from "../styles/CommonStyles";
import { View, Text, Image } from 'react-native';
import { bottomTabIcon } from "../assets/image";
import { colors } from "../constants";

const UserComponent = (props) => {
  return (
    <View elevation={5} style={[
      {
        alignContent: 'center', marginBottom: 10,
        backgroundColor: colors.switch1, flexDirection: 'row'
      },
      styles.BorderStyle, { borderColor: colors.switch2, borderRadius: 10 }
    ]} >
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10, marginTop: 10 }}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={bottomTabIcon.profile}
        />
        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', marginLeft: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontStyle: 'italic' }}>{props.orderId},</Text>
            <Text style={{ fontWeight: 'bold' }} >{props.firstName} {props.lastName}</Text>
          </View>
          <Text>{props.email}</Text>
        </View>
      </View>
    </View>
  )
}
export default UserComponent;

