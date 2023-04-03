import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import Home from '../Screens/Home';
import Splash from '../Screens/Splash';
import MoblieVerify from '../Screens/MoblieVerify';
import Imageupload from '../Screens/Imageupload';
import Firestore from '../Screens/Firestore';
import RealTimeDataBase from '../Screens/RealTimeDataBase';
import App1 from '../Screens/Todo App/App1';
import MyProject from '../Screens/MyProject/MyProject';
import ZumbaClass from '../Screens/MyProject/ZumbaClass';
import FeedHomeScreen from '../Screens/MyProject/FeedHomeScreen';
import FirebaseDemo from '../Screens/FirebaseDemo';
import ApiCalling from '../Screens/ApiCalling';
import DemoApi from '../Screens/DemoApi';
import ApiApi from '../Screens/ApiApi';
import PrimaryHome from '../Screens/PrimaryDemo/PrimaryHome';
import Tabnavigation from './TabNavigation';
import Drawers from './Drawers';
import Event from '../Screens/PrimaryDemo/Event';
import Favourite from '../Screens/PrimaryDemo/Favourite';
import Profile from '../Screens/PrimaryDemo/Profile';
import ChatList from '../Screens/PrimaryDemo/ChatList';

const Navigation = () => {
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('fcmToken', fcmToken);
    }
  };

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Chat"
        screenOptions={{
          headerShown: false,
          headerTintColor: '#FFFFFF',
          headerStyle: {
            backgroundColor: '#7d5fff',
          },
        }}>
        {/* <Stack.Screen name="Firestore" component={Firestore} /> */}

        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Drawers" component={Drawers} />
        <Stack.Screen name="ChatList" component={ChatList} />
        {/* <Stack.Screen name="Tabnavigation" component={Tabnavigation} /> */}

        {/* <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="mobileverification" component={MoblieVerify} />
        <Stack.Screen name="RealTimeDataBase" component={RealTimeDataBase} />
        <Stack.Screen name="App1" component={App1} />
        <Stack.Screen name="MyProject" component={MyProject} />
        <Stack.Screen name="ZumbaClass" component={ZumbaClass} />
        <Stack.Screen name="Imageupload" component={Imageupload} />
        <Stack.Screen name="FeedHomeScreen" component={FeedHomeScreen} />
        <Stack.Screen name="FirebaseDemo" component={FirebaseDemo} />
        <Stack.Screen name="ApiCalling" component={ApiCalling} />
        <Stack.Screen name="DemoApi" component={DemoApi} />
      <Stack.Screen name="ApiApi" component={ApiApi} /> */}
        {/* <Stack.Screen name="FirebaseDemo" component={FirebaseDemo} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
