import {StackActions, useRoute} from '@react-navigation/native';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import Btn from '../Component/Btn';
import {hp} from '../helper/primaryConstant';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Btn
        bgColor="#000"
        textColor="#fff"
        btnLabel="Profile"
        onPress={() => navigation.navigate('Imageupload')}
      />
      <Text>Email : {auth().currentUser.email}</Text>
      <Text>UID : {auth().currentUser.uid}</Text>
      <View style={{marginTop: hp(3)}}>
        <Btn
          btnLabel={'Api'}
          bgColor="#000"
          textColor="#fff"
          onPress={() => navigation.navigate('ApiApi')}
        />
        <Btn
          btnLabel={'Api Calling'}
          bgColor="#000"
          textColor="#fff"
          onPress={() => navigation.navigate('ApiCalling')}
        />
        <Btn
          btnLabel={'FirebaseDemo'}
          bgColor="#000"
          textColor="#fff"
          onPress={() => navigation.navigate('FirebaseDemo')}
        />
        <Btn
          btnLabel={'FeedHomeScreen'}
          bgColor="#000"
          textColor="#fff"
          onPress={() => navigation.navigate('FeedHomeScreen')}
        />
        <Btn
          btnLabel={'UI DEMO'}
          bgColor="#000"
          textColor="#fff"
          onPress={() => navigation.navigate('MyProject')}
        />
        <Btn
          btnLabel={'Zumba'}
          bgColor="#000"
          textColor="#fff"
          onPress={() => navigation.navigate('ZumbaClass')}
        />
        <Btn
          bgColor="#000"
          textColor="#fff"
          btnLabel="Todo"
          onPress={() => navigation.navigate('App1')}
        />
        <Btn
          bgColor="#000"
          textColor="#fff"
          btnLabel="RealTimeDataBase"
          onPress={() => navigation.navigate('RealTimeDataBase')}
        />
        <Btn
          btnLabel="LogOut"
          bgColor="#000"
          textColor="#fff"
          onPress={async () => {
            await auth().signOut();
            Alert.alert('Your Account is Remove...');
            // navigation.navigate('Login');
            navigation.dispatch(StackActions.replace('Login'));
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1ebea',
  },
});

export default Home;
