import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  LogBox,
} from 'react-native';
import DetailsStyle from '../Component/DetailsStyle';
import {makeAPIRequest} from '../helper/GlobalFunctions';
import {fontSize, hp, wp} from '../helper/primaryConstant';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeModal from 'react-native-modal';
import {imageConstant} from '../helper/imageConstant';
import {colorConstant} from '../helper/colorConstant';
import HighlightText from '@sanar/react-native-highlight-text';

const ApiCalling = ({navigation}) => {
  const [userData, setUserData] = useState();
  const [modalUserData, setModalUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalFilteredData, setModalFilteredData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [ageSet, setAgeSet] = useState();
  const [ageNumber, setAgeNumber] = useState('');
  const [typeOfGender, setTypeOfGender] = useState('');
  const [typeOfBloodGroup, setTypeOfBloodGroup] = useState('');
  let gender = ['male', 'female'];
  let age = ['<', '=', '>'];
  let bloodGroup = ['A+', 'A−', 'B+', 'B−', 'O+', 'O−', 'AB−'];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    makeAPIRequest({
      method: 'get',
      baseURL: 'https://dummyjson.com/users',
    }).then(res => {
      // console.log('userData ....', res?.data?.users);
      setUserData(res?.data?.users);
      setFilteredData(res?.data?.users);
      setModalFilteredData(res?.data?.users);
      log;
    });
  };

  const onSearch = text => {
    // console.log('===========>', text);
    if (text !== '') {
      const newData = filteredData.filter(item => {
        const itemData =
          item.username || item.email
            ? item.username.toLowerCase() || item.email.toLowerCase()
            : ''.toLowerCase();
        const searchText = text.toLowerCase();
        return itemData.indexOf(searchText) > -1;
      });
      setUserData(newData);
      setSearch(text);
    } else {
      setUserData(filteredData);
      setSearch(text);
    }
  };

  const setFilter = (isGender, isBloodGroup, isAge) => {
    if (!isBloodGroup && !isGender && !isAge) {
      const filter = modalFilteredData.filter(item => {
        return item;
      });
      console.log('!isBloodGroup && !isBloodGroup && !isAge', filter);
      setUserData(filter);
    }
    if (isGender && isBloodGroup && isAge) {
      const filter = modalFilteredData.filter(item => {
        if (
          gender &&
          isGender === item.gender &&
          bloodGroup &&
          isBloodGroup === item.bloodGroup &&
          (('<' == isAge && item.age < ageSet) ||
            ('=' == isAge && item.age == ageSet) ||
            ('>' == isAge && item.age > ageSet))
        )
          return item;
      });
      console.log('isGender && isBloodGroup && isAge', filter);
      setUserData(filter);
    }
    if (isAge && isGender && !isBloodGroup) {
      const filter = modalFilteredData.filter(item => {
        if (
          (('<' == isAge && item.age < ageSet) ||
            ('=' == isAge && item.age == ageSet) ||
            ('>' == isAge && item.age > ageSet)) &&
          gender &&
          isGender === item.gender
        )
          return item;
      });
      console.log('isAge && isGender', filter);
      setUserData(filter);
    }
    if (isAge && isBloodGroup && !isGender) {
      const filter = modalFilteredData.filter(item => {
        if (
          (('<' == isAge && item.age < ageSet) ||
            ('=' == isAge && item.age == ageSet) ||
            ('>' == isAge && item.age > ageSet)) &&
          bloodGroup &&
          isBloodGroup === item.bloodGroup
        )
          return item;
      });
      console.log('isAge && isBloodGroup', filter);
      setUserData(filter);
    }
    if (isBloodGroup && isGender && !isAge) {
      const filter = modalFilteredData.filter(item => {
        if (
          bloodGroup &&
          gender &&
          isBloodGroup === item.bloodGroup &&
          isGender === item.gender
        )
          return item;
      });
      console.log('isBloodGroup && isGender', filter);
      setUserData(filter);
    }
    if (isGender && !isAge && !isBloodGroup) {
      const filter = modalFilteredData.filter(item => {
        if (gender && isGender === item.gender) return item;
      });
      setUserData(filter);
      console.log('isGender', filter);
    }
    if (isBloodGroup && !isGender && !isAge) {
      const filter = modalFilteredData.filter(item => {
        if (bloodGroup && isBloodGroup === item.bloodGroup) return item;
      });
      setUserData(filter);
      console.log('isBloodGroup', filter);
    }
    if (isAge && !isBloodGroup && !isGender) {
      const filter = modalFilteredData.filter(item => {
        if (
          ('<' == isAge && item.age < ageSet) ||
          ('=' == isAge && item.age == ageSet) ||
          ('>' == isAge && item.age > ageSet)
        )
          return item;
      });
      setUserData(filter);
      console.log('isAge', filter);
    }
  };

  // const setFilter = () => {
  //   const filter = modalFilteredData
  //     .filter(value => {
  //       if (value?.gender === typeOfGender) return value;
  //       else if (typeOfGender === '') return value;
  //     })
  //     .filter(value => {
  //       if (ageNumber == '<' && value?.age < ageSet) return value;
  //       else if (ageNumber == '=' && value?.age === ageSet) return value;
  //       else if (ageNumber == '>' && value?.age > ageSet) return value;
  //       else if (ageNumber == '') return value;
  //     })
  //     .filter(value => {
  //       if (value?.bloodGroup === typeOfBloodGroup) return value;
  //       else if (typeOfBloodGroup === '') return value;
  //     });
  //   setUserData(filter);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.headerPartView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.backButtonStyle}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setFilterModalVisible(!isFilterModalVisible);
          }}>
          <Image source={imageConstant.filter} style={styles.filterStyle} />
        </TouchableOpacity>
      </View>
      <Text style={styles.userListTextView}>User List</Text>
      <View style={styles.backGroundStyle}>
        <Image source={imageConstant.search} style={styles.iconStyle} />
        <TextInput
          style={styles.inputStyle}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search here ..."
          value={search}
          onChangeText={text => {
            onSearch(text);
          }}
        />
        <TouchableOpacity
          style={styles.searchStyle}
          value={search}
          onPress={() => {
            setSearch('');
            onSearch('');
          }}>
          <Image
            source={imageConstant.backClose}
            style={{height: hp(1.3), width: hp(1.3)}}
          />
        </TouchableOpacity>
      </View>
      {/* ---------------------------------------------------------> FlatList ...................................................... */}
      <FlatList
        keyExtractor={item => item.id}
        bounces={false}
        data={userData}
        renderItem={({item}) => {
          return (
            <SafeAreaView>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Tap me!"
                style={[styles.mainBox, styles.shadowProp]}
                onPress={() => {
                  setModalVisible(!isModalVisible);
                  setModalUserData(item);
                }}>
                <LinearGradient
                  style={styles.linearGradientStyle}
                  colors={[
                    colorConstant.lightRed,
                    colorConstant.lightOrange,
                    colorConstant.lightYellow,
                    colorConstant.lightGreen,
                    colorConstant.lightBlue,
                    colorConstant.lightPurple,
                  ]}
                  start={{x: 1.2, y: 0.5}}
                  end={{x: 0.1, y: 1.4}}>
                  <LinearGradient
                    style={styles.circleImageStyleView}
                    colors={[
                      colorConstant.lightPurple,
                      colorConstant.lightBlue,
                      colorConstant.lightGreen,
                      colorConstant.lightYellow,
                      colorConstant.lightOrange,
                      colorConstant.lightRed,
                    ]}
                    start={{x: 0.1, y: 0.25}}
                    end={{x: 1, y: 0.95}}>
                    <Image
                      source={{uri: item.image}}
                      style={{
                        height: hp(10),
                        width: hp(10),
                        alignSelf: 'center',
                      }}
                    />
                  </LinearGradient>
                  <Text style={styles.maidenNameTextStyle}>
                    {search ? (
                      <HighlightText
                        highlightStyle={{
                          backgroundColor: 'yellow',
                          fontWeight: '600',
                        }}
                        autoEscape={true}
                        searchWords={[...search]}
                        textToHighlight={item.username}
                      />
                    ) : (
                      item.username
                    )}
                  </Text>
                  <DetailsStyle
                    text="Email"
                    space={wp(3)}
                    weight={'600'}
                    isValue={true}
                    details={item.email}
                  />
                  <DetailsStyle
                    text="Phone"
                    details={item.phone}
                    space={wp(1)}
                    weight={'600'}
                    isValue={true}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </SafeAreaView>
          );
        }}
      />
      {/* ---------------------------------------------------------> Modal  ......................................................... */}
      <ReactNativeModal
        animationIn={'slideInUp'}
        animationInTiming={2000}
        isVisible={isModalVisible}
        backdropOpacity={0.8}
        style={styles.modalStyle}
        onBackdropPress={() => {
          setModalVisible(!isModalVisible);
        }}>
        <SafeAreaView style={styles.modalViewStyle}>
          <View style={styles.headerView}>
            <Text style={styles.modalHeaderNameStyle}>
              {modalUserData?.username}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.cancleView}
            onPress={() => {
              setModalVisible(!isModalVisible);
            }}>
            <Image
              source={imageConstant.backClose}
              style={styles.crossStyleVew}
            />
          </TouchableOpacity>
          <LinearGradient
            style={{
              ...styles.circleImageStyleView,
              marginTop: hp(1.5),
              borderRadius: hp(2),
            }}
            colors={[
              colorConstant.lightPurple,
              colorConstant.lightBlue,
              colorConstant.lightGreen,
              colorConstant.lightYellow,
              colorConstant.lightOrange,
              colorConstant.lightRed,
            ]}
            start={{x: 0.1, y: 0.25}}
            end={{x: 1, y: 0.95}}>
            <Image
              source={{uri: modalUserData?.image}}
              style={{height: hp(10), width: hp(10), alignSelf: 'center'}}
            />
          </LinearGradient>
          <View style={styles.detailsMainView}>
            <DetailsStyle
              text="name"
              details={`${modalUserData?.firstName} ${modalUserData?.lastName} ${modalUserData?.maidenName}`}
            />
            <DetailsStyle text="email" details={modalUserData?.email} />
            <DetailsStyle text="phoneNo" details={modalUserData?.phone} />
            <DetailsStyle text="age" details={modalUserData?.age} />
            <DetailsStyle text="gender" details={modalUserData?.gender} />
            <DetailsStyle text="birthDate" details={modalUserData?.birthDate} />
            <DetailsStyle text="height" details={modalUserData?.height} />
            <DetailsStyle text="weight" details={modalUserData?.weight} />
            <DetailsStyle
              text="bloodGroup"
              details={modalUserData?.bloodGroup}
            />
            <DetailsStyle
              text="address"
              details={`${modalUserData?.address?.address},\n${modalUserData?.address?.city}, ${modalUserData?.address?.state}`}
            />
            <Text style={styles.modalHeader}>University Details</Text>
            <DetailsStyle text="name" details={modalUserData?.university} />
            <Text style={styles.modalHeader}>Company Details</Text>
            <DetailsStyle text="name" details={modalUserData?.company?.name} />
            <DetailsStyle
              text="department"
              details={modalUserData?.company?.department}
            />
            <DetailsStyle text="post" details={modalUserData?.company?.title} />
            <DetailsStyle
              text="address"
              details={`${modalUserData?.company?.address?.address},${modalUserData?.company?.address?.city},\n${modalUserData?.company?.address?.state}`}
            />
          </View>
        </SafeAreaView>
      </ReactNativeModal>

      <ReactNativeModal
        animationIn={'slideInUp'}
        animationInTiming={2000}
        isVisible={isFilterModalVisible}
        backdropOpacity={0.8}
        style={{...styles.modalStyle, marginTop: hp(25)}}
        onBackdropPress={() => {
          setFilterModalVisible(!isFilterModalVisible);
        }}>
        <View style={styles.modalViewStyle}>
          <View style={styles.filterView}>
            <Text style={styles.filterText}>Filter</Text>
          </View>
          <TouchableOpacity
            style={styles.filterback}
            onPress={() => {
              setFilterModalVisible(!isFilterModalVisible);
            }}>
            <Image
              source={imageConstant.backClose}
              style={styles.crossStyleVew}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.applyView}
            onPress={() => {
              setFilter(typeOfGender, typeOfBloodGroup, ageNumber);
              setAgeSet('');
              setFilterModalVisible(!isFilterModalVisible);
              setTypeOfBloodGroup('');
              setTypeOfGender('');
              setAgeNumber('');
            }}>
            <Text style={{fontSize: fontSize(20), fontWeight: '500'}}>
              Apply
            </Text>
          </TouchableOpacity>
          <Text style={{...styles.genderTextStyle, marginTop: hp(2.7)}}>
            Gender
          </Text>
          {/* -------------------------------------------------------------------------------------> GENDER ---------------------------------> */}
          <FlatList
            data={gender}
            horizontal={true}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    ...styles.buttonView,
                    backgroundColor:
                      typeOfGender === item ? '#a5e6e8' : 'white',
                  }}
                  onPress={() => {
                    typeOfGender === item
                      ? setTypeOfGender('')
                      : setTypeOfGender(item);
                  }}>
                  <Text>{item} </Text>
                </TouchableOpacity>
              );
            }}
          />
          <Text style={styles.genderTextStyle}>Age</Text>
          <TextInput
            style={styles.inputView}
            onChangeText={text => {
              setAgeSet(text);
            }}
            value={ageSet}
          />
          {/* ------------------------------------------------------------------------------------> AGE ------------------------------------> */}
          <FlatList
            data={age}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{
                      ...styles.buttonView,
                      backgroundColor: ageNumber === item ? '#a5e6e8' : 'white',
                    }}
                    onPress={() => {
                      ageNumber === item
                        ? setAgeNumber('')
                        : setAgeNumber(item);
                    }}>
                    <Text>{'age ' + item} </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          <Text style={styles.genderTextStyle}>Blood Group</Text>
          {/* --------------------------------------------------------------------------------------> bloodGroup ---------------------------> */}
          <FlatList
            data={bloodGroup} // horizontal={true}
            bounces={false}
            numColumns={3}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    ...styles.buttonView,
                    backgroundColor:
                      typeOfBloodGroup === item ? '#a5e6e8' : 'white',
                  }}
                  onPress={() => {
                    typeOfBloodGroup === item
                      ? setTypeOfBloodGroup('')
                      : setTypeOfBloodGroup(item);
                  }}>
                  <Text>{item} </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerPartView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(100),
  },
  backButtonStyle: {
    fontWeight: '600',
    fontSize: fontSize(30),
    marginLeft: wp(7),
    color: 'black',
  },
  filterStyle: {
    height: hp(4),
    width: hp(4),
    marginRight: wp(2.9),
  },
  userListTextView: {
    fontSize: fontSize(35),
    alignSelf: 'center',
    fontWeight: '600',
    color: 'black',
  },
  backGroundStyle: {
    backgroundColor: colorConstant.searchColor,
    height: hp(5),
    borderRadius: hp(2),
    marginHorizontal: wp(4.5),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
    marginBottom: hp(3),
  },
  iconStyle: {
    height: hp(3.2),
    width: hp(3.2),
    marginHorizontal: wp(2.5),
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
    // alignSelf: 'center',
    // backgroundColor: 'red',
  },
  mainBox: {
    borderRadius: hp(1),
    marginBottom: hp(2),
    // backgroundColor: 'white',
    marginHorizontal: wp(6),
  },
  shadowProp: {
    shadowOffset: {width: 6, height: 5},
    shadowColor: '#475252',
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  linearGradientStyle: {
    borderRadius: 5,
    flex: 1,
    padding: wp(2.5),
    justifyContent: 'flex-end',
    shadowOffset: {height: 2, width: 0},
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  circleImageStyleView: {
    alignSelf: 'center',
    height: wp(25),
    width: wp(25),
    borderRadius: hp(10),
    marginBottom: hp(1),
    borderWidth: 1,
    borderColor: 'white',
  },
  maidenNameTextStyle: {
    fontSize: fontSize(20),
    fontWeight: '600',
    // fontVariant: ['small-caps'],
    alignSelf: 'center',
  },
  maidenHighlightTextNameTextStyle: {
    fontSize: fontSize(20),
    fontWeight: '600',
    alignSelf: 'center',
    backgroundColor: 'yellow',
  },
  modalStyle: {
    backgroundColor: 'white',
    margin: 0,
    marginTop: hp(15),
    borderRadius: hp(2),
    paddingHorizontal: hp(1),
    paddingTop: hp(1),
  },
  modalViewStyle: {
    flex: 1,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancleView: {
    position: 'absolute',
    height: hp(3.5),
    width: hp(3.5),
    borderWidth: 1.6,
    marginTop: hp(0.9),
    marginLeft: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(3),
  },
  crossStyleVew: {
    height: hp(1.5),
    width: hp(1.5),
  },
  modalHeaderNameStyle: {
    fontSize: fontSize(35),
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  detailsMainView: {
    marginTop: hp(1),
    flex: 1,
    // paddingLeft: wp(2),
  },
  modalHeader: {
    color: '#b3c0c4',
    fontSize: fontSize(22),
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  filterHeaderViewStyle: {
    fontSize: fontSize(30),
    alignSelf: 'center',
  },
  searchStyle: {
    borderWidth: 1.6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(3),
    height: hp(2.8),
    width: hp(2.8),
    marginRight: wp(3),
  },
  filterback: {
    position: 'absolute',
    height: hp(3.5),
    width: hp(3.5),
    borderWidth: 1.6,
    marginTop: hp(0.3),
    marginLeft: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(3),
  },
  filterView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    fontSize: fontSize(35),
    alignSelf: 'center',
    fontWeight: '500',
  },
  applyView: {
    position: 'absolute',
    top: 1,
    right: wp(2),
    marginTop: hp(0.5),
  },
  genderTextStyle: {
    fontSize: fontSize(25),
    marginLeft: wp(1),
  },
  maleButtonView: {
    borderWidth: 1,
    height: hp(4.5),
    width: wp(25),
    borderRadius: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp(5),
  },
  inputView: {
    height: hp(4.5),
    marginHorizontal: wp(3),
    marginTop: hp(1.4),
    backgroundColor: '#E2E2E2',
    borderRadius: hp(1),
    paddingLeft: wp(3),
  },
  buttonView: {
    borderWidth: 1,
    height: hp(4.5),
    width: wp(25),
    borderRadius: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp(5),
    marginTop: hp(2.4),
  },
});

export default ApiCalling;
