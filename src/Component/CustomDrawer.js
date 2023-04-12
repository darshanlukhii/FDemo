import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {imageConstatnt} from '../helper/imageConstatnt';
import {StackActions, useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {fontSize, hp, wp} from '../helper/primaryConstant';

const CustomDrawer = props => {
  const [userOldData, setUserOldData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getUserData();
    }
  }, [isFocused]);

  const getUserData = async () => {
    try {
      await firestore()
        .collection('users')
        .doc(`${auth().currentUser.uid}`)
        .get()
        .then(res => {
          setUserOldData(res._data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.primaryStyle}>
        <Image source={{uri: userOldData.uri}} style={styles.userIdImage} />
        <Text
          style={{
            fontWeight: '600',
            fontSize: fontSize(22),
            color: 'white',
            alignSelf: 'center',
            marginBottom: hp(1),
          }}>
          {userOldData.name}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          <DrawerItem
            style={{backgroundColor: 'rgba(44, 44, 44, 0.2)'}}
            label="Home"
            icon={() => (
              <Image
                style={styles.imageIconStyle}
                source={imageConstatnt.PrimaryHome}
              />
            )}
            onPress={() => {
              props.navigation.navigate('PrimaryHome');
            }}
          />
          <DrawerItem
            style={{backgroundColor: 'rgba(44, 44, 44, 0.2)'}}
            label="Favourite"
            icon={() => (
              <Image
                style={styles.imageIconStyle}
                source={imageConstatnt.bookmark}
              />
            )}
            onPress={() => {
              props.navigation.navigate('Favourite');
            }}
          />
          <DrawerItem
            style={{backgroundColor: 'rgba(44, 44, 44, 0.2)'}}
            label="Event"
            icon={() => (
              <Image
                style={styles.imageIconStyle}
                source={imageConstatnt.Post}
              />
            )}
            onPress={() => {
              props.navigation.navigate('Event');
            }}
          />
          <DrawerItem
            style={{backgroundColor: 'rgba(44, 44, 44, 0.2)'}}
            label="Subscription"
            icon={() => (
              <Image
                style={styles.imageIconStyle}
                source={imageConstatnt.payment}
              />
            )}
            onPress={() => {
              props.navigation.navigate('Payment');
            }}
          />
          <DrawerItem
            style={{backgroundColor: 'rgba(44, 44, 44, 0.2)'}}
            label="Profile"
            icon={() => (
              <Image
                style={styles.imageIconStyle}
                source={imageConstatnt.Profile}
              />
            )}
            onPress={() => {
              props.navigation.navigate('Profile');
            }}
          />
        </DrawerContentScrollView>
      </View>
      <DrawerItem
        style={{
          backgroundColor: 'rgba(44, 44, 44, 0.2)',
          marginBottom: 30,
          justifyContent: 'flex-end',
        }}
        label="Logout"
        icon={() => (
          <Image
            style={{height: 20, width: 20}}
            // source={require('../assets/icon/logout.png')}
          />
        )}
        onPress={async () => {
          await auth().signOut();
          Alert.alert('Your Account is Remove...');
          // navigation.navigate('Login');
          props.navigation.dispatch(StackActions.replace('Login'));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  primaryStyle: {
    height: hp(20),
    backgroundColor: '#7d5fff',
    justifyContent: 'flex-end',
  },
  imageIconStyle: {
    height: hp(2.7),
    width: hp(2.7),
  },
  userIdImage: {
    height: hp(10),
    width: hp(10),
    borderRadius: hp(5),
    alignSelf: 'center',
    marginVertical: hp(1),
  },
});

export default CustomDrawer;
