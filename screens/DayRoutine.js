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
import Collapsible from '../components/Collapsible';
import WorkoutsController from '../controllers/WorkoutsController';
import LoadingModal from '../components/LoadingModal';

let saveChanges;

function DayRoutine({navigation}) {
  const [daysExercises, setdaysExercises] = useState([]);
  const [FocusInitialValue, setFocusInitialValue] = useState('');
  const [ShowLoadingModal, setShowLoadingModal] = useState(false);

  const FocusedExerciseIndex = useRef(null);
  const FocusedSetIndex = useRef(null);
  const FocusedFieldname = useRef('');

  const IsInputFocused = useRef(false);
  const DayRoutineRef = useRef({});
  const inputRefs = useRef({});
  const inputRef = useRef(null);

  const handleBackButtonClick = () => {
    console.log('Back Pressed');
    // navigation.goBack(null);
    // return true;
  };

  useEffect(() => {
    const DayRoutine = navigation.getParam('DayRoutine');
    setdaysExercises(DayRoutine.Exercises);
    DayRoutineRef.current = JSON.parse(JSON.stringify(DayRoutine));

    // handle reverting value when hiding keyboard
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (IsInputFocused.current) {
          console.log('kb hide event');
          // hiding the keyboard while input is focused
          // blurs the input to avoid wrong type
          inputRef.current.blur();
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

  const onFocusInput = (ref, value, exerciseIndex, setIndex, fieldName) => {
    setFocusInitialValue(value);

    inputRef.current = inputRefs.current[ref];

    FocusedExerciseIndex.current = exerciseIndex;
    FocusedSetIndex.current = setIndex;
    FocusedFieldname.current = fieldName;

    IsInputFocused.current = true;
  };

  const handleInputChange = (text, exerciseIndex, setIndex, fieldName) => {
    const _daysExercises = [...daysExercises];

    _daysExercises[exerciseIndex].Sets[setIndex][fieldName] = text;
    setdaysExercises(_daysExercises);
  };

  const handleBlur = (value, exerciseIndex, setIndex, fieldName) => {
    IsInputFocused.current = false;

    console.log('blur');

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

      const _DayRoutineRef = JSON.parse(JSON.stringify(DayRoutineRef.current));
      _DayRoutineRef.Exercises = JSON.parse(JSON.stringify(_daysExercises));
      console.log('updated exercises ');
      DayRoutineRef.current = JSON.parse(JSON.stringify(_DayRoutineRef));
      console.log('ref update: ', DayRoutineRef.current.Exercises[0]);
    }
  };

  saveChanges = async () => {
    setShowLoadingModal(true);

    const WorkoutUpdate = await WorkoutsController.UpdateWorkoutByDayRoutine(
      DayRoutineRef.current,
      navigation.getParam('workoutId'),
    );

    setShowLoadingModal(false);

    if (WorkoutUpdate === 'success') {
      console.log('Update successfull');
    }
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
                        ref={el =>
                          (inputRefs.current[
                            `${exerciseIndex}${setIndex}Reps`
                          ] = el)
                        }
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
                        onFocus={e =>
                          onFocusInput(
                            `${exerciseIndex}${setIndex}Reps`,
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
                        ref={el =>
                          (inputRefs.current[
                            `${exerciseIndex}${setIndex}Weights`
                          ] = el)
                        }
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
                        onFocus={e =>
                          onFocusInput(
                            `${exerciseIndex}${setIndex}Weights`,
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
          {ShowLoadingModal && <LoadingModal />}
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
