import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function Firestore() {
  const [mydata, setMyData] = useState();

  useEffect(() => {
    getDataBase();
  }, []);

  const getDataBase = async () => {
    try {
      const data = await firestore()
        .collection('comstas')
        .doc('YfkhILycbdYjKuFVdqYLfgtzuMo1')
        .get();

      console.log(data._data);
      setMyData(data._data);
      //   setIsData(data._data.age);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Email: {mydata ? mydata.email : 'Loading'}</Text>
      <Text>id: {mydata ? mydata.id : 'Loading'}</Text>
      <Text>Name: {mydata ? mydata.name : 'Loading'}</Text>
      <Text>Password: {mydata ? mydata.password : 'Loading'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0fff',
  },
});
