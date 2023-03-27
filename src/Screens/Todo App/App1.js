import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import database from '@react-native-firebase/database';

const App1 = () => {
  const [inputTextValue, setInputTextValue] = useState('');
  const [list, setList] = useState('');
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  useEffect(() => {
    getdataBase();
    // database()
    //   .ref('/todo/')
    //   .on('value', snapshot => {
    //     console.log('User data: ', snapshot.val());
    //   });
  }, []);

  // ------------------------------------- >>>>> This is for change data <<<<< ------------------------------------- //
  const getdataBase = async () => {
    try {
      const data = await database()
        .ref('todo')
        .on('value', temp => {
          console.log('Firebase Value :::-------------->> ', temp.val());
          setList(temp.val());
        });
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------------------------- >>>>> This is for Add(Set)data <<<<< ------------------------------------- //
  const handleAddData = async () => {
    try {
      if (inputTextValue.length > 0) {
        const index = list.length;
        console.log('Index ............ ::::', index);
        const response = await database().ref(`todo/${index}`).set({
          value: inputTextValue,
        });
        setInputTextValue('');
      } else {
        Alert.alert('Please Enter The Value .......');
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ------------------------------------- >>>>> This is for Updatedata <<<<< ------------------------------------- //
  const handleUpdateData = async () => {
    try {
      if (inputTextValue.length > 0) {
        const UpdateData = await database()
          .ref(`todo/${selectedCardIndex}`)
          .update({
            value: inputTextValue,
          });
        setInputTextValue('');
        setIsUpdateData(false);
      } else {
        Alert.alert('Please Fill The Value .......');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------------------- >>>>> This is for get index and data and make a one function <<<<< ------------------------- //
  const handleCardPress = (cardIndex, cardValue) => {
    try {
      setIsUpdateData(true);
      setSelectedCardIndex(cardIndex);
      console.log('cardIndex :: ', cardIndex);
      setInputTextValue(cardValue);
      console.log('cardValue :: ', cardValue);
    } catch (error) {
      console.log(error);
    }
  };
  // ------------------------------------- >>>>> This is for Delete data <<<<< ------------------------------------- //
  const handleCardLongPress = (cardIndex, cardValue) => {
    try {
      Alert.alert(
        'Alert',
        `Are You Sure To Delete\n'${cardIndex}-${cardValue}'`,
        [
          {
            text: 'Cancle',
            onPress: () => {
              console.log('Cancle Is Press');
            },
          },
          {
            text: 'Ok',
            onPress: async () => {
              try {
                const deleteData = await database()
                  .ref(`todo/${cardIndex}`)
                  .remove();
                console.log(deleteData);
                setInputTextValue('');
                setIsUpdateData(false);
              } catch (error) {
                console.log(error);
              }
            },
          },
        ],
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            fontVariant: ['small-caps'],
          }}>
          Details
        </Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Any Value"
          value={inputTextValue}
          onChangeText={value => setInputTextValue(value)}
        />
        {/* ------> this is Add data */}
        {/* <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddData()}>
          <Text style={{color: '#fff'}}>Add</Text>
        </TouchableOpacity> */}
        {!isUpdateData ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddData()}>
            <Text style={{color: '#fff'}}>Add</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleUpdateData()}>
            <Text style={{color: '#fff'}}>UpDate</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.cardContainer}>
        <Text style={{marginVertical: 20, fontSize: 20, fontWeight: 'bold'}}>
          Todo List
        </Text>

        <FlatList
          data={list}
          renderItem={item => {
            const index = item.index;
            const value = item.item.value;
            if (item.item !== null) {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => {
                    handleCardPress(index, value);
                  }}
                  onLongPress={() => handleCardLongPress(index, value)}>
                  <Text>value :: {value}</Text>
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputBox: {
    width: 320,
    borderRadius: 15,
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
  },
  addButton: {
    backgroundColor: '#5AB9C1',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
  },
  cardContainer: {
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: 320,
    padding: 20,
    borderRadius: 30,
    marginVertical: 10,
  },
});

export default App1;
