//import liraries
import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';

// create a component
const RealTimeDataBase = () => {
  const [userData, setUserData] = useState('');
  useEffect(() => {
    getDataBase();
  }, []);

  const getDataBase = async () => {
    const data = await database().ref('todo/1').once('value');
    console.log(data);
    // -----> Use Data for value so You have to add .val() funaction <------- //
    setUserData(data.val());
  };
  return (
    <View style={styles.container}>
      <Text>Data: {userData.value}</Text>
    </View>
  );
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
export default RealTimeDataBase;
