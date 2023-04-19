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
import firestore from '@react-native-firebase/firestore';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {imageConstatnt} from '../helper/imageConstatnt';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [message, setMessage] = useState('');
  const [imageData, setImageData] = useState('');
  const [imgDownloadUrl, setImgDownloadUrl] = useState('');

  //------> For Get(Find) a data by firebase - firestore<-------- //
  // useEffect(() => {
  //   const abc = firestore()
  //     .collection('comstas')
  //     .doc('3QRZuh8gQPvGrl5iYwIE')
  //     .get()

  //     .then(documentSnapshot => {
  //       console.log('User Exits: ', documentSnapshot.exists);
  //       if (documentSnapshot.exists) {
  //         console.log('User Data: ', documentSnapshot.data());
  //       }
  //     });
  // }, []);

  const pickImage = async action => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });
      setImageData(res);
      console.log('---------->', res);
      Alert.alert('Image Selected Successfully');
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    if (imageData.uri < 0) return Alert.alert('Enter the All Data');
    else {
      try {
        const response = storage().ref(`/PrimaryData/${imageData.name}`);
        const put = await response.putFile(imageData.fileCopyUri);
        console.log(put);
        const url = await response.getDownloadURL();
        setImgDownloadUrl(url);
        return url;
      } catch (err) {
        console.log('err >---->', err);
      }
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

  const handleSignup = async () => {
    // -----> this is for email verification  ------> //

    // try {
    // if (email.length > 0 && password.length > 0) {
    //   const isUserCreated = await auth().createUserWithEmailAndPassword(
    //     email,
    //     password,
    //   );
    // console.log(isUserCreated);

    // -----> this is for email verification by link  ------> //

    // await auth().currentUser.sendEmailVerification();
    // await auth().signOut();
    // alert('Please Verify your Email check Out Link in Your inbox');

    // navigation.navigate('Login');
    //   } else {
    //     Alert.alert('Enter the All Data');
    //   }
    // } catch (err) {
    //   console.log(err.message);
    //   setMessage(err.message);
    // }

    //-----> this is for fireStore in firebase -----> //

    try {
      if (
        email.length > 0 &&
        password.length > 0 &&
        name.length > 0 &&
        imageData
      ) {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        console.log(response);
        const imageUrl = await uploadImage();
        let uri;
        const userData = {
          id: response.user.uid,
          name: name,
          email: email,
          password: password,
          uri: imageUrl,
          // Following: [],
          // Followers: [],
        };
        console.log(userData);

        await firestore()
          .collection('users')
          .doc(response.user.uid)
          .set(userData);

        // -----> this is for email verification by link  ------>
        // await auth().currentUser.sendEmailVerification();
        // await auth().signOut();
        // alert('Please Verify your Email check Out Link in Your inbox');
        Alert.alert('Account Is Created ...');
        navigation.navigate('Login');
      } else {
        Alert.alert('Enter the All Data');
      }
    } catch (err) {
      console.log(err.message);
      setMessage(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <Text style={styles.signupTextStyle}>Signup !</Text>
        <TouchableOpacity
          onPress={() => {
            pickImage();
          }}
          style={{
            ...styles.headerImage,
            backgroundColor: imageData ? 'white' : '#e1ebea',
          }}>
          {imageData ? (
            <Image
              source={{uri: imageData.uri}}
              style={{height: hp(10), width: hp(10), borderRadius: hp(5)}}
            />
          ) : (
            <Image
              source={imageConstatnt.addimage}
              style={{height: hp(9), width: hp(9), tintColor: '#737070'}}
            />
          )}
        </TouchableOpacity>
        <View style={{alignSelf: 'center', marginTop: hp(4)}}>
          <Field
            placeholder="Enter Your name ..."
            value={name}
            onChangeText={value => setName(value)}
          />
          <Field
            placeholder="Enter Email ..."
            value={email}
            onChangeText={value => setEmail(value)}
            autoCorrect={false}
          />
          <Field
            placeholder="Enter Password ..."
            value={password}
            onChangeText={value => setPassowrd(value)}
          />
        </View>

        <View style={{marginTop: hp(14.5), alignSelf: 'center'}}>
          <Btn
            bgColor="#000"
            textColor="#fff"
            btnLabel="Sign up"
            onPress={() => {
              handleSignup();
            }}
          />
        </View>
        <View style={styles.alreadyView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                Already have an account?
              </Text>
              <Text style={styles.loginText}> Login !</Text>
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
    // alignItems: 'center',
    // marginTop: hp(13),
    backgroundColor: '#e1ebea',
  },
  headerImage: {
    backgroundColor: 'pink',
    height: hp(10),
    width: hp(10),
    alignSelf: 'center',
    marginTop: hp(5),
    borderRadius: hp(5),
  },
  textInput: {
    borderRadius: 100,
    height: '7%',
    width: '78%',
    backgroundColor: 'rgb(220, 220, 220)',
    paddingHorizontal: '3%',
    marginVertical: '3%',
  },
  alreadyView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 14,
    fontVariant: ['small-caps'],
  },
  shortwayStyle: {
    marginTop: hp(3),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: wp(60),
    // borderWidth: 1,
  },
  signupTextStyle: {
    fontSize: hp(5),
    fontVariant: ['small-caps'],
    textColor: '#000',
    marginTop: hp(3),
    alignSelf: 'center',
  },
});

export default Signup;
