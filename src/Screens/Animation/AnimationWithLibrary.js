import React, { Component, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';


const AnimationWithLibrary = () => {
    const [animate, setAnimate] = useState(false);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { setAnimate(!animate) }}>
            <Animatable.Text animation={animate ? 'swing' : 'bounceOutLeft'} iterationCount={animate ? 2 : 1} direction="alternate-reverse" style={{color:'white'}}>Up and down you go</Animatable.Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setAnimate(!animate) }}>
           <Animatable.Text animation="pulse" easing="linear" iterationCount="infinite" style={{ textAlign: 'center', fontSize:50 }}> ❤️ </Animatable.Text>
            </TouchableOpacity>
           <TouchableOpacity onPress={() => { setAnimate(!animate) }}>
           <Animatable.View style={styles.card} animation={animate ? 'slideInUp' : 'bounceOut' }iterationCount={animate ? 2 : 1} direction="alternate-reverse">
                <Text style={styles.whiteText}>slideInDown Animation</Text>
            </Animatable.View>
           </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    card:{
        height:90,
        width:200,
        backgroundColor:'pink',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    }
});


export default AnimationWithLibrary;
