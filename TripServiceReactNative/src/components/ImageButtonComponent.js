import {
 Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackIconComponent = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(props.screen)}>
      <Image source={props.image}
        style={
          {
            justifyContent: 'center',
            height: 80,
            width: 80,
          }
        }></Image></TouchableOpacity>
  )
}
export default BackIconComponent;

