import moment from 'moment';
import React, {useState} from 'react';
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
} from 'react-native';
import {imageConstatnt} from '../../helper/imageConstatnt';
import {fontSize, hp, wp} from '../../helper/primaryConstant';
import ReactNativeModal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import VideoPlayer from 'react-native-video-player';
import {useDispatch, useSelector} from 'react-redux';

const FeedHomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [caption, setCaption] = useState('');
  const [imagevideoData, setImagevideoData] = useState('');

  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const {id} = useSelector(state => state.user);
  console.log('user --------->', user);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addDocument = async action => {
    console.log(DocumentPicker.types);
    try {
      let docType;
      if (action === 'Images') docType = DocumentPicker.types.images;
      else if (action === 'Video') docType = DocumentPicker.types.video;
      const res = await DocumentPicker.pickSingle({
        type: docType,
      });
      setImagevideoData(res);
      console.log('---------->', res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView bounces={false} style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.mainHeaderView}>
        <Text style={styles.arnabTextStyle}>Arnab’s Gym Feed</Text>
        <View style={styles.primaryTextInputModal}>
          <View style={styles.idImageStyle}>
            <Image source={imageConstatnt.idPic} />
          </View>
          <TouchableOpacity
            style={styles.inputModalStyle}
            onPress={toggleModal}>
            <Text style={styles.whatsTextStyle}>What's going on today?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsMainView}>
          <TouchableOpacity style={styles.addImageView} onPress={() => {}}>
            <Image source={imageConstatnt.image} style={styles.addImageStyle} />
            <Text style={styles.addImageTextStyle}>Add Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addImageView} onPress={() => {}}>
            <Image source={imageConstatnt.video} style={styles.addImageStyle} />
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
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Photos </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Video </Text>
          </TouchableOpacity>
          {user == '' ? null : (
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                dispatch({type: 'DELETE_ALL_DATA'});
              }}>
              <Text style={styles.buttonTextStyle}>Delete All</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* --------------------------------------------------------------------------> FlatList Is Start ................................................................. */}
        <FlatList
          data={user}
          bounces={false}
          scrollEnabled={false}
          style={styles.mainData}
          renderItem={({item}) => {
            console.log('0000000000000', item);
            return (
              <View style={{marginTop: hp(1.97)}}>
                {item.Uri ? (
                  item.Type === 'image/jpeg' ? (
                    <View style={styles.imageViewStyle}>
                      <Image
                        style={styles.dataImageStyle}
                        source={{uri: item.Uri}}
                      />
                    </View>
                  ) : (
                    <View style={styles.imageViewStyle}>
                      <VideoPlayer
                        style={styles.dataImageStyle}
                        video={{uri: item.Uri}}
                        // videoHeight={hp(2)}
                        // videoWidth={hp(2)}
                      />
                    </View>
                  )
                ) : null}
                {item.caption === '' ? null : (
                  <Text style={styles.dataCapionTextStyle}>{item.caption}</Text>
                )}
                <Text style={styles.postedTextStyle}>
                  Posted on {moment().format('h:mm')}
                </Text>
                <View style={styles.lineStyle} numberOfLines={1}></View>
                <View style={styles.userLikeView}>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch({type: 'EDIT_USER_LIKE', payload: item.id});
                    }}>
                    <Image
                      source={imageConstatnt.like}
                      style={styles.likeImageStyle}
                    />
                  </TouchableOpacity>
                  <Text style={styles.likeNumberTextStyle}>{item.like}</Text>
                  <TouchableOpacity>
                    <Image
                      source={imageConstatnt.message}
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
                    onPress={() => {
                      dispatch({type: 'DELETE_DATA', payload: item.id});
                    }}>
                    <Image
                      source={imageConstatnt.bar}
                      style={styles.barStyle}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{...styles.horiLine, marginTop: hp(0)}}></View>
              </View>
            );
          }}
        />
      </View>

      {/* --------------------------------------------------------------------------> Modal Is Start ................................................................. */}
      <ReactNativeModal
        animationIn={'slideInUp'}
        // animationInTiming={2000}
        isVisible={isModalVisible}
        backdropOpacity={0.8}
        style={{alignSelf: 'center', margin: 0}}
        onBackdropPress={toggleModal}>
        <View style={styles.primaryModalView}>
          <View style={styles.cancleButtonView}>
            <TouchableOpacity onPress={toggleModal}>
              <Image
                source={imageConstatnt.cancle}
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
                  addDocument('Images');
                }}>
                <Image
                  source={imageConstatnt.image}
                  style={styles.addImageStyle}
                />
                <Text style={styles.addImageTextStyle}>Add Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{...styles.addImageView, width: wp(38)}}
                onPress={() => {
                  addDocument('Video');
                }}>
                <Image
                  source={imageConstatnt.video}
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
            {imagevideoData === '' ? null : (
              <View>
                <Text style={styles.uploadImageStyle}>
                  Uploaded images / video
                </Text>
                <TouchableOpacity
                  style={styles.crossDesign}
                  onPress={() => {
                    setImagevideoData('');
                  }}>
                  <Image source={imageConstatnt.cross} />
                </TouchableOpacity>
                {imagevideoData === '' ? null : (
                  <View style={styles.smallImageView}>
                    <Image
                      source={{uri: imagevideoData.uri}}
                      style={styles.smallImage}
                    />
                  </View>
                )}
              </View>
            )}
            <TouchableOpacity
              onPress={() => {
                const URI = imagevideoData.uri;
                const TYPE = imagevideoData.type;
                dispatch({
                  type: 'ADD_USER',
                  payload: {id, caption, Uri: URI, Type: TYPE, like: 1},
                });
                dispatch({type: 'ADD_ID', payload: 1});
                setModalVisible(!isModalVisible);
                setCaption('');
                setImagevideoData('');
              }}>
              <LinearGradient
                colors={['rgba(180, 255, 9, 1)', 'rgba(31, 215, 189, 1)']}
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
    height: hp(29.92),
  },
  arnabTextStyle: {
    marginTop: hp(8.12),
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
    // marginLeft: wp(5.33),
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(3.94),
    width: wp(20.16),
    borderRadius: hp(2),
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
    textAlignVertical: '',
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
  barStyle: {
    marginLeft: wp(55.75),
    justifyContent: 'flex-end',
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
});

export default FeedHomeScreen;
