import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  View,
  ActivityIndicator,
  TextInput,
  BackHandler,
} from 'react-native';
import {Colors} from '../Colors';
import ExercisesController from '../controllers/ExercisesController';
import Collapsible from '../components/Collapsible';

let saveChanges;

function DayRoutine({navigation}) {
  const [DayRoutine, setDayRoutine] = useState([]);
  const [daysExercises, setdaysExercises] = useState([]);
  const [FocusInitialValue, setFocusInitialValue] = useState('');

  const handleBackButtonClick = () => {
    console.log('Back Pressed');
    // navigation.goBack(null);
    // return true;
  };

  useEffect(() => {
    const _DayRoutine = navigation.getParam('DayRoutine');
    setDayRoutine(_DayRoutine);

    getDaysExercises(_DayRoutine.ExerciseIds);

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      //
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
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

  const handleInputChange = (text, exerciseIndex, setIndex, fieldName) => {
    const _daysExercises = [...daysExercises];
    let value = text === '' ? '0' : text;
    _daysExercises[exerciseIndex].Sets[setIndex][fieldName] = value;
    setdaysExercises(_daysExercises);
  };

  const handleBlur = (value, exerciseIndex, setIndex, fieldName) => {
    if (value !== FocusInitialValue) {
      let _daysExercises = [...daysExercises];
      let newValue;

      if (fieldName === 'WeightsKg') {
        if (value.match(/^\d+(\.\d+)?$/)) {
          newValue = parseFloat(value, 10);
        } else {
          newValue = parseFloat(FocusInitialValue, 10);
        }
      } else if (fieldName === 'Reps') {
        if (value.match(/^\d+$/)) {
          newValue = parseInt(value, 10);
        } else {
          newValue = parseInt(FocusInitialValue, 10);
        }
      }

      _daysExercises[exerciseIndex].Sets[setIndex][fieldName] = newValue;
      setdaysExercises(_daysExercises);
    }
  };

  saveChanges = () => {
    console.log(daysExercises[0].Sets);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView keyExtractor={item => `${item.Id}`}>
          {daysExercises.length ? (
            daysExercises.map((item, exerciseIndex) => (
              <Collapsible key={item.Id} title={item.Name}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{width: 70}}>Set#</Text>
                  <Text style={{width: 100}}>Reps</Text>
                  <Text style={{width: 100}}>Weight</Text>
                </View>
                {item.Sets.map((set, setIndex) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderTopColor: Colors.Gray,
                      borderTopWidth: 1,
                      height: 50,
                    }}
                    key={set.SetNumber}>
                    <View style={{width: 60}}>
                      <Text style={styles.cellText}>{set.SetNumber}.</Text>
                    </View>
                    <View style={styles.setCell}>
                      <TextInput
                        keyboardType={'numeric'}
                        selectTextOnFocus={true}
                        style={{
                          borderColor: 'gray',
                          borderWidth: 1,
                          borderRadius: 4,
                          width: 60,
                          height: 45,
                          textAlign: 'center',
                          fontSize: 18,
                          paddingTop: 10,
                        }}
                        onEndEditing={() => console.log('onEndEditing')}
                        value={`${set.Reps}`}
                        onFocus={() => setFocusInitialValue(`${set.Reps}`)}
                        onChangeText={text =>
                          handleInputChange(
                            text,
                            exerciseIndex,
                            setIndex,
                            'Reps',
                          )
                        }
                        onBlur={() =>
                          handleBlur(
                            `${set.Reps}`,
                            exerciseIndex,
                            setIndex,
                            'Reps',
                          )
                        }
                      />
                    </View>
                    <View style={styles.setCell}>
                      <TextInput
                        keyboardType={'numeric'}
                        selectTextOnFocus={true}
                        style={{
                          borderColor: 'gray',
                          borderWidth: 1,
                          borderRadius: 4,
                          width: 60,
                          height: 45,
                          textAlign: 'center',
                          fontSize: 18,
                          paddingTop: 10,
                        }}
                        value={`${set.WeightsKg}`}
                        onFocus={() => setFocusInitialValue(`${set.WeightsKg}`)}
                        onChangeText={text =>
                          handleInputChange(
                            text,
                            exerciseIndex,
                            setIndex,
                            'WeightsKg',
                          )
                        }
                        onBlur={() =>
                          handleBlur(
                            `${set.WeightsKg}`,
                            exerciseIndex,
                            setIndex,
                            'WeightsKg',
                          )
                        }
                      />
                    </View>
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
    <Text
      style={{marginRight: 10, color: 'white'}}
      onPress={() => saveChanges()}>
      Save
    </Text>
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  setCell: {
    width: 100,
    height: 40,
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 18,
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
