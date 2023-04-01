import {
  StyleSheet, TouchableOpacity, Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { primaryColor } from '../constants';

const TextButtonComponent = (props) => {
  const navigation = useNavigation();
  return (

    <TouchableOpacity style={[textButtonStyles.appButtonContainer, {
      backgroundColor: props.backgroundColor,
    }]}
      >
      <Text style={[textButtonStyles.appButtonText, {
        color: props.textColor,
      }]}>{props.text}</Text>
    </TouchableOpacity >
  )
}
export default TextButtonComponent;

export const textButtonStyles = StyleSheet.create({
  borderStyle: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: primaryColor,
  },
  appButtonContainer: {
    elevation: 8,
    borderRadius: 5,
    paddingVertical: 8,
    // paddingHorizontal: 40,
    height: 40,
    width: 140,
  },
  appButtonText: {
    alignSelf: "center",
    textTransform: "uppercase",
  }
});


