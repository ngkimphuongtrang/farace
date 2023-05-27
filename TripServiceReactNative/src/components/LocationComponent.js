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
    ]}
    >
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ fontSize: 10 }}>{props.location.estimatedTimeOfArrival?.toLocaleString()}</Text>
        <View style={{ flexDirection: 'row' }}>
          {/* <Text style={{ fontStyle: 'italic' }}>{props.i + 1}, </Text> */}
          <Text style={{ fontWeight: 'bold' }}>{props.location.name}</Text></View>
      </View>
    </View>
  )
}
export default LocationComponent;