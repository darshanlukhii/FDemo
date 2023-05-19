import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

const RnModal = ({isVisible, onPress}) => {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RnModal;
