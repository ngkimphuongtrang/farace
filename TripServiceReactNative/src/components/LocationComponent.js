import { styles } from "../styles/CommonStyles";
import { View, Text } from 'react-native';

const LocationComponent = (props) => {
  return (
    <View style={[
      {
        alignContent: 'center', marginBottom: 5,
        backgroundColor: props.backgroundColor, flexDirection: 'row'
      }, props.otherStyle,
      styles.BorderStyle, { borderColor: props.backgroundColor }
    ]} key={props.i}>
      <Text style={{ fontStyle: 'italic' }}>{props.i + 1}, </Text>
      <Text style={{ fontWeight: 'bold' }}>{props.location.name}</Text>
    </View>
  )
}
export default LocationComponent;