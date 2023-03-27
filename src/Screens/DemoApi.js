import axios from 'axios';
import React, {Component, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {makeAPIRequest} from '../helper/GlobalFunctions';

const DemoApi = () => {
  useEffect(() => {
    // getData();
    addNewProduct();
    // putData();
    // patchData();
    // deleteData();
  });
  // ----------------------------------------------------------------------> (get)Get a new data ------------------------------------------------>

  // const getData = async () => {
  //   makeAPIRequest({
  //     method: 'get',
  //     // headers: {
  //     //   Authorization: 'Bearer',
  //     //   'Content-Type': 'application/json',
  //     // },
  //     baseURL: 'https://fakestoreapi.com/users?sort=desc',
  //   }).then(res => {
  //     console.log('getData', res?.data);
  //   });
  // };

  // ----------------------------------------------------------> (Post)Add a new data ------------------------------------------------>
  const addNewProduct = async () => {
    const data = {
      email: 'John@gmail.com',
    };
    makeAPIRequest({
      method: 'post',
      data: data,
      baseURL: 'https://fakestoreapi.com/users',
    }).then(res => {
      console.log('addNewProduct ', res?.data);
    });
  };

  // ------------------------------------------------------------------------> (Put)Change data ------------------------------------------------>

  // const putData = async () => {
  //   const data = {
  //     userId: 7,
  //     date: 2019 - 12 - 10,
  //     products: [{productId: 1, quantity: 3}],
  //   };
  //   makeAPIRequest({
  //     method: 'put',
  //     data: data,
  //     baseURL: 'https://fakestoreapi.com/carts/5',
  //   }).then(res => {
  //     console.log('Put ===================>', res.data);
  //   });
  //   getData();
  // };
  // const patchData = async () => {
  //   const data = {
  //     title: 'new Name',
  //     price: 13.5,
  //     description: 'lorem ipsum set',
  //     image: 'https://i.pravatar.cc',
  //     category: 'electronic',
  //   };
  //   makeAPIRequest({
  //     method: 'patch',
  //     data: data,
  //     baseURL: 'https://fakestoreapi.com/products/7',
  //   }).then(res => {
  //     console.log('Patch ===================>', res.data);
  //   });
  // };

  // const deleteData = async () => {
  //   makeAPIRequest({
  //     method: 'delete',
  //     baseURL: 'https://fakestoreapi.com/products/6',
  //   }).then(res => {
  //     console.log('delete ===================>', res.data);
  //   });
  // };

  return (
    <View style={styles.container}>
      <Text>DemoApi</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

export default DemoApi;
