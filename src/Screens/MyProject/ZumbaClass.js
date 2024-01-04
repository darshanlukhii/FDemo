import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ImageBackground,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {imageConstant} from '../../helper/imageConstant';
import {fontSize, hp, wp} from '../../helper/primaryConstant';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ZumbaClass = ({navigation}) => {
  const [title, setTitle] = useState('Forward fold');
  const [time, setTime] = useState(moment());
  const [data, setData] = useState([]);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [newTime, setNewTime] = useState();
  const [id, setID] = useState('');
  const [editTime, setEditTime] = useState('');

  const addData = () => {
    setData(previousValue => [
      ...previousValue,
      {
        title,
        time: moment(),
        id: Math.floor(Math.random() * 999999999999),
        imageVisible: false,
      },
    ]);
  };
  const restData = () => {
    setData('');
  };

  const updateTitle = (value, id) => {
    setData(() =>
      data.map(currentValue => {
        if (currentValue.id === id) return {...currentValue, title: value};
        else return currentValue;
      }),
    );
  };

  useEffect(() => {
    setData(() => {
      //---> if we use of Parentheses then you have to writing code in return otherwise it's take a different result. in a function we have only one data we can skip our Parentheses and writing our code without any Parentheses ....
      return data.map(currentValue => {
        if (currentValue.id === id) return {...currentValue, time: editTime};
        else return currentValue;
      });
    });
  }, [editTime]);

  // const updateTime = (id, tt) => {
  //   setData(() => {
  //     return data.map(currentValue => {
  //       if (currentValue.id === id) return {...currentValue, time: tt};
  //       else return currentValue;
  //     });
  //   });
  // };

  console.log('time -------------->', time);
  const deleteData = id => {
    // const filteredData = data.filter(item => item.id !== id);
    // setData(filteredData);
    setData(() => data.filter(item => item.id !== id));
  };

  const changeImage = id => {
    setData(() =>
      data.map(currentValue => {
        if (currentValue.id === id) {
          if (currentValue.imageVisible === true) deleteData(id);
          else
            return {...currentValue, imageVisible: !currentValue.imageVisible};
        } else return currentValue;
      }),
    );
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.mainHeader}></View> */}
      <View style={styles.header}>
        <StatusBar hidden={true} />
        <View style={styles.mainView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.imageDotStyle} source={imageConstant.back} />
          </TouchableOpacity>
          <Text style={styles.zumbaHeaderTextStyle}>Zumba Class</Text>
        </View>
        <Text style={styles.workoutText}>Workout name</Text>
      </View>
      <TouchableOpacity
        style={styles.primaryBox}
        onPress={() => {
          navigation.navigate('FirebaseDemo');
        }}>
        <Text style={styles.ZumbaTextStyle}>Zumba class workouts{}</Text>
      </TouchableOpacity>
      <View style={styles.detailsView}>
        <View style={styles.totalView}>
          <Text style={styles.headerTextStyle}>TOTAL EXETCISE </Text>
          <Text style={styles.detailTextStyle}>{data.length}</Text>
        </View>
        <Text style={{color: 'rgba(255, 255, 255, 0.15)', marginTop: hp(3.81)}}>
          |
        </Text>
        <View style={styles.TimerView}>
          <Text style={styles.headerTextStyle}>TOTAL TIMER </Text>
          {editTime === '' || data == [] ? (
            <Text style={styles.detailTextStyle}>
              {moment(time).format('HH:mm')}
            </Text>
          ) : (
            <Text style={styles.detailTextStyle}>
              {moment(editTime).format('HH:mm')}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.timerBoxView}>
        <View style={styles.buttonViewStyle}>
          <TouchableOpacity
            style={styles.addView}
            onPress={() => {
              addData();
            }}>
            <Image source={imageConstant.plus} style={styles.addImage} />
            <Text style={styles.boxText}>Add exercise</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addView}
            onPress={() => {
              // addData();
              restData();
            }}>
            <Image source={imageConstant.watch} style={styles.addImage} />
            <Text style={styles.boxText}>Add rest</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.exeView}>
          <Text style={styles.exeTextStyle}>Exercise name</Text>
          <View style={styles.timerView}>
            <Text style={styles.exeTextStyle}>Timer</Text>
            <Text style={styles.minTextStyle}>Min:Sec</Text>
          </View>
        </View>
        {data == [] || data == '' ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ImageBackground
              source={imageConstant.fullWatch}
              style={styles.fullWatchImage}
            />
            <Text style={styles.startaddTextStyle}>
              Start adding your exercises and timers
            </Text>
          </View>
        ) : (
          <FlatList
            data={data}
            bounces={false}
            renderItem={({item}) => {
              // ---> convert full time to hours and minutes
              const time = moment(item.time).format('HH:mm');
              return (
                <View style={styles.logicView}>
                  <Image
                    source={imageConstant.dot}
                    style={styles.dotImageStyle}
                  />
                  <TextInput
                    style={styles.textinputView}
                    value={item.title}
                    onChangeText={value => {
                      updateTitle(value, item.id);
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setTimePickerVisibility(true);
                      setID(item.id);
                    }}>
                    <View
                      style={{
                        ...styles.textinputView,
                        width: wp(18.13),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.timeTextStyle}>{time}</Text>
                      <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        locale="en_GB"
                        onConfirm={tt => {
                          setEditTime(tt);
                          setTimePickerVisibility(false);
                          // console.log('================', index);
                          // updateTime(item.id, tt);
                        }}
                        onCancel={() => setTimePickerVisibility(false)}
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.deleteViewStyle}>
                    <TouchableOpacity
                      onPress={() => {
                        changeImage(item.id);
                      }}>
                      <Image
                        source={
                          item.imageVisible === false
                            ? imageConstant.add
                            : imageConstant.delete
                        }
                        // style={
                        //   item.imageVisible === false
                        //     ? styles.addImageStyle
                        //     : styles.deleteImageStyle
                        // }
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
      <TouchableOpacity>
        <LinearGradient
          colors={['rgba(188, 255, 39, 1)', 'rgba(31, 215, 189, 1)']}
          start={{x: 0.2, y: 0}}
          end={{x: 0, y: 2}}
          style={styles.saveButtonViewStyle}>
          <Text style={styles.saveTextStyle}>SAVE</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031C1D',
  },
  mainHeader: {
    paddingTop: hp(10.83),
  },
  header: {
    paddingTop: hp(3.81),
    paddingLeft: wp(6.4),
  },
  // backButtonStyle: {
  //   marginTop: hp(6.83),
  //   fontWeight: '600',
  //   fontSize: fontSize(30),
  //   marginLeft: wp(7),
  //   color: 'white',
  // },
  workoutText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(250, 250, 250, 0.5)',
    marginBottom: hp(1),
  },
  primaryBox: {
    height: hp(4.92),
    width: wp(87.2),
    marginLeft: wp(6.4),
    marginTop: hp(0.49),
    borderColor: 'rgba(60, 75, 73, 1)',
    borderWidth: 1,
    borderRadius: hp(1),
  },
  ZumbaTextStyle: {
    color: 'rgba(250, 250, 250, 1)',
    fontSize: 14,
    fontWeight: '400',
    paddingTop: hp(1.35),
    paddingLeft: wp(4.26),
  },
  detailsView: {
    marginTop: hp(2.95),
    marginLeft: wp(10.4),
    height: hp(9.35),
    width: wp(78.93),
    backgroundColor: 'rgba(26, 44, 46, 1)',
    borderRadius: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  totalView: {
    marginTop: hp(1.72),
    marginLeft: wp(8),
  },
  TimerView: {
    marginTop: hp(1.72),
    marginRight: wp(12.53),
  },
  headerTextStyle: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(163, 183, 186, 1)',
  },
  detailTextStyle: {
    color: 'rgba(33, 210, 161, 1)',
    fontWeight: '600',
    fontSize: 20,
    marginTop: hp(0.86),
  },
  timerBoxView: {
    height: hp(51.97),
    backgroundColor: 'rgba(26, 38, 39, 1)',
    marginTop: hp(-4),
  },
  buttonViewStyle: {
    marginTop: hp(3.44),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: hp(7.38),
  },
  addView: {
    height: hp(4.43),
    width: wp(38.13),
    borderWidth: 1,
    borderColor: 'rgba(33, 210, 161, 1)',
    borderRadius: hp(1),
    flexDirection: 'row',
  },
  addImage: {
    height: hp(2),
    width: hp(2),
    marginLeft: wp(3.29),
    marginTop: hp(1.19),
    tintColor: 'rgba(33, 210, 161, 1)',
  },
  boxText: {
    color: 'rgba(33, 210, 161, 1)',
    marginTop: hp(1.23),
    marginLeft: wp(3.55),
    fontSize: 14,
    fontWeight: '500',
  },
  exeView: {
    marginTop: hp(3.51),
    marginLeft: wp(10.13),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exeTextStyle: {
    color: 'rgba(250, 250, 250, 1)',
    fontSize: 18,
    fontWeight: '600',
  },
  timerView: {
    flexDirection: 'row',
  },
  minTextStyle: {
    color: 'rgba(199, 232, 231, 1)',
    fontSize: 10,
    fontWeight: '400',
    alignSelf: 'flex-end',
    marginRight: wp(7.2),
    marginLeft: wp(0.53),
    marginBottom: hp(0.2),
  },
  saveButtonViewStyle: {
    marginTop: hp(3.44),
    marginLeft: wp(9.06),
    height: hp(6.15),
    width: wp(81.86),
    borderRadius: hp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveTextStyle: {
    fontSize: 16,
    fontWeight: '500',
  },
  logicView: {
    flexDirection: 'row',
    marginTop: hp(0.73),
    height: hp(4.92),
    alignItems: 'center',
  },
  dotImageStyle: {
    marginLeft: wp(5.33),
  },
  textinputView: {
    width: wp(54.4),
    height: hp(4.92),
    borderWidth: 1,
    borderColor: 'rgba(60, 75, 73, 1)',
    borderRadius: hp(1),
    marginLeft: wp(2.53),
    paddingLeft: wp(2),
    color: 'rgba(250, 250, 250, 1)',
  },
  timeTextStyle: {
    color: 'rgba(250, 250, 250, 1)',
  },
  deleteViewStyle: {
    flex: 1,
    height: hp(4.92),
    marginLeft: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWatchImage: {
    height: hp(25.24),
    width: hp(25.24),
    alignSelf: 'center',
    marginTop: hp(4),
  },
  startaddTextStyle: {
    color: 'rgba(82, 96, 95, 1)',
    fontSize: 14,
    fontWeight: '400',
  },
  mainView: {
    flexDirection: 'row',
    marginTop: hp(3.26),
    marginBottom: hp(3),
  },
  imageDotStyle: {
    height: hp(2.5),
    width: wp(2.9),
  },
  zumbaHeaderTextStyle: {
    marginLeft: wp(25.88),
    color: 'rgba(250, 250, 250, 1)',
    fontSize: fontSize(18),
    fontWeight: '600',
  },
});

export default ZumbaClass;
