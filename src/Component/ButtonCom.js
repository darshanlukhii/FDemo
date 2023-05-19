import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {hp, wp} from '../helper/primaryConstant';

const ButtonCom = ({symbol, onPress}) => {
  return (
    <TouchableOpacity style={styles.maleButtonView} onPress={onPress}>
      <Text>{symbol} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  maleButtonView: {
    borderWidth: 1,
    height: hp(4.5),
    width: wp(25),
    borderRadius: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp(5),
    marginTop: hp(2.4),
  },
});

export default ButtonCom;
