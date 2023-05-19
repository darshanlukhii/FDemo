import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

import {fontSize, hp, wp} from '../../helper/primaryConstant';
import {imageConstatnt} from '../../helper/imageConstatnt';
import {getUserData} from '../../Component/GetData';
import Header from '../../Component/Header';

const Favourite = () => {
  const isFocused = useIsFocused();

  const [userOldData, setUserOldData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getData();
      getUser();
    }
  }, [isFocused]);

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
          setData(() =>
            users.filter(snap => {
              return snap.PostBookMark.some(i => i == auth().currentUser.uid);
            }),
          );
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    const abc = userOldData?.Following?.some(c => {
      return c === item?.PostId;
    });
    const current = item?.PostId?.localeCompare(auth().currentUser.uid);
    const i = item?.PostBookMark.some(i => i == auth().currentUser.uid);
    const like = item?.PostLike.some(aaa => aaa == auth().currentUser.uid);
    return abc === true || current === 0 ? (
      <View style={{padding: 3}}>
        <View style={styles.mainStyle}>
          <View style={styles.userImage}>
            <Image
              source={{uri: item?.PostUserImageUrI}}
              style={styles.userIdImage}
            />
            <Text style={styles.userIdName}>{item?.PostName}</Text>
          </View>
          {item?.PostImg ? (
            item?.PostType === 'image/jpeg' ? (
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
            )
          ) : null}
          {!item?.Comment ? null : (
            <Text style={styles.dataCaptionTextStyle}>
              {JSON.parse(item?.Comment[0]).CommentText}
            </Text>
          )}
          <Text style={styles.postedTextStyle}>
            Posted on {moment(item?.PostTime.toDate()).fromNow()}
          </Text>
          <View style={styles.userLikeView}>
            <Image
              source={
                like == false ? imageConstatnt.like : imageConstatnt.likeHeart
              }
              style={styles.likeImageStyle}
            />
            <Text style={styles.likeNumberTextStyle}>
              {item?.PostLike.length}
            </Text>
            <Image
              source={imageConstatnt.message}
              style={styles.messageImageView}
            />
            <Text
              style={{
                ...styles.likeNumberTextStyle,
                marginLeft: wp(2.93),
              }}>
              {item.Comment.length}
            </Text>
            <Image
              source={
                i == false
                  ? imageConstatnt?.bookmark
                  : imageConstatnt?.bookmarkTab
              }
              style={styles.messageImageView}
            />
            <TouchableOpacity style={styles.barViewStyle} onPress={() => {}}>
              <Image source={imageConstatnt.bar} style={styles.barStyle} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{...styles.horiLine, marginTop: hp(0)}}></View>
      </View>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <Header text={'Favourite'} />
      {isLoading ? (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : data.length > 1 ? (
        <FlatList data={data} bounces={false} renderItem={renderItem} />
      ) : (
        <View style={styles.notDataStyle}>
          <Image source={imageConstatnt.backGround} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  userImage: {
    flexDirection: 'row',
    marginLeft: wp(4),
    marginVertical: hp(1),
    alignItems: 'center',
  },
  userIdName: {
    marginLeft: wp(3),
    fontSize: fontSize(18),
    fontWeight: '500',
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
  dataCaptionTextStyle: {
    marginTop: hp(1.97),
    marginLeft: wp(4),
    color: '#000',
    fontSize: fontSize(17),
    fontWeight: '400',
    width: wp(89.83),
  },
  imageViewStyle: {
    height: hp(24.5),
    width: wp(91.73),
    marginLeft: wp(4),
  },
  dataImageStyle: {
    borderRadius: hp(1.5),
    height: hp(24.5),
    width: wp(91.73),
  },
  postedTextStyle: {
    marginTop: hp(1.84),
    marginLeft: wp(4),
    color: '#000',
    fontSize: fontSize(14),
    fontWeight: '400',
    fontStyle: 'italic',
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
  horiLine: {
    marginTop: hp(1.23),
    backgroundColor: '#fff',
    height: hp(0.68),
  },
  notDataStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(8),
  },
  loaderStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Favourite;
