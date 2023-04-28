import {View, Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
const Progress = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  const progress1 = useRef(new Animated.Value(0)).current;
  const progress2 = useRef(new Animated.Value(0)).current;
  const progress3 = useRef(new Animated.Value(0)).current;

  const start1 = () => {
    Animated.timing(progress1, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const start2 = () => {
    Animated.timing(progress2, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const start3 = () => {
    Animated.timing(progress3, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{flex: 1}}>
      <View style={{width: '100%', alignItems: 'center', padding: 50}}>
        <View style={{...styles.viewStyle ,backgroundColor: selectedStep > 0 ? 'green' : '#f2f2f2'}}>
          <Text style={styles.number}>1</Text>
        </View>

        <View style={{width: 6,height: 100,backgroundColor: '#f2f2f2'}}></View>

        <View style={{...styles.viewStyle ,backgroundColor: selectedStep > 1 ? 'green' : '#f2f2f2'}}>
          <Text style={styles.number}>2</Text>
        </View>

        <View style={{width: 6,height: 100,backgroundColor: '#f2f2f2'}}></View>

        <View style={{...styles.viewStyle ,backgroundColor: selectedStep > 2 ? 'green' : '#f2f2f2'}}>
          <Text style={styles.number}>3</Text>
        </View>

        <View style={{width: 6,height: 100,backgroundColor: '#f2f2f2'}}></View>
        
        <View style={{...styles.viewStyle ,backgroundColor: selectedStep > 3 ? 'green' : '#f2f2f2'}}>
          <Text style={styles.number}>4</Text>
        </View>
      </View>
      <View style={{width: '100%',alignItems: 'center',padding: 50,position: 'absolute',top: 0}}>
        <Animated.View style={{...styles.columnStyle,height: progress1}}></Animated.View>
        <Animated.View style={{...styles.columnStyle,height: progress2}}></Animated.View>
        <Animated.View style={{...styles.columnStyle,height: progress3}}></Animated.View>
      </View>
      <TouchableOpacity style={styles.nextStepViewStyle}
        onPress={() => {
          if (selectedStep == 1) start1()
          if (selectedStep == 2) start2();
          if (selectedStep == 3) start3();
          if (selectedStep == 0) setSelectedStep(selectedStep + 1);
         else {
            setTimeout(() => {
              setSelectedStep(selectedStep + 1);
            }, 1000);
          }
        }}>
        <Text>Next Step</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    viewStyle:{ width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }, 
    number: { color: '#fff'}, 
    columnStyle:{width: 6, marginTop: 30, backgroundColor: 'green' },
    nextStepViewStyle:{marginTop: 100, height: 50, width: 200, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', borderRadius: 10, alignSelf: 'center'}
});
export default Progress;
