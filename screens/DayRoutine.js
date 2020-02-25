import React, {useState, useEffect, useRef} from 'react';
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
  Keyboard,
} from 'react-native';
import {Colors} from '../Colors';
import ExercisesController from '../controllers/ExercisesController';
import Collapsible from '../components/Collapsible';

let saveChanges;

function DayRoutine({navigation}) {
  const [DayRoutine, setDayRoutine] = useState([]);
  const [daysExercises, setdaysExercises] = useState([]);
  const [FocusInitialValue, setFocusInitialValue] = useState('');

  const FocusedExerciseIndex = useRef(null);
  const FocusedSetIndex = useRef(null);
  const FocusedFieldname = useRef('');

  const IsInputFocused = useRef(false);

  const exercises = useRef([]);

  const handleBackButtonClick = () => {
    console.log('Back Pressed');
    // navigation.goBack(null);
    // return true;
  };

  useEffect(() => {
    const _DayRoutine = navigation.getParam('DayRoutine');
    setDayRoutine(_DayRoutine);
    getDaysExercises(_DayRoutine.ExerciseIds);

    // handle reverting value when hiding keyboard
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (IsInputFocused.current) {
          // hiding the keyboard while input is focused
          // reinitializes the data
          getDaysExercises(_DayRoutine.ExerciseIds);
        }
      },
    );

    // BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      //
      //   BackHandler.removeEventListener(
      //     'hardwareBackPress',
      //     handleBackButtonClick,
      //   );
      keyboardDidHideListener.remove();
    };
  }, []);

  const getDaysExercises = async exerciseIds => {
    const Exercises = await ExercisesController.GetExercises();
    let filteredExercises = [];

    exerciseIds.forEach(id => {
      const Exercise = Exercises.find(exercise => exercise.Id === id);
      filteredExercises.push(Exercise);
    });

    setdaysExercises(filteredExercises);
    exercises.current = filteredExercises;
  };

  const handleInputChange = (text, exerciseIndex, setIndex, fieldName) => {
    const _daysExercises = [...daysExercises];

    _daysExercises[exerciseIndex].Sets[setIndex][fieldName] = text;
    setdaysExercises(_daysExercises);
  };

  const handleBlur = (value, exerciseIndex, setIndex, fieldName) => {
    IsInputFocused.current = false;

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
      exercises.current = _daysExercises;
    }
  };

  saveChanges = () => {
    console.log(daysExercises[0].Sets);
  };

  const onFocusInput = (value, exerciseIndex, setIndex, fieldName) => {
    setFocusInitialValue(value);

    FocusedExerciseIndex.current = exerciseIndex;
    FocusedSetIndex.current = setIndex;
    FocusedFieldname.current = fieldName;

    IsInputFocused.current = true;
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {daysExercises.length ? (
            daysExercises.map((item, exerciseIndex) => (
              <Collapsible key={exerciseIndex} title={item.Name}>
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
                        value={`${set.Reps}`}
                        onFocus={() =>
                          onFocusInput(
                            `${set.Reps}`,
                            exerciseIndex,
                            setIndex,
                            'Reps',
                          )
                        }
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
                        onFocus={() =>
                          onFocusInput(
                            `${set.WeightsKg}`,
                            exerciseIndex,
                            setIndex,
                            'WeightsKg',
                          )
                        }
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
