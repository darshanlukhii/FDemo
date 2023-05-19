import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {fontSize, hp, wp} from '../helper/primaryConstant';
import {imageConstatnt} from '../helper/imageConstatnt';

const Header = ({
  text,
  isTrue,
  onPress,
  source,
  isFalse,
  isNotification,
  sourceNotification,
  onPressNotification,
}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.headerStyle}>
      {isFalse ? null : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
          style={styles.drawerStyle}>
          <Image source={imageConstatnt.menu} style={styles.headerIcon} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerText}>{text}</Text>
      {isTrue ? (
        <TouchableOpacity style={styles.messageIconStyle} onPress={onPress}>
          <Image source={source} style={{height: hp(2.7), width: hp(2.7)}} />
        </TouchableOpacity>
      ) : null}
      {isNotification ? (
        <TouchableOpacity
          style={{position: 'absolute', right: wp(12), bottom: wp(0.8)}}
          onPress={onPressNotification}>
          <Image
            source={sourceNotification}
            style={{height: hp(2.7), width: hp(2.7)}}
          />
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 80,
    width: '100%',
  },
  headerIcon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  headerText: {
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: fontSize(23),
    color: 'black',
  },
  drawerStyle: {
    position: 'absolute',
    bottom: wp(1),
    left: 0,
  },
  messageIconStyle: {
    position: 'absolute',
    right: wp(3),
    bottom: wp(0.8),
  },
});

export default Header;
