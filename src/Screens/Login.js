import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Btn from '../Component/Btn';
import Field from '../Component/Field';
import {hp, wp} from '../helper/primaryConstant';
import auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StackActions} from '@react-navigation/native';
import {imageConstatnt} from '../helper/imageConstatnt';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import analytics from '@react-native-firebase/analytics';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const user = await auth().signInWithEmailAndPassword(email, password);
        // console.log('=====>password', user.password);

        // <---- Verify user with email verification ---->
        // if (user.user.emailVerified) {
        //   Alert.alert('You Are Verified');
        //   navigation.dispatch(StackActions.replace('Home'));
        // } else {
        //   Alert.alert('Please Verify Your Email checkout Inbox');
        //   await auth().currentUser.sendEmailVerification();
        //   await auth().signOut();
        // }

        setMessage('');
        navigation.dispatch(StackActions.replace('Drawers'));
        // navigation.navigate('Home', {
        //   email: isUserLogin.user.email,
        //   uid: isUserLogin.user.uid,
        // });
        await analytics().logLogin({
          method: `${user?.user?.email}`,
        });
      } else {
        Alert.alert('Enter the All Data');
      }
    } catch (err) {
      console.log(err.message);
      setMessage(err.message);
    }
  };
  // -------> this is for google
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '198750788807-f4ju5pvjn087it196g0dvmi10u9q21nr.apps.googleusercontent.com',
    });
  });

  const googleLogin = async () => {
    try {
      const google = await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userinfo = await auth().signInWithCredential(googleCredential);
      navigation.dispatch(StackActions.replace('Drawers'));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={{marginTop: hp(5)}}>
          <Text
            style={{
              fontSize: hp(5),
              fontVariant: ['small-caps'],
              textColor: '#000',
              alignSelf: 'center',
            }}>
            Login !
          </Text>
        </View>
        <View style={{alignSelf: 'center', marginTop: hp(10.5)}}>
          <Field
            placeholder="Email / username"
            value={email}
            onChangeText={value => setEmail(value)}
          />
          <Field
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={value => setPassword(value)}
          />
        </View>
        <View
          style={{
            alignSelf: 'flex-end',
            marginRight: hp(7),
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('mobileverification');
              // navigation.dispatch(StackActions.replace('mobileverification'));
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                fontVariant: ['small-caps'],
                color: 'rgb(100, 100, 100)',
              }}>
              Forget Pass ?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: hp(27)}}>
          <Btn
            bgColor="#000"
            textColor="#fff"
            btnLabel="Login"
            onPress={() => {
              handleLogin();
            }}
          />
        </View>
        <View style={styles.downView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                Create New Account?
              </Text>
              <Text style={styles.signupText}> Signup !</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.shortwayStyle}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={imageConstatnt.apple}
              style={{height: hp(5), width: hp(5)}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={imageConstatnt.facebook}
              style={{height: hp(5), width: hp(5)}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              googleLogin();
            }}>
            <Image
              source={imageConstatnt.google}
              style={{height: hp(5), width: hp(5)}}
            />
          </TouchableOpacity>
        </View>
        <Text>{message}</Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1ebea',
  },
  downView: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  signupText: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
    fontVariant: ['small-caps'],
  },
  shortwayStyle: {
    marginTop: hp(3),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: wp(60),
  },
});

export default Login;
