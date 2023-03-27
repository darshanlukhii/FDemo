import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Image, Button, Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {hp, wp} from '../helper/primaryConstant';
import storage, {firebase} from '@react-native-firebase/storage';

const Imageupload = () => {
  const [imageData, setImageData] = useState();
  const [fullImgRefpath, setFullImgRefpath] = useState();
  const [imgDownloadUrl, setImgDownloadUrl] = useState();

  const pickImage = async () => {
    try {
      // ------->  this is for ios only <-------
      // const response = await DocumentPicker.pickSingle({
      //   type: [DocumentPicker.types.images],
      // });

      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });

      console.log(response);
      setImageData(response);
    } catch (err) {
      console.log(err);
    }
  };

  // const uploadImage = async () => {
  //   try {
  //     const response = firebase.storage().ref(`/profile/${imageData.name}`);
  //     // ------->  this is for ios only <-------
  //     // const put = await response.putFile(imageData.uri);
  //     const put = await response.putFile(imageData.fileCopyUri);
  //     console.log(put);

  //     // ------->  this is for get path <-------
  //     setFullImgRefpath(put.metadata.fullPath);
  //     console.log('path ----->', fullImgRefpath);
  //     // ------->  this is for get uri <-------
  //     const url = await response.getDownloadURL();
  //     setImgDownloadUrl(url);
  //     Alert.alert('Image Uploaded Successfully');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const uploadImage = async (uri, name, firebasePath) => {
    const imageRef = storage().ref(`/profile/${imageData.name}`);
    await imageRef
      .putFile(imageData.uri, {contentType: 'image/jpg'})
      .catch(error => {
        throw error;
      });
    const url = await imageRef.getDownloadURL().catch(error => {
      throw error;
    });
    setImgDownloadUrl(url);
    return url;
  };

  const deleteImage = async () => {
    try {
      const response = await storage().ref(fullImgRefpath).delete();
      console.log(response);
      Alert.alert('Your Pic Is Delete ...');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {/* <View> */}
      {imageData ? (
        <Image
          source={{uri: imageData.uri}}
          style={{height: hp(25), width: hp(40), marginBottom: hp(5)}}
        />
      ) : (
        <Text>No Image found</Text>
      )}
      {/* </View> */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Button
          title="Select Image"
          onPress={() => {
            pickImage();
          }}
        />
        <Button
          title="Upload Image"
          onPress={() => {
            uploadImage();
          }}
        />
        <Button
          title="Delete Image"
          onPress={() => {
            deleteImage();
          }}
          color="red"
        />
      </View>
      <View style={{marginTop: 30}}>
        <Text>Url: {imgDownloadUrl}</Text>
        <Text>path: {fullImgRefpath}</Text>
      </View>
      <Image
        source={{uri: imgDownloadUrl}}
        style={{height: hp(25), width: hp(40), marginTop: hp(5)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Imageupload;
