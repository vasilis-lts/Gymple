import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {getAsyncStorageItem} from '../AsyncStorage';

const WorkoutMuscleGroupsScreen = ({navigation}) => {
  const [WorkoutExercises, setWorkoutExercises] = useState([]);
  const [MuscleGroups, setMuscleGroups] = useState([]);

  useEffect(() => {
    filterActiveMuscleGroups();
    return () => {
      // cleanup
    };
  }, []);

  const filterActiveMuscleGroups = async () => {
    // filter exercises of workout
    const WorkoutId = navigation.getParam('WorkoutId');
    const allExercises = await getAsyncStorageItem('Exercises');
    const exercises = allExercises.filter(
      exercise => exercise.WorkoutId === WorkoutId,
    );
    setWorkoutExercises(exercises);

    // get MuscleGroups from Exercises
    const MuscleGroups = [];
    exercises.forEach(exercise => {
      if (!MuscleGroups.includes(exercise.MuscleGroup)) {
        MuscleGroups.push(exercise.MuscleGroup);
      }
    });
    setMuscleGroups(MuscleGroups);
  };

  const goToExercisesScreen = muscleGroup => {
    const filteredByMuscleGroupExercises = WorkoutExercises.filter(
      exercise => exercise.MuscleGroup === muscleGroup,
    );

    navigation.push('ViewExercisesScreen', {
      Exercises: filteredByMuscleGroupExercises,
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView keyExtractor={item => `${item}`}>
          {MuscleGroups.map(item => (
            <TouchableOpacity
              onPress={() => goToExercisesScreen(item)}
              key={`${item}`}
              style={styles.item}>
              <Text style={styles.Name}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

WorkoutMuscleGroupsScreen.navigationOptions = {
  title: 'Select Muscle Group',
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

export default WorkoutMuscleGroupsScreen;
