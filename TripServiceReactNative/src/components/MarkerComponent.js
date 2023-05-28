import { View, Text, Image } from 'react-native';

const MarkerComponent = (props) => {
  return (
    <View style={{
      flex: 1, justifyContent: 'center', alignItems: 'center'
    }}>
      <Image
        style={{
          flex: 1,
          width: 40,
          height: 40,
        }}
        source={props.image}
      />
      <Text style={{ position: 'absolute', fontSize: 20, fontWeight: 'bold', color: 'white' }}>{props.number + 1}</Text>
    </View>
  )
}
export default MarkerComponent;