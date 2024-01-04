import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PrimaryHome from '../Screens/PrimaryDemo/PrimaryHome';
import Favourite from '../Screens/PrimaryDemo/Favourite';
import Event from '../Screens/PrimaryDemo/Event';
import Profile from '../Screens/PrimaryDemo/Profile';
import {hp, wp} from '../helper/primaryConstant';
import {imageConstant} from '../helper/imageConstant';
import CustomTabBarButton from '../Component/CustomTabBarButton';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Payment from '../Screens/PrimaryDemo/Payment';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
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
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconName, iconStyle;
            if (route.name === 'PrimaryHome') {
              iconName = focused
                ? imageConstant.HomeTab
                : imageConstant.PrimaryHome;
              iconStyle = focused
                ? styles.focusTabImageIconStyle
                : styles.tabImageIconStyle;
            } else if (route.name === 'Favourite') {
              iconName = focused
                ? imageConstant.bookmarkTab
                : imageConstant.bookmark;
              iconStyle = focused
                ? styles.focusTabImageIconStyle
                : styles.tabImageIconStyle;
            } else if (route.name === 'Event') {
              iconName = focused ? imageConstant.PostTab : imageConstant.Post;
              iconStyle = focused
                ? styles.focusTabImageIconStyle
                : styles.tabImageIconStyle;
            } else if (route.name === 'Profile') {
              iconName = {uri: userOldData.uri};
              iconStyle = styles.profileImage;
            } else if (route.name == 'Payment') {
              iconName = focused
                ? imageConstant.paymentTab
                : imageConstant.payment;
              iconStyle = focused
                ? styles.focusPaymentTabImageIconStyle
                : styles.paymentTabImageIconStyle;
            }

            return <Image source={iconName} style={iconStyle} />;
          },
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'black',
          tabBarShowLabel: false,
          headerShown: false,
          headerTintColor: '#000',
          headerStyle: {
            backgroundColor: '#fff',
          },
          tabBarBackground: () => (
            <LinearGradient
              colors={['#33d6ff', '#9999ff', '#ff4dff']}
              style={{
                borderRadius: hp(5),
                height: hp(6),
              }}
              start={{x: 1.2, y: 0.5}}
              end={{x: 0, y: 1.4}}
            />
          ),
        })}>
        <Tab.Screen name="PrimaryHome" component={PrimaryHome} />
        <Tab.Screen name="Favourite" component={Favourite} />
        <Tab.Screen name="Event" component={Event} />
        <Tab.Screen name="Payment" component={Payment} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  tabImageIconStyle: {
    height: hp(2.5),
    width: hp(2.5),
  },
  profileImage: {
    height: hp(2.5),
    width: hp(2.5),
    borderRadius: hp(2),
    borderWidth: 1,
  },
  focusTabImageIconStyle: {
    height: hp(2.5),
    width: hp(2.5),
    tintColor: '#fff',
  },
  focusPaymentTabImageIconStyle: {
    height: hp(3),
    width: hp(3),
  },
  paymentTabImageIconStyle: {
    height: hp(2.5),
    width: hp(2.5),
    tintColor: 'black',
  },
  tabBarStyle: {
    position: 'absolute',
    borderRadius: hp(5),
    bottom: hp(2),
    right: wp(6),
    left: wp(6),
    height: hp(6),
    paddingTop: Platform.OS == 'ios' ? hp(3) : hp(0),
  },
});

export default TabNavigation;
