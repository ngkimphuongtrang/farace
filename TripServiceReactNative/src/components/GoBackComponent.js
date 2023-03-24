import {
  Image,
  TouchableOpacity,
} from 'react-native';
import { BACK_ICON } from '../assets/image/index.js';

const GoBackComponent = (props) => {
  return (
    <TouchableOpacity onPress={props.goBack}>
      <Image source={BACK_ICON} style={
        {
          justifyContent: 'center',
          height: 40,
          width: 40,
        }
      }>
      </Image>
    </TouchableOpacity>
  )
}
export default GoBackComponent;

