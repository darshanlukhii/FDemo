import React, { useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { imageConstant } from '../../helper/imageConstant';

const AnimatedButton = () => {
  const [animation] = useState(new Animated.Value(0));
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const firstButtonStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70],
        }),
      },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70],
        }),
      },
    ],
  };

  const secondButtonStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70],
        }),
      },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 70],
        }),
      },
    ],
  };

  const thirdButtonStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 70],
        }),
      },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
  };

  const containerStyle = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button]} onPress={handlePress}>
        <ImageBackground source={imageConstant.Favourite} style={[styles.view]}>
        <Animated.View style={[styles.firstButton, firstButtonStyle,]}>
            <Image source={imageConstant.Favourite} style={{height:40, width:40}}/>
        </Animated.View>
        <Animated.View style={[styles.secondButton, secondButtonStyle]} >
            <Image source={imageConstant.Favourite} style={{height:40, width:40}}/>
        </Animated.View>
        <Animated.View style={[styles.thirdButton, thirdButtonStyle]} >
            <Image source={imageConstant.Favourite} style={{height:40, width:40}}/>
        </Animated.View>
        {/* <Animated.View style={[styles.button, containerStyle]}>
          <View style={styles.icon} />
        </Animated.View> */}
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  view:{height:40, width:40,},
  firstButton: {
    width: 50,
    height: 50,
    borderRadius: 5,
    // backgroundColor: 'red',
    position: 'absolute',
  },
  secondButton: {
    width: 50,
    height: 50,
    borderRadius: 5,
    position: 'absolute',
  },
  thirdButton: {
    width: 50,
    height: 50,
    borderRadius: 5,
    position: 'absolute',
  },
  icon: {
    width: 24,
    height: 24,
    backgroundColor: 'white',
    borderRadius: 12,
  },
});

export default AnimatedButton;
