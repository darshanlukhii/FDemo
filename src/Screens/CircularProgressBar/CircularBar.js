import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const CircularBar = () => {
  const [run, setRun] = useState(0);
  return (
    <View style={styles.container}>
      <Text
        style={{color: 'white'}}
        onPress={() => {
          setRun(run == 0 ? 100 : run == 100 ? 50 : run == 50 ? 180 : 0);
        }}>
        CircularBar
      </Text>
      <CircularProgress
        value={run}
        radius={120}
        duration={2000}
        progressValueColor={'blue'}
        maxValue={200}
        // title={'KM/H'}
        titleColor={'blue'}
        titleStyle={{fontWeight: 'bold'}}
        activeStrokeColor="blue"
        activeStrokeSecondaryColor="#C25AFF"
        inActiveStrokeColor="white"
        inActiveStrokeOpacity={0.3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default CircularBar;
