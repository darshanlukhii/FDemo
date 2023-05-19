import React from 'react';
import {Image, StyleSheet} from 'react-native';

import {DrawerItem} from '@react-navigation/drawer';

import {hp} from '../helper/primaryConstant';

const DrawerItems = ({DrawerStyle, label, source, onPress}) => {
  return (
    <DrawerItem
      style={DrawerStyle}
      label={label}
      icon={() => <Image style={styles.imageIconStyle} source={source} />}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIconStyle: {
    height: hp(2.7),
    width: hp(2.7),
  },
});

export default DrawerItems;
