import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {getUserData} from '../../Component/GetData';
import {fontSize, hp, wp} from '../../helper/primaryConstant';

const ChatList = ({navigation}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await firestore()
        .collection('users')
        .onSnapshot(querySnapshot => {
          let users = [];
          querySnapshot.forEach(documentSnapshot => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setData(() => {
            users.filter(snap => {
              return snap.id !== auth().currentUser.uid;
            });
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity
          style={styles.backButtonView}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.backButtonTextStyle}>Back</Text>
        </TouchableOpacity>
      </View>
      <FlatList />
      <Text>ChatList</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    flexDirection: 'row',
  },
  backButtonView: {
    marginLeft: wp(3),
  },
  backButtonTextStyle: {
    fontSize: fontSize(25),
    fontWeight: '600',
  },
});

export default ChatList;
