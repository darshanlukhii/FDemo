import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {StackActions, useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {fontSize, hp, wp} from '../helper/primaryConstant';
import {imageConstant} from '../helper/imageConstant';
import DrawerItems from './DrawerItems';

const CustomDrawer = props => {
  const isFocused = useIsFocused();
  const [userOldData, setUserOldData] = useState([]);

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
        <Text style={styles.userNameText}>{userOldData.name}</Text>
      </View>
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          {/* go to ==> Line no == 33  /Users/mac/Documents/DLDev/FDemo/node_modules/@react-navigation/drawer/src/views/DrawerContentScrollView.tsx */}
          <DrawerItems
            DrawerStyle={{marginTop: hp(1.5)}}
            label={'Home'}
            source={imageConstant.drawerHome}
            onPress={() => props.navigation.navigate('PrimaryHome')}
          />
          <DrawerItems
            label={'Favourite'}
            source={imageConstant.drawerBookmark}
            onPress={() => props.navigation.navigate('Favourite')}
          />
          <DrawerItems
            label={'Event'}
            source={imageConstant.drawerEvent}
            onPress={() => props.navigation.navigate('Event')}
          />
          <DrawerItems
            label={'Subscription'}
            source={imageConstant.drawerSubscription}
            onPress={() => props.navigation.navigate('Payment')}
          />
          <DrawerItems
            label={'Profile'}
            source={imageConstant.drawerProfile}
            onPress={() => props.navigation.navigate('Profile')}
          />
        </DrawerContentScrollView>
      </View>
      <DrawerItem
        style={{
          marginBottom: 30,
          justifyContent: 'flex-end',
        }}
        label="Logout"
        icon={() => (
          <Image
            style={styles.imageIconStyle}
            source={imageConstant.drawerLogout}
          />
        )}
        onPress={async () => {
          await auth().signOut();
          Alert.alert('Your Account is Remove...');
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
    height: hp(25),
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
    marginVertical: hp(2),
    borderWidth: 1,
  },
  userNameText: {
    fontWeight: '600',
    fontSize: fontSize(22),
    color: 'white',
    alignSelf: 'center',
    marginBottom: hp(1),
  },
});

export default CustomDrawer;
