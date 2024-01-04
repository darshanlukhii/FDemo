import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {hp, wp} from '../helper/primaryConstant';

const Field = ({
  placeholder,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCorrect,
}) => {
  return (
    <TextInput
      placeholderTextColor={''}
      style={styles.textInput}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCorrect={autoCorrect}
      autoCapitalize='none'
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: hp(1),
    color: 'green',
    height: hp(6),
    width: wp(85),
    backgroundColor: '#fff',
    paddingHorizontal: wp(5),
    marginVertical: wp(3),
  },
});

export default Field;
