import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Header from '../../Component/Header';
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {fontSize, hp, wp} from '../../helper/primaryConstant';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getUserData} from '../../Component/GetData';
import ReactNativeModal from 'react-native-modal';
import ProfileComponent from '../../Component/ProfileComponent';
import {imageConstatnt} from '../../helper/imageConstatnt';
import messaging from '@react-native-firebase/messaging';
import remoteConfig from '@react-native-firebase/remote-config';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import {
  InterstitialAd,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const Profile = ({navigation}) => {
  const [userOldData, setUserOldData] = useState([]);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [followersData, setFollowersData] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [imageData, setImageData] = useState('');
  const [imgDownloadUrl, setImgDownloadUrl] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [isFollowingVisible, setFollowingVisible] = useState(false);
  const [isFollowersVisible, setFollowersVisible] = useState(false);
  const [isRequestVisible, setRequestVisible] = useState(false);
  const isFocused = useIsFocused();
  const {navigate} = useNavigation();
  const [buttonColorProfile, setButtonColorProfile] = useState();

  const ADS = TestIds.REWARDED;

  const rewarded = RewardedAd.createForAdRequest(ADS, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'mobile', 'clothing'],
  });

  useEffect(() => {
    if (isFocused) {
      getData();
      getUserAllData();
      Data();
      // getFCMToken();
      // notification();
      remote();
      // adEvent();
    }
  }, [isFocused]);

  const adEvent = () => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        rewarded.show();
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );
    // Start loading the rewarded ad straight away
    rewarded.load();
    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  };

  const getData = async () => {
    const get = await getUserData();
    setUserOldData(get._data);
  };

  const getUserAllData = () => {
    try {
      firestore()
        .collection('users')
        .onSnapshot(querySnapshot => {
          let user = [];
          querySnapshot.forEach(documentSnapshot => {
            user.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setData2(() =>
            user.filter(snap => {
              return snap?.id !== auth().currentUser.uid;
            }),
          );
          setFollowingData(() =>
            user.filter(snap => {
              if (snap.Followers)
                return snap.Followers.some(
                  aaa => aaa === auth().currentUser.uid,
                );
            }),
          );
          setFollowersData(() =>
            user.filter(snap => {
              if (snap.Following) {
                return snap.Following.some(
                  aaa => aaa === auth().currentUser.uid,
                );
              }
            }),
          );
          setRequestData(() =>
            user.filter(snap => {
              if (snap.Request)
                return snap.Request.some(aaa => aaa === auth().currentUser.uid);
            }),
          );
        });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const Data = () => {
    try {
      firestore()
        .collection('usersPost')
        .where('PostTime', '<=', new Date())
        .orderBy('PostTime', 'desc')
        .onSnapshot(querySnapshot => {
          let users = [];
          querySnapshot.forEach(documentSnapshot => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setData(() =>
            users.filter(snap => {
              return snap?.PostId === auth().currentUser.uid;
            }),
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  // const getUserData = async () => {
  //   try {
  //     await firestore()
  //       .collection('users')
  //       .doc(`${auth().currentUser.uid}`)
  //       .get()
  //       .then(res => {
  //         setUserOldData(res._data);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const pickImage = async action => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });
      setImageData(res);
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
        const url = await response.getDownloadURL();
        setImgDownloadUrl(url);
        return url;
      } catch (err) {
        console.log('err >---->', err);
      }
    }
  };

  const saveData = async () => {
    try {
      if (email || password) {
        await auth().currentUser.updateEmail(email);
        await auth().currentUser.updatePassword(password);
      }
      const imageUri = await uploadImage();
      let NAME, EMAIL, PASSWORD, URI;
      name ? (NAME = name) : (NAME = userOldData.name);
      email ? (EMAIL = email) : (EMAIL = userOldData.email);
      password ? (PASSWORD = password) : (PASSWORD = userOldData.password);
      imageData ? (URI = imageUri) : (URI = userOldData.uri);
      const userData = {
        name: NAME,
        email: EMAIL,
        password: PASSWORD,
        uri: URI,
      };
      await firestore()
        .collection('users')
        .doc(`${auth().currentUser.uid}`)
        .update(userData);
      if (email || password)
        Alert.alert('Please Login Again', navigate('Login'));
      else Alert.alert('Data Saved');
      setName('');
      setPassword('');
      setEmail('');
      setImageData('');
      setImgDownloadUrl('');
      getUserData();
    } catch (error) {
      console.log(error);
    }
  };

  const follow = item => {
    const currentUserId = auth().currentUser.uid;
    const itemRef = firestore().collection('users').doc(`${currentUserId}`);
    const ref = firestore().collection('users').doc(item?.id);
    let followBtnVisibility;
    if (item?.Request) {
      followBtnVisibility = item?.Request.some(aaa => aaa === userOldData.id);
    }
    try {
      if (followBtnVisibility) {
        ref.update({
          Following: firebase.firestore.FieldValue.arrayUnion(currentUserId),
        });
      }
      getData();
    } catch (error) {
      console.log(error);
    }
    try {
      if (followBtnVisibility) {
        itemRef.update({
          Followers: firebase.firestore.FieldValue.arrayUnion(item?.id),
        });
      }
      getData();
    } catch (error) {
      console.log(error);
    }
    try {
      if (followBtnVisibility) {
        ref.update({
          Request: firebase.firestore.FieldValue.arrayRemove(userOldData.id),
        });
      }
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const FollowingRemove = item => {
    const currentUserId = auth().currentUser.uid;
    const itemRef = firestore().collection('users').doc(`${currentUserId}`);
    const ref = firestore().collection('users').doc(item?.id);
    let followBtnVisibility;
    if (item?.Followers) {
      followBtnVisibility = item?.Followers.some(aaa => aaa === userOldData.id);
    }
    console.log(item?.id);
    try {
      if (followBtnVisibility) {
        itemRef.update({
          Following: firebase.firestore.FieldValue.arrayRemove(item?.id),
        });
      }
      getData();
    } catch (error) {
      console.log(error);
    }
    try {
      if (followBtnVisibility) {
        ref.update({
          Followers: firebase.firestore.FieldValue.arrayRemove(currentUserId),
        });
      }
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  // const follow = item => {
  //   const currentUserId = auth().currentUser.uid;
  //   const itemRef = firestore().collection('users').doc(`${currentUserId}`);
  //   const ref = firestore().collection('users').doc(item?.id);
  //   let followBtnVisibility;
  //   if (item?.Followers) {
  //     followBtnVisibility = item?.Followers.some(aaa => aaa === userOldData.id);
  //   }
  //   try {
  //     if (!followBtnVisibility) {
  //       itemRef.update({
  //         Following: firebase.firestore.FieldValue.arrayUnion(item?.id),
  //       });
  //     } else {
  //       itemRef.update({
  //         Following: firebase.firestore.FieldValue.arrayRemove(item?.id),
  //       });
  //     }
  //     getData();
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   try {
  //     if (!followBtnVisibility) {
  //       ref.update({
  //         Followers: firebase.firestore.FieldValue.arrayUnion(currentUserId),
  //       });
  //     } else {
  //       ref.update({
  //         Followers: firebase.firestore.FieldValue.arrayRemove(currentUserId),
  //       });
  //     }
  //     getData();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const request = item => {
    const currentUserId = auth().currentUser.uid;
    const itemRef = firestore().collection('users').doc(`${currentUserId}`);
    const ref = firestore().collection('users').doc(item?.id);
    let followBtnVisibility;
    if (userOldData?.Request) {
      followBtnVisibility = userOldData?.Request.some(aaa => aaa === item?.id);
    }
    try {
      if (!followBtnVisibility) {
        itemRef.update({
          Request: firebase.firestore.FieldValue.arrayUnion(item?.id),
        });
      } else {
        itemRef.update({
          Request: firebase.firestore.FieldValue.arrayRemove(item?.id),
        });
      }
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRequest = item => {
    const ref = firestore().collection('users').doc(item?.id);
    let followBtnVisibility;
    if (item?.Request) {
      followBtnVisibility = item?.Request.some(aaa => aaa === userOldData?.id);
    }
    try {
      if (followBtnVisibility) {
        ref.update({
          Request: firebase.firestore.FieldValue.arrayRemove(userOldData?.id),
        });
      }
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('tokentokentoken=============', token);
    } catch (e) {
      console.log(e);
    }
  };

  const notification = () => {
    messaging().onMessage(async remoteMessage => {
      console.log(
        'A new Message foreGround arrived!',
        JSON.stringify(remoteMessage),
      );
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state: ',
        JSON.stringify(remoteMessage),
      );
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
        }
      });
  };

  const remote = async () => {
    remoteConfig()
      .fetchAndActivate()
      .then(() => {
        remoteConfig()
          .fetch(3)
          .then(() => {
            firebase
              .remoteConfig()
              .activate()
              .then(activated => {
                const buttonColor = firebase
                  .remoteConfig()
                  .getValue('edit_profile')
                  .asBoolean();
                // console.log(`Button color ${userOldData.name}:`, buttonColor);
                setButtonColorProfile(buttonColor);
              });
          });
      });
    // await remoteConfig().setConfigSettings({
    //   minimumFetchIntervalMillis: 2000,
    // });
    // remoteConfig().setDefaults({
    //   edit_profile: true,
    // });
    // remoteConfig()
    //   .fetchAndActivate()
    //   .then(() => {
    //     remoteConfig().fetch(2);
    //   });
    // const buttonColor = firebase
    //   .remoteConfig()
    //   .getValue('edit_profile')
    //   .asBoolean();
    // console.log('Button color:', buttonColor);
    // setButtonColorProfile(buttonColor);
  };

  useEffect(() => {
    crashlytics().log('App mounted.');
    getUserDetails();
    return () => {
      crashlytics().log('App Just Unmounted.');
    };
  }, []);

  const getUserDetails = () => {
    try {
      crashlytics().setUserId('User Id');
      crashlytics().setAttributes({
        email: auth().currentUser.email,
        username: userOldData.name,
      });
    } catch (error) {
      console.log(error);
      crashlytics().recordError(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        text={'Profile'}
        isTrue={true}
        isNotification={true}
        source={imageConstatnt.userData}
        sourceNotification={imageConstatnt.notification}
        onPress={() => setVisible(!isVisible)}
        onPressNotification={() => {
          setRequestVisible(!isRequestVisible);
        }}
      />
      <View style={styles.profileStatus}>
        <Image source={{uri: userOldData.uri}} style={styles.userIdImage} />
        <ProfileComponent number={data.length} title="Posts" isTrue={true} />
        <ProfileComponent
          number={userOldData?.Followers ? userOldData?.Followers?.length : 0}
          title="Followers"
          onPress={async () => {
            setFollowersVisible(!isFollowersVisible);
            await analytics().logEvent(`${userOldData.name}`, {
              id: {
                user: `${auth().currentUser.uid}`,
                description: 'Followers Data',
              },
            });
            await analytics().logSelectContent({
              content_type: 'Followers Data',
            });
          }}
        />
        <ProfileComponent
          number={userOldData?.Following ? userOldData?.Following?.length : 0}
          title="Following"
          onPress={async () => {
            setFollowingVisible(!isFollowingVisible);
            await analytics().logEvent(`${userOldData.name}`, {
              id: {
                user: `${auth().currentUser.uid}`,
                description: 'Following Data',
              },
            });
            await analytics().logSelectContent({
              content_type: 'Following Data',
            });
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.editPictureView}
        onPress={() => {
          setModalVisible(!isModalVisible);
          // paymentData();
        }}>
        {/* <Text style={{...styles.editPicture}}> */}
        <Text
          style={[
            styles.editPicture,
            {color: buttonColorProfile ? 'red' : '#2F87EC'},
          ]}>
          Edit Profile
        </Text>
      </TouchableOpacity>
      <View style={styles.horizontalLine}></View>
      <Text style={styles.postsTextStyle}>Posts</Text>
      <View style={styles.horizontalLine}></View>
      {data?.length > 0 ? (
        <FlatList
          data={data}
          bounces={false}
          numColumns={3}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return item?.PostImg !== '' ? (
              <View style={styles.postImageView}>
                <Image
                  source={{uri: item?.PostImg}}
                  style={styles.postImageStyle}
                />
              </View>
            ) : null;
          }}
        />
      ) : null}
      <ReactNativeModal
        animationIn={'slideInUp'}
        animationInTiming={1000}
        isVisible={isModalVisible}
        backdropOpacity={0.8}
        style={{alignSelf: 'center', margin: 0}}
        onBackdropPress={() => {
          setModalVisible(!isModalVisible);
        }}>
        <SafeAreaView style={styles.commentModal}>
          {/* <Header text={'Edit Profile'} /> */}
          <TouchableOpacity
            style={styles.backButtonView}
            onPress={() => {
              setModalVisible(!isModalVisible);
            }}>
            <Text style={styles.backButtonTextStyle}>Back</Text>
          </TouchableOpacity>
          {!imageData ? (
            <Image source={{uri: userOldData.uri}} style={styles.userIdImage} />
          ) : (
            <Image source={{uri: imageData.uri}} style={styles.userIdImage} />
          )}
          <TouchableOpacity
            style={styles.editPictureView}
            onPress={() => {
              pickImage();
            }}>
            <Text style={styles.editPicture}>Edit picture</Text>
          </TouchableOpacity>
          <View style={styles.userNameView}>
            <Text style={styles.userNameText}>{userOldData.name}</Text>
          </View>
          <TextInput
            placeholder={userOldData.name}
            style={styles.nameTextStyle}
            value={name}
            autoCapitalize={false}
            autoCorrect={false}
            onChangeText={text => {
              setName(text);
            }}
          />
          <TextInput
            placeholder={userOldData.email}
            style={{...styles.nameTextStyle, marginTop: hp(5)}}
            autoCapitalize={false}
            autoCorrect={false}
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
          />
          <TextInput
            placeholder="Password"
            style={{...styles.nameTextStyle, marginTop: hp(5)}}
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
          />
          <TouchableOpacity
            style={styles.saveButtonView}
            onPress={() => {
              saveData();
            }}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ReactNativeModal>
      {/* --------------------------------------------------> Suggestion Modal <-------------------------------------------------- */}
      <ReactNativeModal
        animationIn={'slideInUp'}
        animationInTiming={1000}
        isVisible={isVisible}
        backdropOpacity={0.8}
        style={{alignSelf: 'center', margin: 0}}
        onBackdropPress={() => {
          setVisible(!isVisible);
        }}>
        <SafeAreaView style={styles.commentModal}>
          <TouchableOpacity
            style={styles.backButtonView}
            onPress={() => {
              setVisible(!isVisible);
            }}>
            <View style={styles.headerView}>
              <Text style={styles.backButtonTextStyle}>Back</Text>
              <Text style={styles.suggestionText}>Suggestion</Text>
            </View>
          </TouchableOpacity>
          <FlatList
            data={data2}
            bounces={false}
            renderItem={({item}) => {
              let followBtnVisibility;
              if (userOldData?.Request) {
                followBtnVisibility = userOldData?.Request.some(
                  aaa => aaa === item?.id,
                );
              }
              let show;
              if (userOldData?.Following) {
                show = userOldData?.Following.some(aaa => aaa === item?.id);
              }
              return (
                <View style={styles.userListView}>
                  <Image
                    source={{uri: item.uri}}
                    style={styles.dataImageStyle}
                  />
                  <View style={{flex: 1}}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text
                      style={styles.description}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      Suggestion to follow {item.name}{' '}
                    </Text>
                  </View>
                  {show === true ? (
                    <TouchableOpacity
                      style={{
                        ...styles.followButton,
                        backgroundColor: '#d9dadb',
                      }}
                      onPress={() => {
                        FollowingRemove(item);
                      }}>
                      <Text
                        style={{
                          color: 'black',
                        }}>
                        Following
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        ...styles.followButton,
                        backgroundColor:
                          followBtnVisibility === true ? '#d9dadb' : '#3497FE',
                      }}
                      onPress={() => {
                        request(item);
                      }}>
                      <Text
                        style={{
                          color:
                            followBtnVisibility === true ? 'black' : 'white',
                        }}>
                        {followBtnVisibility === true ? 'Request' : 'Follow'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
          />
        </SafeAreaView>
      </ReactNativeModal>
      {/* --------------------------------------------------> Request Modal <-------------------------------------------------- */}
      <ReactNativeModal
        animationIn={'slideInUp'}
        animationInTiming={1000}
        isVisible={isRequestVisible}
        backdropOpacity={0.8}
        style={{alignSelf: 'center', margin: 0}}
        onBackdropPress={() => {
          setRequestVisible(!isRequestVisible);
        }}>
        <SafeAreaView style={styles.commentModal}>
          <TouchableOpacity
            style={styles.backButtonView}
            onPress={() => {
              setRequestVisible(!isRequestVisible);
            }}>
            <View style={styles.headerView}>
              <Text style={styles.backButtonTextStyle}>Back</Text>
              <Text style={styles.suggestionText}>Request</Text>
            </View>
          </TouchableOpacity>
          <FlatList
            data={requestData}
            bounces={false}
            renderItem={({item}) => {
              return (
                <View style={styles.userListView}>
                  <Image
                    source={{uri: item.uri}}
                    style={styles.dataImageStyle}
                  />
                  <View style={{flex: 1}}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text
                      style={styles.description}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      Request From {item.name}{' '}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      ...styles.followButton,
                      backgroundColor: '#3497FE',
                      width: wp(20),
                    }}
                    onPress={() => {
                      follow(item);
                    }}>
                    <Text style={{color: 'white'}}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      ...styles.followButton,
                      backgroundColor: '#d9dadb',
                      width: wp(20),
                    }}
                    onPress={() => {
                      deleteRequest(item);
                    }}>
                    <Text style={{color: 'black'}}>Delete</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </SafeAreaView>
      </ReactNativeModal>
      {/* --------------------------------------------------> Following Modal <-------------------------------------------------- */}
      <ReactNativeModal
        animationIn={'slideInUp'}
        animationInTiming={1000}
        isVisible={isFollowingVisible}
        backdropOpacity={0.8}
        style={{alignSelf: 'center', margin: 0}}
        onBackdropPress={() => {
          setFollowingVisible(!isFollowingVisible);
        }}>
        <SafeAreaView style={styles.commentModal}>
          <TouchableOpacity
            style={styles.backButtonView}
            onPress={() => {
              setFollowingVisible(!isFollowingVisible);
            }}>
            <View style={styles.headerView}>
              <Text style={styles.backButtonTextStyle}>Back</Text>
              <Text style={styles.suggestionText}>Following</Text>
            </View>
          </TouchableOpacity>
          <FlatList
            data={followingData}
            bounces={false}
            renderItem={({item}) => {
              return item.Followers ? (
                <View style={styles.userListView}>
                  <Image
                    source={{uri: item.uri}}
                    style={styles.dataImageStyle}
                  />
                  <View style={{flex: 1}}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text
                      style={styles.description}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      following {item.name}{' '}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      ...styles.followButton,
                      backgroundColor: '#d9dadb',
                    }}
                    onPress={() => {}}>
                    <Text
                      style={{
                        color: 'black',
                      }}>
                      {'Following'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null;
            }}
          />
        </SafeAreaView>
      </ReactNativeModal>
      {/* --------------------------------------------------> Followers Modal <-------------------------------------------------- */}
      <ReactNativeModal
        animationIn={'slideInUp'}
        animationInTiming={1000}
        isVisible={isFollowersVisible}
        backdropOpacity={0.8}
        style={{alignSelf: 'center', margin: 0}}
        onBackdropPress={() => {
          setFollowersVisible(!isFollowersVisible);
        }}>
        <SafeAreaView style={styles.commentModal}>
          <TouchableOpacity
            style={styles.backButtonView}
            onPress={() => {
              setFollowersVisible(!isFollowersVisible);
            }}>
            <View style={styles.headerView}>
              <Text style={styles.backButtonTextStyle}>Back</Text>
              <Text style={styles.suggestionText}>Followers</Text>
            </View>
          </TouchableOpacity>
          <FlatList
            data={followersData}
            bounces={false}
            renderItem={({item}) => {
              let visibility;
              if (item?.Following) {
                // visibility = item?.Followers?.filter(a => {});
              }
              // console.log('-------', abc);
              return item?.Following ? (
                <View style={styles.userListView}>
                  <Image
                    source={{uri: item.uri}}
                    style={styles.dataImageStyle}
                  />
                  <View style={{flex: 1}}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text
                      style={styles.description}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      following {item.name}{' '}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      ...styles.followButton,
                      backgroundColor: visibility ? '#d9dadb' : '#3497FE',
                    }}
                    onPress={() => {}}>
                    <Text
                      style={{
                        color: visibility ? 'black' : 'white',
                      }}>
                      {visibility ? 'Following' : 'Follow'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null;
            }}
          />
        </SafeAreaView>
      </ReactNativeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileStatus: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: hp(1),
  },
  userIdImage: {
    height: hp(10),
    width: hp(10),
    borderRadius: hp(5),
    borderWidth: 0.5,
    alignSelf: 'center',
  },
  userNameView: {
    borderWidth: 0.5,
    height: hp(5),
    width: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(4),
    alignSelf: 'center',
    borderRadius: hp(2),
    backgroundColor: '#00ffff',
    shadowOffset: {width: 6, height: 4},
    shadowColor: '#0000',
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  userNameText: {
    fontSize: fontSize(17),
    fontWeight: '600',
    color: '#003333',
  },
  editPictureView: {
    alignSelf: 'center',
    marginTop: hp(1),
  },
  editPicture: {
    fontSize: fontSize(17),
    color: '#2F87EC',
    fontWeight: '600',
  },
  nameTextStyle: {
    marginTop: hp(5),
    paddingLeft: wp(2),
    marginHorizontal: wp(5),
    width: wp(90),
    height: hp(5),
    borderBottomWidth: 1.5,
    borderColor: 'gray',
  },
  saveButtonView: {
    marginTop: hp(20),
    height: hp(6),
    width: wp(60),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#7d5fff',
    borderRadius: hp(2.5),
  },
  saveButton: {
    fontSize: fontSize(25),
    fontWeight: '700',
    color: 'white',
  },
  commentModal: {
    height: hp(100),
    width: wp(100),
    backgroundColor: 'white',
    borderRadius: hp(3),
  },
  backButtonView: {
    marginLeft: wp(3),
    marginTop: hp(2),
  },
  backButtonTextStyle: {
    fontSize: fontSize(20),
    fontWeight: '600',
    position: 'absolute',
    left: 0,
  },
  horizontalLine: {
    borderWidth: 0.5,
    marginHorizontal: wp(3),
    marginTop: hp(1.5),
  },
  postsTextStyle: {
    marginTop: hp(1.5),
    marginLeft: wp(6),
    fontSize: fontSize(20),
    fontWeight: '700',
    fontVariant: ['small-caps'],
  },
  postImageView: {
    marginTop: hp(3),
    marginLeft: wp(7),
  },
  postImageStyle: {
    borderRadius: hp(1.5),
    height: hp(11),
    width: hp(11),
    resizeMode: 'contain',
  },
  dataImageStyle: {
    height: hp(7),
    width: hp(7),
    borderRadius: hp(5),
    borderWidth: 1,
  },
  userListView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    marginHorizontal: wp(3),
  },
  userName: {
    marginLeft: wp(3),
    fontWeight: '600',
  },
  description: {
    marginTop: wp(2),
    marginLeft: wp(2),
    paddingRight: wp(2),
  },
  followButton: {
    width: wp(25),
    height: hp(3.5),
    borderRadius: hp(0.7),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(2),
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionText: {
    fontWeight: '700',
    fontSize: fontSize(23),
  },
});

export default Profile;
