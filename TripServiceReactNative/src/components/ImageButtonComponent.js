import {
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ImageButtonComponent = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(props.screen)}>
      <Image source={props.image}
        style={
          {
            justifyContent: 'center',
            height: 50,
            width: 50,
          }
        }></Image></TouchableOpacity>
  )
}
export default ImageButtonComponent;

