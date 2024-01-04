import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import VideoPlayer from 'react-native-video-player';
import {fontSize, hp, wp} from '../helper/primaryConstant';
import {imageConstant} from '../helper/imageConstant';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useIsFocused} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const FirebaseDemo = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [caption, setCaption] = useState('');
  const [imageVideoData, setImageVideoData] = useState('');
  const [imgDownloadUrl, setImgDownloadUrl] = useState('');
  const [users, setUsers] = useState([]);
  const [d, setD] = useState(false);
  const isFocused = useIsFocused();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getDataBase();
  }, [isFocused, d]);

  const pickImage = async action => {
    try {
      let docType;
      if (action === 'Images') docType = DocumentPicker.types.images;
      else if (action === 'Video') docType = DocumentPicker.types.video;
      const res = await DocumentPicker.pickSingle({
        type: docType,
        copyTo: 'cachesDirectory',
      });
      setImageVideoData(res);
      Alert.alert('Image Selected Successfully');
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    if (!imageVideoData.uri) return null;
    else {
      try {
        const response = storage().ref(`/profile/${imageVideoData.name}`);
        const put = await response.putFile(imageVideoData.fileCopyUri);
        console.log(put);
        const url = await response.getDownloadURL();
        setImgDownloadUrl(url);
        return url;
      } catch (err) {
        console.log('err >---->', err);
      }
    }
  };

  const setFireStoreData = async () => {
    // uploadImage()
    setD(!d);
    const imageUrl = await uploadImage();
    let URI, CAPTION, TYPE;
    imageVideoData
      ? ((URI = imageUrl), (CAPTION = caption), (TYPE = imageVideoData.type))
      : ((URI = ''), (CAPTION = caption), (TYPE = ''));
    const userData = {
      Comment: CAPTION,
      PostImg: URI,
      PostType: TYPE,
      PostTime: firestore.Timestamp.fromDate(new Date()),
      PostLike: 0,
      PostLikeVisibilty: false,
    };
    await firestore()
      .collection(`${auth().currentUser.email}`)
      .add(userData)
      .then(() => {
        Alert.alert('Post Published');
      });
    setModalVisible(!isModalVisible);
    setCaption('');
    setImageVideoData('');
    setImgDownloadUrl('');
    getDataBase();
  };

  const getDataBase = async () => {
    try {
      await firestore()
        .collection(`${auth().currentUser.email}`)
        .where('PostTime', '<=', new Date())
        .orderBy('PostTime', 'desc')
        .get()
        .then(querySnapshot => {
          const users = [];
          querySnapshot.forEach(documentSnapshot => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setUsers(users);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const editLike = async (key, like, likesVisibilty) => {
    try {
      setD(!d);
      firestore()
        .collection(`${auth().currentUser.email}`)
        .doc(`${key}`)
        .update({
          PostLike: like + 1,
          PostLikeVisibilty: (likesVisibilty = true),
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async key => {
    try {
      firestore()
        .collection(`${auth().currentUser.email}`)
        .doc(`${key}`)
        .delete()
        .then(() => {
          console.log('User deleted!');
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView bounces={false} style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.mainView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.imageDotStyle} source={imageConstant.back} />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>Arnab’s Gym Feed</Text>
      </View>
      <View>
        <View style={styles.primaryTextInputModal}>
          <View style={styles.idImageStyle}>
            <Image source={imageConstant.idPic} />
          </View>
          <TouchableOpacity
            style={styles.inputModalStyle}
            onPress={toggleModal}>
            <Text style={styles.whatsTextStyle}>What's going on today?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsMainView}>
          <TouchableOpacity style={styles.addImageView} onPress={() => {}}>
            <Image source={imageConstant.image} style={styles.addImageStyle} />
            <Text style={styles.addImageTextStyle}>Add Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addImageView} onPress={() => {}}>
            <Image source={imageConstant.video} style={styles.addImageStyle} />
            <Text style={styles.addImageTextStyle}>Add Video</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.horiLine}></View>
      </View>
      <View style={styles.secondPrimaryView}>
        <Text style={styles.yourpostsTextStyle}>Your Posts</Text>
        <View style={styles.threeButton}>
          <TouchableOpacity>
            <View
              style={{
                ...styles.buttonStyle,
                backgroundColor: 'rgba(33, 210, 161, 1)',
              }}>
              <Text style={{...styles.buttonTextStyle, color: 'black'}}>
                All post
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              navigation.navigate('ApiCalling');
            }}>
            <Text style={styles.buttonTextStyle}>Photos </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Video </Text>
          </TouchableOpacity>
        </View>
        {/* --------------------------------------------------------------------------> FlatList ................................................................. */}
        <FlatList
          data={users}
          bounces={false}
          scrollEnabled={false}
          style={styles.mainData}
          renderItem={({item}) => {
            return (
              <View>
                <View>
                  <Image
                    source={item.PostImg}
                    style={{height: hp(10), width: hp(10)}}
                  />
                </View>
                <View
                  style={{
                    // backgroundColor: 'pink',
                    marginTop: hp(-8),
                  }}>
                  {item.PostImg ? (
                    item.PostType === 'image/jpeg' ? (
                      <View style={styles.imageViewStyle}>
                        <Image
                          style={styles.dataImageStyle}
                          source={{uri: item.PostImg}}
                        />
                      </View>
                    ) : (
                      <View style={styles.imageViewStyle}>
                        <VideoPlayer
                          video={{uri: item.PostImg}}
                          style={styles.dataImageStyle}
                        />
                      </View>
                    )
                  ) : null}
                  {!item.Comment ? null : (
                    <Text style={styles.dataCapionTextStyle}>
                      {item.Comment}
                    </Text>
                  )}
                  <Text style={styles.postedTextStyle}>
                    Posted on {moment(item.PostTime.toDate()).fromNow()}
                    {/* Posted on {moment(item.PostTime).format('hh:mm')} */}
                  </Text>
                  <View style={styles.lineStyle} numberOfLines={1}></View>
                  <View style={styles.userLikeView}>
                    {!item.PostLikeVisibilty ? (
                      <TouchableOpacity
                        onPress={() => {
                          editLike(
                            item.key,
                            item.PostLike,
                            item.PostLikeVisibilty,
                          );
                          setD(!d);
                        }}>
                        <Image
                          source={imageConstant.like}
                          style={styles.likeImageStyle}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          editLike(
                            item.key,
                            item.PostLike,
                            item.PostLikeVisibilty,
                          );
                        }}>
                        <Image
                          source={imageConstant.likeHeart}
                          style={styles.likeImageStyle}
                        />
                      </TouchableOpacity>
                    )}
                    <Text style={styles.likeNumberTextStyle}>
                      {item.PostLike}
                    </Text>
                    <TouchableOpacity>
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
                      41
                    </Text>
                    <TouchableOpacity
                      style={styles.barViewStyle}
                      onPress={() => {
                        deleteData(item.key);
                        setD(!d);
                      }}>
                      <Image
                        source={imageConstant.bar}
                        style={styles.barStyle}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{...styles.horiLine, marginTop: hp(0)}}></View>
                </View>
              </View>
            );
          }}
        />
      </View>
      {/* --------------------------------------------------------------------------> Modal  ................................................................. */}
      <ReactNativeModal
        animationIn={'slideInUp'}
        animationInTiming={1200}
        isVisible={isModalVisible}
        backdropOpacity={0.8}
        style={{alignSelf: 'center', margin: 0}}
        onBackdropPress={toggleModal}>
        <View style={styles.primaryModalView}>
          <View style={styles.cancleButtonView}>
            <TouchableOpacity onPress={toggleModal}>
              <Image
                source={imageConstant.cancle}
                style={styles.cancleButton}
              />
            </TouchableOpacity>
            <Text style={styles.creatPostTextStyle}>Create post</Text>
            <TextInput
              style={styles.textInputModalView}
              multiline={true}
              placeholder="Whats going on today?"
              placeholderTextColor={'rgba(72, 81, 82, 1)'}
              value={caption}
              onChangeText={text => setCaption(text)}
            />
            <Text style={styles.addToTextStyle}>Add to your post</Text>
            <View style={styles.buttonsMainView}>
              <TouchableOpacity
                style={{
                  ...styles.addImageView,
                  width: wp(38),
                  marginLeft: wp(3.2),
                }}
                onPress={() => {
                  pickImage('Images');
                  setD(!d);
                }}>
                <Image
                  source={imageConstant.image}
                  style={styles.addImageStyle}
                />
                <Text style={styles.addImageTextStyle}>Add Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{...styles.addImageView, width: wp(38)}}
                onPress={() => {
                  pickImage('Video');
                  setD(!d);
                }}>
                <Image
                  source={imageConstant.video}
                  style={styles.addImageStyle}
                />
                <Text style={styles.addImageTextStyle}>Add Video</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.bottomTextInputStyle}
              placeholder="Title of Image/ Video (optional)"
              placeholderTextColor="#485152"
            />
            {imageVideoData === '' ? null : (
              <View>
                <Text style={styles.uploadImageStyle}>
                  Uploaded images / video
                </Text>
                <TouchableOpacity
                  style={styles.crossDesign}
                  onPress={() => {
                    setImageVideoData('');
                  }}>
                  <Image source={imageConstant.cross} />
                </TouchableOpacity>
                {imageVideoData === '' ? null : (
                  <View style={styles.smallImageView}>
                    <Image
                      source={{uri: imageVideoData.uri}}
                      style={styles.smallImage}
                    />
                  </View>
                )}
              </View>
            )}
            <TouchableOpacity
              onPress={() => {
                setFireStoreData();
                setD(!d);
              }}>
              <LinearGradient
                colors={['#a5b8ac', 'rgba(31, 215, 189, 1)']}
                start={{x: 0.2, y: 0}}
                end={{x: 0, y: 2}}
                style={styles.postButtonView}>
                <Text style={styles.saveTextStyle}>POST</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031C1D',
  },
  mainHeaderView: {
    // height: hp(29.92),
  },
  arnabTextStyle: {
    // marginTop: hp(8.12),
    marginLeft: wp(6.4),
    color: 'rgba(250, 250, 250, 1)',
    fontSize: fontSize(18),
    fontWeight: '600',
  },
  primaryTextInputModal: {
    flexDirection: 'row',
    marginTop: hp(3.57),
    marginLeft: wp(6.4),
    height: hp(5.91),
    alignItems: 'center',
    justifyContent: 'center',
  },
  idImageStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(5.17),
    width: wp(11.2),
    backgroundColor: 'rgba(49, 82, 77, 1)',
    borderRadius: hp(4),
  },
  inputModalStyle: {
    flex: 1,
    height: hp(5.26),
    marginLeft: wp(2.93),
    borderWidth: 1,
    borderColor: 'rgba(60, 75, 73, 1)',
    borderRadius: hp(1),
    marginRight: wp(3.46),
  },
  whatsTextStyle: {
    color: 'rgba(72, 81, 82, 1)',
    marginLeft: wp(4.26),
    marginTop: hp(1.35),
  },
  buttonsMainView: {
    marginTop: hp(1.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(1.5),
  },
  addImageView: {
    flexDirection: 'row',
    backgroundColor: '#152420',
    borderRadius: hp(1),
    height: hp(5.64),
    width: wp(48.06),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageStyle: {
    height: hp(1.72),
    width: wp(4.26),
  },
  addImageTextStyle: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: fontSize(14),
    fontWeight: '400',
    paddingLeft: wp(1.86),
  },
  secondPrimaryView: {
    flex: 1,
    backgroundColor: '#011B1D',
  },
  yourpostsTextStyle: {
    color: 'rgba(250, 250, 250, 1)',
    fontSize: fontSize(18),
    fontWeight: '600',
    paddingLeft: wp(5.33),
    paddingTop: hp(2.83),
  },
  threeButton: {
    marginTop: hp(1.23),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'green',
    marginLeft: wp(5.33),
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(3.94),
    width: wp(20.16),
    borderRadius: hp(1),
    // marginLeft: wp(5.33),
    marginRight: wp(7),
    // borderWidth: 1,
  },
  buttonTextStyle: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: fontSize(14),
    fontWeight: '500',
  },
  primaryModalView: {
    height: hp(62.8),
    width: wp(89.33),
    backgroundColor: 'rgba(28, 32, 32, 0.9)',
    borderRadius: hp(1),
    shadowColor: 'rgba(28, 32, 32, 0.9)',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cancleButtonView: {
    marginTop: hp(2.73),
    paddingRight: wp(5.9),
  },
  cancleButton: {
    alignSelf: 'flex-end',
  },
  creatPostTextStyle: {
    alignSelf: 'center',
    color: 'rgba(250, 250, 250, 1)',
    fontSize: fontSize(18),
    fontWeight: '700',
  },
  textInputModalView: {
    marginTop: hp(2.7),
    height: hp(18.84),
    width: wp(82.93),
    borderWidth: 1,
    borderColor: 'rgba(60, 75, 73, 1)',
    marginLeft: wp(3.2),
    paddingLeft: wp(4.26),
    paddingTop: hp(1.26),
    color: '#fff',
  },
  addToTextStyle: {
    marginTop: hp(2.7),
    color: 'rgba(255, 255, 255, 1)',
    fontSize: fontSize(16),
    fontWeight: '500',
    marginLeft: wp(3.2),
  },
  bottomTextInputStyle: {
    marginTop: hp(2.58),
    height: hp(3.57),
    width: wp(82.93),
    borderWidth: 1,
    borderRadius: hp(1),
    marginLeft: wp(3.2),
    borderColor: '#3C4B49',
    paddingLeft: wp(4.26),
  },
  postButtonView: {
    marginTop: hp(9.6),
    marginLeft: wp(5.6),
    height: hp(4.92),
    width: wp(77.86),
    backgroundColor: '',
    borderRadius: hp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainData: {
    marginTop: hp(2.92),
  },
  imageViewStyle: {
    height: hp(24.5),
    width: wp(91.73),
    marginLeft: wp(4),
    // backgroundColor: 'red',
  },
  dataImageStyle: {
    // resizeMode: 'contain',
    // height: '100%',
    // width: '100%',
    borderRadius: hp(1.5),
    height: hp(24.5),
    width: wp(91.73),
    // borderWidth: 1,
  },
  dataCapionTextStyle: {
    marginTop: hp(1.97),
    marginLeft: wp(4),
    color: '#CDD8D9',
    fontSize: fontSize(17),
    fontWeight: '400',
    width: wp(89.83),
  },
  postedTextStyle: {
    marginTop: hp(1.84),
    marginLeft: wp(4),
    color: '#CDD8D999',
    fontSize: fontSize(14),
    fontWeight: '400',
    fontStyle: 'italic',
  },
  lineStyle: {
    width: wp(100),
    borderWidth: 0.5,
    borderColor: '#1B2526',
  },
  userLikeView: {
    flex: 1,
    // marginTop: hp(1.47),
    flexDirection: 'row',
    height: hp(6.15),
    alignItems: 'center',
    // justifyContent: 'center',
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
    color: '#C7E8E7',
  },
  horiLine: {
    marginTop: hp(1.23),
    backgroundColor: '#152420',
    height: hp(0.98),
  },
  barViewStyle: {
    flex: 1,
    marginRight: wp(5.43),
  },
  barStyle: {
    alignSelf: 'flex-end',
  },
  messageImageView: {
    height: hp(1.97),
    width: wp(4.53),
    tintColor: '#fff',
    marginLeft: wp(5.93),
  },
  uploadImageStyle: {
    marginLeft: wp(3.2),
    marginTop: hp(1.47),
    color: '#FFFFFF',
    fontSize: fontSize(16),
    fontWeight: '600',
  },
  smallImageView: {
    marginTop: hp(-1),
    marginLeft: wp(4.26),
    height: hp(7.15),
    width: hp(7.15),
  },
  smallImage: {
    height: hp(7.15),
    width: hp(7.15),
    borderRadius: hp(1),
  },
  crossDesign: {
    height: hp(1.97),
    width: wp(4.26),
    borderRadius: hp(2),
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    left: wp(17),
  },
  deleteDataView: {
    marginLeft: wp(5.6),
    height: hp(3.92),
    width: wp(57.86),
    backgroundColor: '',
    borderRadius: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#152420',
  },
  mainView: {
    flexDirection: 'row',
    paddingLeft: wp(6.08),
  },
  imageDotStyle: {
    marginTop: hp(7.26),
    height: hp(2.5),
    width: wp(2.9),
  },
  headerTextStyle: {
    marginTop: hp(6.89),
    marginLeft: wp(20.88),
    color: 'rgba(250, 250, 250, 1)',
    fontSize: fontSize(18),
    fontWeight: '600',
  },
});

export default FirebaseDemo;
