import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {getAsyncStorageItem} from '../AsyncStorage';

let testFunc;

const WorkoutList = ({navigation}) => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    getWorkouts();

    // getDatabase();
  }, []);

  const getWorkouts = async () => {
    const workouts = await getAsyncStorageItem('Workouts');
    console.log(workouts);
    setData(workouts);
  };

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

  testFunc = () => {
    navigation.navigate('CreateWorkoutWizard');
  };

  const goToWorkoutMuscleGroups = id => {
    navigation.push('WorkoutMuscleGroupsScreen', {
      WorkoutId: id,
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView keyExtractor={item => `${item.id}`}>
          {Data.map(item => (
            <TouchableOpacity
              // onPress={() => alert('pressed!')}
              key={`${item.id}`}
              style={styles.item}
              onPress={() => goToWorkoutMuscleGroups(item.id)}>
              <Text style={styles.Name}>{item.Name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

WorkoutList.navigationOptions = {
  title: 'Your Workouts',
  headerRight: () => (
    <Text style={{marginRight: 10, color: 'white'}} onPress={() => testFunc()}>
      Add New
    </Text>
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'black',
    padding: 20,
    marginTop: 2,
    marginHorizontal: 2,
  },

  Name: {
    fontSize: 32,
    color: '#0f9',
  },
});

export default WorkoutList;
