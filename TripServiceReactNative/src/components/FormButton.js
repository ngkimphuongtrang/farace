import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { windowHeight } from './util';
import { colors } from '../constants';
const FormButton = ({ buttonTitle, textColor, bgColor, ...rest }) => {
  return (
    <View elevation={5} style={[styles.buttonContainer, { backgroundColor: bgColor }]}>
      <TouchableOpacity {...rest}>
        <Text style={[styles.buttonText, { color: textColor }]}>{buttonTitle}</Text>
      </TouchableOpacity ></View>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: colors.primary,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    // fontFamily: 'Lato-Regular',
  },
});