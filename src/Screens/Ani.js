import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, SafeAreaView, PanResponder } from 'react-native';

const Ani = () => {
    const position = new Animated.ValueXY({x: 0, y: 0})
    // Animated.spring(position,{
    //     toValue: {x: 100, y: 100},
    //     duration: 2000,
    //     // speed:2,
    //     // bounciness:40,
    //     useNativeDriver: true,
    // }).start()

    const pan = PanResponder.create({
        onMoveShouldSetPanResponder: () => true, 
        onPanResponderMove: Animated.event([ 
            null, 
            {dx: position.x, dy: position.y}
        ]), 
        onPanResponderRelease:() => {
            // position.setValue({x:0, y:0});
            Animated.spring(position,{
                toValue:{x:0, y:0},
                useNativeDriver: true,
                bounciness:20
            }).start()
        }
    })

    const rotate = position.x.interpolate({
        inputRange: [0, 10], outputRange: ['0deg', '90deg'],
    })

    return (
        <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Animated.View {...pan.panHandlers} style={{height:100, width:100, borderWidth:1, alignItems:'center', justifyContent:'center', backgroundColor:'red', 
            transform:[
                {translateX: position.x}, {translateY: position.y}, {rotate:rotate}
            ]}}>
                <Text>Animation</Text>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default Ani;

// import React, {useState, useEffect} from 'react';
// import {View, Text, StyleSheet, Animated} from 'react-native';

// const Ani = () => {
//   const [animation, setAnimation] = useState(new Animated.Value(0));

//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(animation, {
//           toValue: 1,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//         Animated.timing(animation, {
//           toValue: 0,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//       ]),
//     ).start();
//   }, []);

//   const animatedStyle = {
//     transform: [
//       {
//         translateY: animation.interpolate({
//           inputRange: [0, 1],
//           outputRange: [0, -10],
//         }),
//       },
//     ],
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.View style={[styles.box, animatedStyle]} />
//       <Text style={styles.text}>Animating the Box</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   box: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'red',
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
// });

// export default Ani;

// // import React, {useState, useRef} from 'react';
// // import {View, Animated, StyleSheet, TouchableOpacity, Text} from 'react-native';

// // const Ani = () => {
// //   const [animation, setAnimation] = useState(new Animated.Value(0));
// //   const animationRef = useRef(animation);

// //   const startAnimation = () => {
// //     Animated.timing(animationRef.current, {
// //       toValue: 1,
// //       duration: 1000,
// //       useNativeDriver: true,
// //     }).start(() => {
// //       Animated.timing(animationRef.current, {
// //         toValue: 0,
// //         duration: 300,
// //         useNativeDriver: true,
// //       }).start();
// //     });
// //   };

// //   const interpolatedAnimation = animationRef.current.interpolate({
// //     inputRange: [0, 1],
// //     outputRange: ['0deg', '360deg'],
// //   });

// //   return (
// //     <View style={styles.container}>
// //       <TouchableOpacity onPress={startAnimation}>
// //         <Text style={styles.buttonText}>Start Animation</Text>
// //       </TouchableOpacity>
// //       <Animated.View
// //         style={[styles.box, {transform: [{rotate: interpolatedAnimation}]}]}
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     backgroundColor: '#F5FCFF',
// //   },
// //   box: {
// //     width: 100,
// //     height: 100,
// //     backgroundColor: 'red',
// //   },
// //   buttonText: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //   },
// // });

// // export default Ani;

// // import React, {useState, useEffect, useRef} from 'react';
// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   Animated,
// //   Easing,
// //   TouchableOpacity,
// //   Image,
// // } from 'react-native';
// // import {imageConstant} from '../helper/imageConstant';
// // import {hp} from '../helper/primaryConstant';

// // const Ani = () => {
// //   const animationValue = useRef(new Animated.Value(0)).current;
// //   //   const [animationValue] = useState(new Animated.Value(0));

// //   const startAnimation = () => {
// //     Animated.timing(animationValue, {
// //       toValue: 1,
// //       //   delay: 300,
// //       duration: 1000,
// //       easing: Easing.cubic,
// //       useNativeDriver: true,
// //     }).start(() => {
// //       Animated.timing(animationValue, {
// //         toValue: 0,
// //         delay: 1000,
// //         duration: 1000,
// //         easing: Easing.bounce,
// //         useNativeDriver: true,
// //       }).start();
// //     });
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <TouchableOpacity onPress={startAnimation}>
// //         <View style={styles.button}>
// //           <Text style={styles.buttonText}>Animate me!</Text>
// //         </View>
// //       </TouchableOpacity>
// //       <Animated.View
// //         style={[
// //           styles.box,
// //           {
// //             transform: [{scaleY: animationValue}],
// //           },
// //         ]}>
// //         {/* <Image
// //           source={imageConstant.finger}
// //           style={[
// //             styles.imageStyle,
// //             {transform: [{scale: 3}]},
// //             // , {transform: [{scale: animationValue}]}
// //           ]}
// //         /> */}
// //       </Animated.View>
// //     </View>
// //   );
// // };
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     backgroundColor: '#F5FCFF',
// //   },
// //   button: {
// //     backgroundColor: '#4CAF50',
// //     borderRadius: 4,
// //     padding: 12,
// //   },
// //   buttonText: {
// //     color: 'white',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //   },
// //   box: {
// //     width: 100,
// //     height: 100,
// //     backgroundColor: 'orange',
// //     marginTop: 20,
// //   },
// //   imageStyle: {
// //     height: hp(5),
// //     width: hp(5),
// //     alignSelf: 'center',
// //     marginTop: 60,
// //   },
// // });

// // export default Ani;

// // import React, {useState, useEffect} from 'react';
// // import {View, Text, StyleSheet, Animated, Button, Image} from 'react-native';
// // import {imageConstant} from '../helper/imageConstant';
// // import {hp, wp} from '../helper/primaryConstant';

// // const Ani = () => {
// //   const [animation] = useState(new Animated.Value(0));
// //   const [a, setA] = useState(false);

// //   //   useEffect(() => {
// //   //     Animated.timing(animation, {
// //   //       toValue: 1,
// //   //       duration: 1000,
// //   //       useNativeDriver: true,
// //   //     }).start();
// //   //   }, []);

// //   const Fead_In = () => {
// //     Animated.timing(animation, {
// //       toValue: 20,
// //       duration: 5000,
// //       useNativeDriver: true,
// //     }).start();
// //   };
// //   const Fead_Out = () => {
// //     Animated.timing(animation, {
// //       toValue: 1,
// //       duration: 5000,
// //       useNativeDriver: true,
// //     }).start();
// //   };
// //   const spin = animation.interpolate({
// //     inputRange: [0, 1],
// //     outputRange: ['0deg', '360deg'],
// //   });

// //   const animatedStyles = {
// //     opacity: animation,
// //     transform: [
// //       {rotate: spin},
// //       //   {
// //       //     translateY: animation.interpolate({
// //       //       inputRange: [0, 1],
// //       //       outputRange: ['0deg', '360deg'],
// //       //     }),
// //       //   },
// //     ],
// //   };
// //   const animatedStylesStyle = {
// //     opacity: animation,
// //     transform: [
// //       {rotate: spin},
// //       {
// //         translateY: animation.interpolate({
// //           inputRange: [0, 1],
// //           outputRange: [100, 0],
// //         }),
// //       },
// //     ],
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={{flexDirection: 'row'}}>
// //         <Animated.View style={[styles.text, animatedStyles]}>
// //           <Image
// //             source={imageConstant.newMoon}
// //             style={{height: hp(10), width: hp(10)}}
// //           />
// //           <Text>Hello, React Native Animation!</Text>
// //         </Animated.View>
// //         <Animated.View style={[styles.text, animatedStyles]}>
// //           <Image
// //             source={imageConstant.newMoon}
// //             style={{height: hp(10), width: hp(10)}}
// //           />
// //           <Text>Hello, React Native Animation!</Text>
// //         </Animated.View>
// //       </View>
// //       <View style={{alignSelf: 'center', marginVertical: hp(10)}}>
// //         <Button onPress={Fead_In} title="ANIM" />
// //         <Button onPress={Fead_Out} title="Fead_Out" />
// //       </View>
// //       <View style={{flexDirection: 'row'}}>
// //         <Animated.View style={[styles.text, animatedStyles]}>
// //           <Image
// //             source={imageConstant.newMoon}
// //             style={{height: hp(10), width: hp(10)}}
// //           />
// //           <Text>Hello, React Native Animation!</Text>
// //         </Animated.View>
// //         <Animated.View style={[styles.text, animatedStyles]}>
// //           <Image
// //             source={imageConstant.newMoon}
// //             style={{height: hp(10), width: hp(10)}}
// //           />
// //           <Text>Hello, React Native Animation!</Text>
// //         </Animated.View>
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     marginTop: hp(10),
// //   },
// //   text: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     color: 'blue',
// //     marginHorizontal: hp(6),
// //   },
// // });

// // export default Ani;
