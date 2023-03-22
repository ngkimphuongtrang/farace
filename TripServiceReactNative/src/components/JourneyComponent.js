import { ROUTE_ICON } from '../assets/image';
import { View, Image, Text, StyleSheet } from 'react-native';
import { styles } from '../styles/CommonStyles';


const JourneyComponent = (props) => {
  return (
    <View
      style={[
        styles.bottomContainer,
        { alignItems: 'center' },
        mystyle.submit,
        { alignSelf: 'center' }
      ]}
    >
      <Image
        style={
          {
            justifyContent: 'center',
            height: 40,
            width: 40,
          }
        }
        source={ROUTE_ICON}
      ></Image>
      <Text >{props.data.id}</Text>
      <View >
        <Text style={{ fontWeight: 'bold', color: 'black' }}>
          {props.data.origin}-{props.data.destination}
        </Text>
        <Text>
          {props.data.departureTime.toLocaleString()}-{props.data.arrivalTime.toLocaleString()}
        </Text>
      </View>
    </View>
  )
}
export default JourneyComponent;

const mystyle = StyleSheet.create(
  submit = {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#68a0cf',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
)