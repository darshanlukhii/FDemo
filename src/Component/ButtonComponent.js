import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const ButtonComponent = ({buttonTitle, onPress, buttonstyle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonView, buttonstyle]}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    height: 64,
    width: 295,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ButtonComponent;
