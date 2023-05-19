import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {fontSize} from '../helper/primaryConstant';

const ProfileComponent = ({number, title, isTrue, onPress}) => {
  return isTrue ? (
    <View style={styles.container}>
      <Text style={styles.numberText}>{number}</Text>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  ) : (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.numberText}>{number}</Text>
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: fontSize(18),
    fontWeight: '700',
  },
  titleText: {
    fontSize: fontSize(15),
    fontWeight: '400',
  },
});

export default ProfileComponent;
