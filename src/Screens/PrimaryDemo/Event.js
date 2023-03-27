import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Header from '../../Component/Header';
import {imageConstatnt} from '../../helper/imageConstatnt';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import {fontSize, hp, wp} from '../../helper/primaryConstant';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getUserData} from '../../Component/GetData';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {colorConstatnt} from '../../helper/colorConstatnt';

const Event = () => {
  const [imageData, setImageData] = useState('');
  const [imgDownloadUrl, setImgDownloadUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [title, setTitle] = useState('');
  const [userOldData, setUserOldData] = useState([]);
  const {navigate} = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  // console.log('Caption ====', caption.length);
  // console.log('imageData ====', imageData.length);

  const getData = async () => {
    const get = await getUserData();
    setUserOldData(get._data);
  };

  const pickImage = async action => {
    let docType;
    if (action === 'Images') docType = DocumentPicker.types.images;
    else if (action === 'Video') docType = DocumentPicker.types.video;
    try {
      const res = await DocumentPicker.pickSingle({
        type: docType,
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
        const response = storage().ref(`/PrimaryData/Post/${imageData.name}`);
        const put = await response.putFile(imageData.fileCopyUri);
        // console.log(put);
        const url = await response.getDownloadURL();
        setImgDownloadUrl(url);
        return url;
      } catch (err) {
        console.log('err >---->', err);
      }
    }
  };

  const setOpenFireStoreData = async () => {
    if (Object.keys(imageData).length > 0 && caption.length > 0) {
      const imageUrl = await uploadImage();
      const userComment = {
        image: userOldData.uri,
        PostName: userOldData.name,
        CommentText: caption,
        CommentTime: firestore.Timestamp.fromDate(new Date()),
      };
      const userData = {
        // PostTitle: title,
        Comment: firebase.firestore.FieldValue.arrayUnion(
          JSON.stringify(userComment),
        ),
        PostImg: imageUrl,
        PostType: imageData.type,
        PostTime: firestore.Timestamp.fromDate(new Date()),
        PostLike: [],
        PostBookMark: [],
        PostId: auth().currentUser.uid,
        PostName: userOldData.name,
        PostUserImageUrI: userOldData.uri,
      };
      await firestore()
        .collection('usersPost')
        .add(userData)
        .then(async res => {
          await firestore()
            .collection('usersPost')
            .doc(res?.id)
            .update({docID: res?.id})
            .then(() => {
              navigate('PrimaryHome');
            });
          // Alert.alert('Post Published');
          // navigate('PrimaryHome');
        });
      setCaption('');
      setTitle('');
      setImageData('');
      setImgDownloadUrl('');
    } else {
      Alert.alert('Enter The All Filled');
    }
  };

  return (
    <View style={styles.container}>
      <Header text={'Event'} />
      <View style={{flex: 1}}>
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

              marginLeft: wp(3.2),
            }}
            onPress={() => {
              pickImage('Images');
            }}>
            <Image source={imageConstatnt.image} style={styles.addImageStyle} />
            <Text style={styles.addImageTextStyle}>Add Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.addImageView}}
            onPress={() => {
              pickImage('Video');
            }}>
            <Image source={imageConstatnt.video} style={styles.addImageStyle} />
            <Text style={styles.addImageTextStyle}>Add Video</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.bottomTextInputStyle}
          placeholder="Title of Image/ Video (optional)"
          placeholderTextColor="#485152"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        {imageData === '' ? null : (
          <View>
            <Text style={{...styles.addToTextStyle, marginBottom: hp(2)}}>
              Uploaded Image / Video
            </Text>
            <TouchableOpacity
              style={styles.crossDesign}
              onPress={() => {
                setImageData('');
              }}>
              <Image source={imageConstatnt.cross} />
            </TouchableOpacity>
            {imageData === '' ? null : (
              <View style={styles.smallImageView}>
                <Image
                  source={{uri: imageData.uri}}
                  style={styles.smallImage}
                />
              </View>
            )}
          </View>
        )}
        <TouchableOpacity
          onPress={() => {
            // setFireStoreData();
            setOpenFireStoreData();
          }}>
          <LinearGradient
            colors={[
              colorConstatnt.lightPurple,
              colorConstatnt.lightBlue,
              colorConstatnt.lightGreen,
              colorConstatnt.lightYellow,
              colorConstatnt.lightOrange,
              colorConstatnt.lightRed,
            ]}
            // start={{x: 0.2, y: 1}}
            // end={{x: 0.7, y: 2}}
            start={{x: 1.2, y: 0.5}}
            end={{x: 0.1, y: 1.4}}
            style={styles.postButtonView}>
            <Text style={styles.saveTextStyle}>POST</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#e0ffff',
  },
  creatPostTextStyle: {
    alignSelf: 'center',
    color: '#000',
    fontSize: fontSize(20),
    fontWeight: '700',
    marginTop: hp(4),
  },
  textInputModalView: {
    marginTop: hp(3),
    height: hp(18.84),
    width: wp(85),
    borderWidth: 1,
    borderColor: 'rgba(60, 75, 73, 1)',
    paddingLeft: wp(4.26),
    paddingTop: hp(1.26),
    alignSelf: 'center',
  },
  addToTextStyle: {
    marginTop: hp(2.7),
    color: '#000',
    fontSize: fontSize(20),
    fontWeight: '500',
    alignSelf: 'center',
    // marginLeft: wp(3.2),
  },
  buttonsMainView: {
    marginTop: hp(3),
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: wp(1.5),
  },
  addImageView: {
    flexDirection: 'row',
    backgroundColor: '#7d5fff',
    borderRadius: hp(1),
    height: hp(5.64),
    width: wp(43),
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
  bottomTextInputStyle: {
    marginTop: hp(2.58),
    height: hp(3.57),
    width: wp(85),
    borderWidth: 1,
    borderRadius: hp(1),
    borderColor: '#3C4B49',
    paddingLeft: wp(4.26),
    alignSelf: 'center',
  },
  uploadImageStyle: {
    marginLeft: wp(3.2),
    marginTop: hp(1.47),
    color: '#000',
    fontSize: fontSize(16),
    fontWeight: '600',
  },
  crossDesign: {
    height: hp(1.97),
    width: wp(4.26),
    borderRadius: hp(2),
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    left: wp(27),
  },
  smallImageView: {
    marginTop: hp(-1),
    marginLeft: wp(9),
    height: hp(10),
    width: hp(10),
    alignSelf: 'flex-start',
  },
  smallImage: {
    height: hp(10),
    width: hp(10),
    borderRadius: hp(1),
    resizeMode: 'contain',
  },
  postButtonView: {
    marginTop: hp(5),
    height: hp(4.92),
    width: wp(77.86),
    backgroundColor: '',
    borderRadius: hp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default Event;
