import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Btn = ({btnLabel, bgColor, textColor, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: bgColor,
        height: 45,
        width: 280,
        paddingVertical: 5,
        marginBottom: 20,
      }}>
      <Text
        style={{
          color: textColor,
          fontWeight: 'bold',
          fontVariant: ['small-caps'],
        }}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
};

export default Btn;
