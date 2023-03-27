import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

const TextInputComponent = ({
  mainView,
  editable,
  value,
  onChangeText,
  titleText,
  secureTextEntry,
}) => {
  return (
    <View style={[styles.mainView, mainView]}>
      <Text style={styles.titleText}>{titleText}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        editable={editable}
        style={styles.inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {marginBottom: '7%'},
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputStyle: {
    borderWidth: 1,
    padding: '3%',
  },
});

export default TextInputComponent;
