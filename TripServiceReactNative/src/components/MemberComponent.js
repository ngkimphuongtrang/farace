import { View, Text } from 'react-native';
import { styles } from "../styles/CommonStyles";

const MemberComponent = (props) => {
  return (
    <View style={[
      {
        alignContent: 'center',
        backgroundColor: props.backgroundColor, flexDirection: 'row', justifyContent: 'space-between'
      },
      styles.BorderStyle, { borderColor: props.backgroundColor }
    ]} key={props.i}>
      <Text style={{ fontStyle: 'italic' }}>{props.i + 1}  </Text>
      <Text style={{ fontWeight: 'bold' }}>{props.member.firstName} {props.member.lastName} </Text>
      <Text style={{ fontWeight: 'bold' }}>{props.member.email} </Text>
    </View>
  )
}
export default MemberComponent;