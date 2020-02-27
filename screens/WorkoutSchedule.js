import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {Colors} from '../Colors';

function WorkoutSchedule({navigation}) {
  const [Workout, setWorkout] = useState([]);

  useEffect(() => {
    const Workout = navigation.getParam('Workout');
    console.log(Workout);
    setWorkout(Workout);
    return () => {
      //
    };
  }, []);

  const goToDayRoutine = item => {
    navigation.push('DayRoutine', {
      DayRoutine: item,
      workoutId: Workout.id,
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView keyExtractor={item => `${item.id}`}>
          {Object.entries(Workout).length ? (
            Workout.Schedule.map((item, index) => (
              <TouchableWithoutFeedback
                key={`${item.index}`}
                onLongPress={() => console.log('Long Press!')}
                onPress={() => goToDayRoutine(item)}>
                <View style={styles.item}>
                  <Text style={styles.Name}>{item.Day}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))
          ) : (
            <View>
              <Text style={{textAlign: 'center', marginTop: 100}}>
                No daily workouts! Add a new one!
              </Text>
            </View>
          )}

          {/* <DialogModal
            title={'Enter a name for the workout:'}
            visible={showWorkoutModal}
            onClose={() => setshowWorkoutModal(false)}
            onAccept={val => saveWorkout(val)}
          /> */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

WorkoutSchedule.navigationOptions = {
  title: 'Daily Schedule',
  // headerRight: () => (
  //   <Text style={{marginRight: 10, color: 'white'}} onPress={() => testFunc()}>
  //     Add New Workout
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

export default WorkoutSchedule;
