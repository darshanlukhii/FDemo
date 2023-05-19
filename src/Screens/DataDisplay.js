import React from 'react';
import {SafeAreaView} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';

const DataDisplay = () => {
  const data = [
    {label: '1'},
    {label: '2'},
    {label: '3'},
    {label: '4'},
    {label: '5'},
    {label: '6'},
    {label: '7'},
    {label: '8'},
    {label: '9'},
    {label: '10'},
    {label: '11'},
    {label: '12'},
    {label: '13'},
    {label: '14'},
    {label: '15'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text>{item.label}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    margin: 5,
    width: '30%',
    height: 100,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: 'pink',
    justifyContent: 'center',
  },
});

export default DataDisplay;
