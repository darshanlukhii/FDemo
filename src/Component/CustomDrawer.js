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
            style={{
              marginTop: hp(1.5),
            }}
            label="Home"
            icon={() => (
              <Image
                style={styles.imageIconStyle}
                source={imageConstatnt.drawerHome}
              />
            )}
            onPress={() => {
              props.navigation.navigate('PrimaryHome');
            }}
          />
          <DrawerItem
            label="Favourite"
            icon={() => (
              <Image
                style={styles.imageIconStyle}
                source={imageConstatnt.drawerBookmark}
              />
            )}
            onPress={() => {
              props.navigation.navigate('Favourite');
            }}
          />
          <DrawerItem
            label="Event"
            icon={() => (
              <Image
                style={styles.imageIconStyle}
                source={imageConstatnt.drawerEvent}
              />
            )}
            onPress={() => {
              props.navigation.navigate('Event');
            }}
          />
          <DrawerItem
            label="Subscription"
            icon={() => (
              <Image
                style={styles.imageIconStyle}
                source={imageConstatnt.drawerSubscription}
              />
            )}
            onPress={() => {
              props.navigation.navigate('Payment');
            }}
          />
          <DrawerItem
            label="Profile"
            icon={() => (
              <Image
                style={styles.imageIconStyle}
                source={imageConstatnt.drawerProfile}
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
          marginBottom: 30,
          justifyContent: 'flex-end',
        }}
        label="Logout"
        icon={() => (
          <Image
            style={styles.imageIconStyle}
            source={imageConstatnt.drawerLogout}
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
    marginVertical: hp(1),
    borderWidth: 1,
  },
});

export default CustomDrawer;
