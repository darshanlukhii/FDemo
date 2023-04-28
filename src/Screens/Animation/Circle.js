//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

// create a component
const Circle = () => {
    const [opacity] = useState(new Animated.Value(0))

    const moveBall = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start()
    }
    const moveLeftBall = () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start()
    }
    return (
        <View style={styles.container}>
            <Animated.View style={[{height:100, width:100, backgroundColor:'red', borderRadius:50, opacity, }]}></Animated.View>
            <TouchableOpacity onPress={() => { moveBall() }}>
                <Text>Move</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { moveLeftBall() }}>
                <Text>Me</Text>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default Circle;
