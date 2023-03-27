import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {imageConstatnt} from '../helper/imageConstatnt';
import {hp} from '../helper/primaryConstant';
import {StackActions} from '@react-navigation/native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      const unsubscribe = auth().onAuthStateChanged(user => {
        // -----> this is First way
        // const routeName = user !== null ? 'Home' : 'Login';
        // navigation.navigate(routeName);
        // -----> this is second way
        // navigation.navigate(user !== null ? 'Home' : 'Login');
        unsubscribe();
        navigation.dispatch(
          StackActions.replace(user === null ? 'Login' : 'Drawers'),
        );
      });
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={imageConstatnt.splash}
        style={{height: hp(20), width: hp(20)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
