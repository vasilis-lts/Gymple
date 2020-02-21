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
import Panel from '../components/Panel';
import Collapsible from '../components/Collapsible';

let saveChanges;

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

    const daysExercises = Exercises.filter(exercise =>
      exerciseIds.includes(exercise.Id),
    );

    setdaysExercises(daysExercises);

    console.log(daysExercises[0]);
  };

  saveChanges = () => {
    // Save weight changes
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView keyExtractor={item => `${item.Id}`}>
          {daysExercises.length ? (
            daysExercises.map(item => (
              <Collapsible key={item.Id} title={item.Name}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{width: 100}}>SetNo</Text>
                  <Text style={{width: 100}}>Reps</Text>
                  <Text style={{width: 100}}>Weight (Kg)</Text>
                </View>
                {item.Sets.map(set => (
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 5,
                      borderTopColor: Colors.Gray,
                      borderTopWidth: 1,
                    }}>
                    <Text style={{width: 100}}>{set.SetNumber}</Text>
                    <Text style={{width: 100}}>{set.Reps}</Text>
                    <Text style={{width: 100}}>{set.WeightsKg}</Text>
                  </View>
                ))}
              </Collapsible>
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
  headerRight: () => (
    <Text style={{marginRight: 10, color: 'white'}} onPress={() => testFunc()}>
      Save Changes
    </Text>
  ),
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
