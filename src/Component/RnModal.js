//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView} from 'react-native';
import {hp} from '../helper/primaryConstant';

// create a component
const RnModal = ({isVisible, onPress}) => {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default RnModal;
