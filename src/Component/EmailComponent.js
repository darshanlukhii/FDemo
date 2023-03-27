//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {imageConstatnt} from '../helper/imageConstatnt';
import {hp, wp} from '../helper/primaryConstant';

// create a component
const EmailComponent = ({text}) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Image source={imageConstatnt.dot} style={styles.dotImage} />
          <Text style={styles.textStyle}>{text}</Text>
        </View>
        <View style={styles.mailView}>
          <Image style={styles.mailStyle} source={imageConstatnt.email} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: hp(5.41),
    flexDirection: 'row',
    paddingLeft: wp(4.8),
    justifyContent: 'space-between',
  },
  dotImage: {
    marginTop: hp(1.35),
  },
  textStyle: {
    marginLeft: wp(2.13),
    fontWeight: '400',
    fontSize: 14,
    color: 'rgba(242, 242, 242, 1)',
    marginTop: hp(1.35),
  },
  mailView: {
    borderWidth: 1,
    height: hp(3.44),
    width: wp(7.46),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(42, 62, 63, 1)',
    borderRadius: hp(2),
    marginTop: hp(0.98),
    marginRight: wp(6.4),
  },
  mailStyle: {},
});

export default EmailComponent;
