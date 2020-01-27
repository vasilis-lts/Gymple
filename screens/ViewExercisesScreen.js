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
const ViewExercisesScreen = ({navigation}) => {
  const [Exercises, setExercises] = useState([]);

  useEffect(() => {
    getExercises();
    return () => {
      // cleanup
    };
  }, []);

  const getExercises = () => {
    const _Exercises = navigation.getParam('Exercises');
    setExercises(_Exercises);

    console.log(_Exercises[0]);
  };

  const goToExerciseDetails = Exercise => {
    navigation.push('ExerciseDetails', {
      Exercise,
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView keyExtractor={exercise => `${exercise.id}`}>
          {Exercises.map(exercise => (
            <TouchableOpacity
              onPress={() => goToExerciseDetails(exercise)}
              key={`${exercise.id}`}
              style={styles.exercise}>
              <Text style={styles.Name}>{exercise.Name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

ViewExercisesScreen.navigationOptions = {
  title: 'Exercises',
  // headerRight: () => (
  //   <Text style={{marginRight: 10, color: 'white'}} onPress={() => testFunc()}>
  //     Add New
  //   </Text>
  //
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  exercise: {
    backgroundColor: 'black',
    paddingLeft: 5,
    marginTop: 2,
    marginHorizontal: 2,
  },

  Name: {
    fontSize: 32,
    color: '#0f9',
  },
});

export default ViewExercisesScreen;
