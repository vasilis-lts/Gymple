import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../Colors';
import ExercisesController from '../controllers/ExercisesController';

function DayRoutine({navigation}) {
  const [DayRoutine, setDayRoutine] = useState([]);
  const [daysExercises, setdaysExercises] = useState([]);

  useEffect(() => {
    const _DayRoutine = navigation.getParam('DayRoutine');
    setDayRoutine(_DayRoutine);

    getDaysExercises(_DayRoutine.ExerciseIds);

    return () => {
      //
    };
  }, []);

  const getDaysExercises = async exerciseIds => {
    const Exercises = await ExercisesController.GetExercises();

    console.log('exs ', Exercises);
    const daysExercises = Exercises.filter(exercise =>
      exerciseIds.includes(exercise.Id),
    );
    console.log(daysExercises);
    setdaysExercises(daysExercises);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView keyExtractor={item => `${item.Id}`}>
          {daysExercises.length ? (
            daysExercises.map(item => (
              <TouchableWithoutFeedback
                key={`${item.Id}`}
                // onPress={() => goToWorkoutSchedule(item)}
              >
                <View style={styles.item}>
                  <Text style={styles.Name}>{item.Name}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))
          ) : (
            <View style={{marginTop: 100}}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

DayRoutine.navigationOptions = {
  title: 'Day Routine',
  // headerRight: () => (
  //   <Text style={{marginRight: 10, color: 'white'}} onPress={() => testFunc()}>
  //     Add New DayRoutine
  //   </Text>
  // ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 2,
    marginHorizontal: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Name: {
    fontSize: 22,
    color: Colors.White,
  },
});

export default DayRoutine;
