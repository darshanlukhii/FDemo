import { useRoute } from '@react-navigation/native';
import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';
import { fontSize, hp } from '../helper/primaryConstant';


const WebView_1 = () => {
  const route = useRoute().params
  return (
    <View style={{flex: 1}}>
      <View style={{alignItems:'center', justifyContent:'flex-end', backgroundColor:'#6653D6' ,width:'100%', height:hp(10), paddingBottom:hp(1)}} >
        <Text style={{fontWeight:'700', fontVariant:['small-caps'], fontSize:fontSize(20), color:'#fff'}}>Web View</Text>
      </View>
      <WebView source={{uri: route}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WebView_1;
