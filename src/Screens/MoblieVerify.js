import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import Field from '../Component/Field';
import auth from '@react-native-firebase/auth';

const MoblieVerify = ({Navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [confirmData, setConfirmData] = useState('');

  const sendotp = async () => {
    try {
      //   const response = await auth().signInWithPhoneNumber(mobileNumber);  //---> +91 evey time lakhavu na pade atale ...
      const mobile = '+91' + mobileNumber;
      const response = await auth().signInWithPhoneNumber(mobile);
      setConfirmData(response);
      // setMobileNumber('');
      console.log(response);
      Alert.alert('Otp Is Sent Please Verify It ...');
    } catch (error) {
      console.log(error);
    }
  };

  const submitotp = async () => {
    const response = await confirmData.confirm(otpInput);
    Alert.alert('Your Number Is Verified ...', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        // style: 'cancel',
      },
      {text: 'OK', onPress: () => Navigation.navigate('Home')},
    ]);
    // setOtpInput('');
    console.log(response);
  };

  return (
    <View style={styles.container}>
      <Field
        placeholder={'Enter Your mobile number'}
        value={mobileNumber}
        onChangeText={value => setMobileNumber(value)}
      />
      <Button title="send otp" onPress={sendotp} />
      <Field
        placeholder={'Enter Your OTP'}
        value={otpInput}
        onChangeText={value => setOtpInput(value)}
      />
      <Button title="send otp" onPress={submitotp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default MoblieVerify;
