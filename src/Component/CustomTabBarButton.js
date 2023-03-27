import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const CustomTabBarButton = ({children, accessibilityState, onPress}) => {
  // const {children, accessibilityState, onPress} = props;

  if (accessibilityState.selected) {
    return (
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={[styles.activeBtn]}>
          <Text>{children}</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[styles.inactiveBtn]}>
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  activeBtn: {
    flex: 1,
    top: -22,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
  inactiveBtn: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CustomTabBarButton;
