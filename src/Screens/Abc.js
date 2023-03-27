import React, {Component, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const Abc = () => {
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  useEffect(() => {}, []);

  rnBiometrics.isSensorAvailable().then(resultObject => {
    const {available, biometryType} = resultObject;

    if (available && biometryType === BiometryTypes.TouchID) {
      console.log('TouchID is supported');
    } else if (available && biometryType === BiometryTypes.FaceID) {
      console.log('FaceID is supported');
    } else if (available && biometryType === BiometryTypes.Biometrics) {
      console.log('Biometrics is supported');
    } else {
      console.log('Biometrics not supported');
    }
  });

  rnBiometrics.createKeys().then(resultObject => {
    console.log('------->', resultObject);
    const {publicKey} = resultObject;
    console.log(publicKey);
    sendPublicKeyToServer(publicKey);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <Text>abc</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

export default Abc;
