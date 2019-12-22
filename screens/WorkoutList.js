import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';

const DATA = [
  {
    id: '1',
    title: 'Chest',
  },
  {
    id: '2',
    title: 'Πόδια',
  },
];

let testFunc;

const WorkoutList = ({navigation}) => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    storeDataToAsyncStorage();

    // getDatabase();
  }, []);

  const getDatabase = async () => {
    //
    // Read the users documents
    const querySnapshot = await firestore()
      .collection('workouts')
      .doc('MG0birRAbwVFUaHZWmng98sAt203')
      .get();

    const workoutArray = [...Object.values(querySnapshot.data())];

    console.log(workoutArray);
  };

  const writeDatabase = () => {
    firestore()
      .collection('workouts')
      .doc('MG0birRAbwVFUaHZWmng98sAt203')
      .set({
        1: 'Ώμοι',
        2: 'Στήθος',
      })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef);
      })
      .catch(function(error) {
        console.log('Error adding document: ', error);
      });
  };

  const storeDataToAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('Tasks', JSON.stringify(DATA));
      retrieveData();
    } catch (error) {
      // Error saving data
      alert('Error saving data');
    }
  };

  const retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem('Tasks');
      if (data !== null) {
        // We have data!!
        setData(JSON.parse(data));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  testFunc = () => {
    navigation.navigate('CreateWorkoutWizard');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={Data}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </>
  );
};

WorkoutList.navigationOptions = {
  title: 'Home',
  headerRight: () => (
    <Text style={{marginRight: 10}} onPress={() => testFunc()}>
      New
    </Text>
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#00f',
    padding: 20,
    marginTop: 2,
    marginHorizontal: 2,
  },

  title: {
    fontSize: 32,
    color: '#0f9',
  },
});

export default WorkoutList;
