import {
  View, Text,
} from 'react-native';
import { styles } from '../styles/CommonStyles';
import { useNavigation } from '@react-navigation/native';
import { primaryColor } from '../constants/index.js';
import GoBackComponent from './GoBackComponent';

const HeaderComponent = (props) => {
  return (
    <View style={{
      flex: 1, flexDirection: 'row', backgroundColor: primaryColor,
      alignItems: 'center',
      justifyContent: 'center'
    }}>

      <GoBackComponent goBack={props.goBack} />

      <View >
        <Text style={styles.text_header}>
          {props.text}
        </Text>
      </View>
    </View>
  )
}
export default HeaderComponent;

