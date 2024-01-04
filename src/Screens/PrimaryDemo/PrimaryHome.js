import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {
  TestIds,
  BannerAd,
  AdEventType,
  BannerAdSize,
  InterstitialAd,
} from 'react-native-google-mobile-ads';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import storage from '@react-native-firebase/storage';
import ReactNativeModal from 'react-native-modal';
import auth from '@react-native-firebase/auth';
import WebView from 'react-native-webview';
import moment from 'moment';

import {getDataBase, getUserData} from '../../Component/GetData';
import {fontSize, hp, wp} from '../../helper/primaryConstant';
import {imageConstant} from '../../helper/imageConstant';
import Header from '../../Component/Header';

const PrimaryHome = ({navigation}) => {
  const {navigate} = useNavigation();
  const isFocused = useIsFocused();

  const [isModalVisible, setModalVisible] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [userOldData, setUserOldData] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const ADS = TestIds.INTERSTITIAL;

  const interstitial = InterstitialAd.createForAdRequest(ADS, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'mobile', 'clothing'],
  });

  useEffect(() => {
    if (isFocused) {
      getData();
      getUser();
      askForPermissions();
      // adEvent();
    }
  }, [isFocused]);

  const adEvent = () => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      },
    );
    // Start loading the interstitial straight away
    interstitial.load();
    // Unsubscribe from events on unmount
    return unsubscribe;
  };

  const askForPermissions = () => {
    requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.CONTACTS]).then(
      statuses => {
        // console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
        // console.log('CONTACTS', statuses[PERMISSIONS.IOS.CONTACTS]);
      },
    );

    // request(PERMISSIONS.IOS.MEDIA_LIBRARY).then(result => {
    //   console.log(result);
    // });
  };

  const getUser = async () => {
    const get = await getUserData();
    setUserOldData(get._data);
  };

  const getData = () => {
    setIsLoading(true);
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
          setData(users);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const likeNumber = item => {
    const itemRef = firestore().collection('usersPost').doc(`${item?.docID}`);
    const Like = item?.PostLike.some(aaa => aaa == auth().currentUser.uid);
    try {
      if (!Like) {
        itemRef.update({
          PostLike: firebase.firestore.FieldValue.arrayUnion(
            auth().currentUser.uid,
          ),
        });
      } else {
        itemRef.update({
          PostLike: firebase.firestore.FieldValue.arrayRemove(
            auth().currentUser.uid,
          ),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bookmark = item => {
    const itemRef = firestore().collection('usersPost').doc(`${item?.docID}`);
    const bookMark = item?.PostBookMark.some(i => i == auth().currentUser.uid);
    try {
      if (!bookMark) {
        itemRef.update({
          PostBookMark: firebase.firestore.FieldValue.arrayUnion(
            auth().currentUser.uid,
          ),
        });
      } else {
        itemRef.update({
          PostBookMark: firebase.firestore.FieldValue.arrayRemove(
            auth().currentUser.uid,
          ),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const commentPost = docID => {
    try {
      if (commentText < 1 || commentText == '') {
        alert('Please enter comment');
      } else {
        const itemRef = firestore().collection('usersPost').doc(`${docID}`);
        const userData = {
          image: userOldData.uri,
          PostName: userOldData.name,
          CommentText: commentText,
        };
        itemRef
          .update({
            Comment: firebase.firestore.FieldValue.arrayUnion(
              JSON.stringify(userData),
            ),
          })
          .then(() => {
            getData();
          });
        setCommentText('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = key => {
    const itemRef = firestore().collection('usersPost').doc(`${key}`).delete();
  };

  const renderItem = ({item}) => {
    const abc = userOldData?.Following?.some(c => {
      return c === item?.PostId;
    });
    const current = item?.PostId?.localeCompare(auth().currentUser.uid);
    const i = item?.PostBookMark.some(i => i == auth().currentUser.uid);
    const like = item?.PostLike.some(aaa => aaa == auth().currentUser.uid);
    return abc === true || current === 0 ? (
      <View style={styles.view}>
        <View style={styles.mainStyle}>
          <View style={styles.userImage}>
            <Image
              source={{uri: item?.PostUserImageUrI}}
              style={styles.userIdImage}
            />
            <Text style={styles.userIdName}>{item?.PostName}</Text>
          </View>
          {item?.PostImg && item?.PostType === 'image/jpeg' ? (
            <View style={styles.imageViewStyle}>
              <Image
                style={styles.dataImageStyle}
                source={{uri: item?.PostImg}}
              />
            </View>
          ) : (
            <View style={styles.imageViewStyle}>
              <VideoPlayer
                video={{uri: item?.PostImg}}
                style={styles.dataImageStyle}
              />
            </View>
          )}
          {item?.Comment && (
            <Text style={styles.dataCaptionTextStyle}>
              {JSON.parse(item?.Comment[0]).CommentText}
            </Text>
          )}
          <Text style={styles.postedTextStyle}>
            Posted on {moment(item?.PostTime.toDate()).fromNow()}
          </Text>
          <View style={styles.userLikeView}>
            <TouchableOpacity
              onPress={async () => {
                likeNumber(item);
                await analytics().logEvent(`${item?.PostName}`, {
                  id: {
                    user: `${auth().currentUser.uid}`,
                    description: `Post Like ${item?.PostName}`,
                  },
                });
              }}>
              <Image
                source={
                  like == false ? imageConstant.like : imageConstant.likeHeart
                }
                style={styles.likeImageStyle}
              />
            </TouchableOpacity>
            <Text style={styles.likeNumberTextStyle}>
              {item?.PostLike.length}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setCommentData(item);
                setModalVisible(!isModalVisible);
              }}>
              <Image
                source={imageConstant.message}
                style={styles.messageImageView}
              />
            </TouchableOpacity>
            <Text
              style={{
                ...styles.likeNumberTextStyle,
                marginLeft: wp(2.93),
              }}>
              {item.Comment.length}
            </Text>
            <TouchableOpacity
              onPress={() => {
                bookmark(item);
              }}>
              <Image
                source={
                  i == false
                    ? imageConstant?.bookmark
                    : imageConstant?.bookmarkTab
                }
                style={styles.messageImageView}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.barViewStyle}
              onPress={() => {
                deleteData(item.key);
              }}>
              <Image source={imageConstant.bar} style={styles.barStyle} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ) : null;
  };

  const modalRenderItem = ({item}) => {
    return (
      <View style={[styles.modalViewColor, styles.shadowProp]}>
        <View style={styles.userImage}>
          <Image
            source={{uri: JSON.parse(item).image}}
            style={styles.userIdImage}
          />
          <View style={{marginLeft: wp(3), maxWidth: wp(70)}}>
            <Text style={styles.commentUserName}>
              {JSON.parse(item).PostName}
            </Text>
            <Text style={styles.commentTextStyle}>
              {JSON.parse(item).CommentText}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        text={'Home'}
        isTrue={true}
        source={imageConstant.messages}
        onPress={() => {
          const uri = 'https://www.finology.in/';
          navigation.navigate('WebView_1', uri);
        }}
      />
      {isLoading ? (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={data => data.key}
          bounces={false}
          renderItem={renderItem}
        />
      )}
      <ReactNativeModal
        animationIn={'slideInRight'}
        isVisible={isModalVisible}
        backdropOpacity={0.8}
        style={{alignSelf: 'center', margin: 0}}
        onBackdropPress={() => {
          setModalVisible(!isModalVisible);
        }}>
        <SafeAreaView style={styles.commentModal}>
          <TouchableOpacity
            style={styles.backButtonView}
            onPress={() => {
              setModalVisible(!isModalVisible);
            }}>
            <Text style={styles.backButtonTextStyle}>Back</Text>
          </TouchableOpacity>
          <FlatList
            data={commentData?.Comment}
            bounces={false}
            renderItem={modalRenderItem}
          />
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.textInputImage}
              source={{uri: userOldData.uri}}
            />
            <TextInput
              style={styles.textInputStyle}
              multiline={true}
              numberOfLines={1}
              placeholder={`Add a comment for `}
              placeholderTextColor={'black'}
              value={commentText}
              onChangeText={text => setCommentText(text)}
            />
            <TouchableOpacity
              style={styles.postButtonView}
              onPress={() => {
                commentPost(commentData?.docID, commentText);
              }}>
              <Text style={styles.postButton}>Post</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ReactNativeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    padding: wp(1),
    marginTop: hp(1),
    shadowOffset: {width: 6, height: 5},
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  mainStyle: {
    backgroundColor: '#B0D8DB',
    borderWidth: 1,
    borderRadius: hp(2),
  },
  userIdImage: {
    height: hp(4.5),
    width: hp(4.5),
    borderRadius: hp(5),
  },
  userIdName: {
    marginLeft: wp(3),
    fontSize: fontSize(18),
    fontWeight: '500',
  },
  userImage: {
    flexDirection: 'row',
    marginLeft: wp(4),
    marginVertical: hp(1),
    alignItems: 'center',
  },
  imageViewStyle: {
    height: hp(24.5),
    width: wp(90),
    marginLeft: wp(4),
    borderRadius: hp(1.5),
  },
  dataImageStyle: {
    borderRadius: hp(1.5),
    height: hp(24.5),
    width: wp(90),
    overflow: 'hidden',
  },
  dataCaptionTextStyle: {
    marginTop: hp(1.97),
    marginLeft: wp(4),
    color: '#000',
    fontSize: fontSize(17),
    fontWeight: '400',
    width: wp(89.83),
  },
  postedTextStyle: {
    marginTop: hp(1.84),
    marginLeft: wp(4),
    color: '#000',
    fontSize: fontSize(14),
    fontWeight: '400',
    fontStyle: 'italic',
  },
  lineStyle: {
    width: wp(100),
    borderWidth: 0.5,
  },
  userLikeView: {
    flex: 1,
    flexDirection: 'row',
    height: hp(6.15),
    alignItems: 'center',
  },
  likeImageStyle: {
    marginLeft: wp(7.94),
    height: hp(1.51),
    width: wp(3.84),
  },
  likeNumberTextStyle: {
    marginLeft: hp(2.08),
    fontSize: fontSize(14),
    fontWeight: '400',
    color: '#000',
  },
  messageImageView: {
    height: hp(1.97),
    width: wp(4.53),
    tintColor: '#000',
    marginLeft: wp(5.93),
  },
  barViewStyle: {
    flex: 1,
    marginRight: wp(5.43),
  },
  barStyle: {
    alignSelf: 'flex-end',
    tintColor: 'black',
  },
  horiLine: {
    marginTop: hp(1.23),
    backgroundColor: '#fff',
    height: hp(0.68),
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
  },
  textInputImage: {
    height: hp(4.5),
    width: hp(4.5),
    borderRadius: hp(5),
    marginLeft: wp(3),
    alignSelf: 'flex-end',
  },
  textInputStyle: {
    flex: 1,
    marginLeft: wp(3),
    paddingLeft: wp(3),
    paddingTop: hp(1.5),
  },
  postButtonView: {
    marginRight: wp(3),
    marginLeft: wp(3),
    alignSelf: 'flex-end',
    marginBottom: hp(0.5),
  },
  postButton: {
    fontSize: fontSize(20),
    fontWeight: '600',
    color: 'blue',
  },
  commentTextStyle: {
    marginLeft: wp(1),
    fontSize: fontSize(20),
    marginTop: hp(1),
  },
  commentUserImage: {
    height: hp(4.5),
    width: hp(4.5),
    borderRadius: hp(5),
    backgroundColor: 'red',
  },
  commentUserName: {
    fontSize: fontSize(14),
    fontWeight: '500',
  },
  shadowProp: {
    shadowOffset: {width: 6, height: 6},
    shadowColor: '#475252',
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalViewColor: {
    backgroundColor: '#B0D8DB',
    borderWidth: 1,
    borderRadius: hp(2),
    marginHorizontal: wp(3),
    marginTop: hp(3),
  },
});

export default PrimaryHome;
