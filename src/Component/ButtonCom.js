//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {hp, wp} from '../helper/primaryConstant';

// create a component
const ButtonCom = ({symbol, onPress}) => {
  return (
    // <View style={{flexDirection: 'row', marginTop: hp(2.4)}}>
    <TouchableOpacity style={styles.maleButtonView} onPress={onPress}>
      <Text>{symbol} </Text>
    </TouchableOpacity>
    // </View>
  );
};

// define your styles
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

//make this component available to the app
export default ButtonCom;
