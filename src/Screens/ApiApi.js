import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {makeAPIRequest} from '../helper/GlobalFunctions';
import {fontSize, hp, wp} from '../helper/primaryConstant';

const ApiApi = () => {
  const [data, setData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    makeAPIRequest({
      method: 'get',
      baseURL: 'https://fakestoreapi.com/users',
    }).then(response => setData(response.data));
  };

  const limitData = () => {
    makeAPIRequest({
      method: 'get',
      baseURL: 'https://fakestoreapi.com/users?limit=5',
    }).then(res => {
      // console.log('getData', res?.data);
      setData(res?.data);
    });
  };

  const updateData = id => {
    const update = {
      email: 'John@gmail.com',
      username: 'johnd',
      password: 'm38rmF$',
      name: {
        firstname: 'John',
        lastname: 'Doe',
      },
      uri: 'https://images.freeimages.com/images/large-previews/695/ps-uri-4-1350817.jpg',
      address: {
        city: 'kilcoole',
        street: '7835 new road',
        number: 3,
        zipcode: '12926-3874',
        geolocation: {
          lat: '-37.3159',
          long: '81.1496',
        },
      },
      phone: '1-570-236-7033',
    };
    makeAPIRequest({
      method: 'patch',
      data: update,
      baseURL: `https://fakestoreapi.com/users/${id}`,
    }).then(response =>
      setData(() => data.map(item => (item.id === id ? response.data : item))),
    );
  };

  const deleteData = () => {
    makeAPIRequest({
      method: 'delete',
      baseURL: 'https://fakestoreapi.com/users',
    }).then(res => {
      console.log('deleteData', res?.data);
      setData(res?.data);
      console.log('data -------------------------------', data);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={styles.limitButtonView}
          onPress={() => {
            limitData();
            setUpdatedData('');
          }}>
          <Text>Limit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.limitButtonView} onPress={() => {}}>
          <Text>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.limitButtonView}
          onPress={() => {
            updateData();
            setData('');
          }}>
          <Text>UpDate</Text>
        </TouchableOpacity>
      </View> */}
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          console.log('updateitem --->', item);
          return (
            <View>
              <TouchableOpacity
                style={styles.mainHeader}
                onPress={() => {
                  updateData(item.id);
                }}>
                <View
                  style={{
                    height: hp(7),
                    width: hp(7),
                    borderWidth: 1,
                    borderRadius: hp(1),
                    marginTop: hp(2),
                    marginBottom: hp(1),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item.uri}}
                    style={{height: hp(6), width: hp(6)}}
                  />
                </View>
                <Text style={styles.headerTextStyle}>ID : {item.id}</Text>
                <Text style={styles.headerTextStyle}>
                  Name : {item?.name?.firstname} {item?.name?.lastname}
                </Text>
                <Text style={styles.headerTextStyle}>Email : {item.email}</Text>
                <Text></Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: hp(2),
    // borderWidth: 1,
    // borderRadius: hp(2),
  },
  mainHeader: {
    borderWidth: 1,
    marginHorizontal: wp(7),
    marginBottom: hp(2),
    borderRadius: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(240, 146, 235,0.5)',
  },
  headerTextStyle: {
    fontSize: fontSize(17),
    fontWeight: '500',
    marginVertical: hp(0.5),
  },
  limitButtonView: {
    marginBottom: hp(1),
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderWidth: 1,
    width: wp(25),
    height: hp(4.5),
    justifyContent: 'center',
    borderRadius: hp(1),
    marginRight: wp(2),
    marginLeft: wp(2),
    backgroundColor: 'pink',
  },
});

//make this component available to the app
export default ApiApi;
