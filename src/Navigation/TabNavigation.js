import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PrimaryHome from '../Screens/PrimaryDemo/PrimaryHome';
import Favourite from '../Screens/PrimaryDemo/Favourite';
import Event from '../Screens/PrimaryDemo/Event';
import Profile from '../Screens/PrimaryDemo/Profile';
import {hp, wp} from '../helper/primaryConstant';
import {imageConstatnt} from '../helper/imageConstatnt';
import CustomTabBarButton from '../Component/CustomTabBarButton';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';

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
          // console.log('data._data ========>', res._data);
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
                ? imageConstatnt.HomeTab
                : imageConstatnt.PrimaryHome;
              iconStyle = focused
                ? styles.focusTabImageIconStyle
                : styles.tabImageIconStyle;
            } else if (route.name === 'Favourite') {
              iconName = focused
                ? imageConstatnt.bookmarkTab
                : imageConstatnt.bookmark;
              iconStyle = focused
                ? styles.focusTabImageIconStyle
                : styles.tabImageIconStyle;
            } else if (route.name === 'Event') {
              iconName = focused ? imageConstatnt.PostTab : imageConstatnt.Post;
              iconStyle = focused
                ? styles.focusTabImageIconStyle
                : styles.tabImageIconStyle;
            } else if (route.name === 'Profile') {
              iconName = {uri: userOldData.uri};
              iconStyle = styles.profileImage;
            }

            return <Image source={iconName} style={iconStyle} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'black',
          // tabBarStyle: styles.tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          headerTintColor: '#000',
          headerStyle: {
            backgroundColor: '#fff',
          },
        })}>
        <Tab.Screen
          name="PrimaryHome"
          component={PrimaryHome}
          options={{
            tabBarButton: props => <CustomTabBarButton {...props} />,
            // headerLeft: () => <Drawers />,
          }}
        />
        <Tab.Screen
          name="Favourite"
          component={Favourite}
          options={{
            tabBarButton: props => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Event"
          component={Event}
          options={{
            tabBarButton: props => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarButton: props => <CustomTabBarButton {...props} />,
          }}
        />
      </Tab.Navigator>
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
  tabImageIconStyle: {
    height: hp(3),
    width: hp(3),
  },
  profileImage: {
    height: hp(3),
    width: hp(3),
    borderRadius: hp(2),
  },

  focusTabImageIconStyle: {
    height: hp(3.5),
    width: hp(3.5),
    tintColor: '#7d5fff',
  },
  tabBarStyle: {
    backgroundColor: '#fff',
    borderRadius: hp(1.5),
    bottom: hp(2),
    right: 10,
    left: 10,
    height: hp(7),
  },
});

export default TabNavigation;
