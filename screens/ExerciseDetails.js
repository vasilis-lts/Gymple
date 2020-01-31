import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Colors} from '../Colors';
import useEditableGrid from '../hooks/useEditableGrid';

let saveChanges;

const columns = {
  SetNumber: {width: 30, header: '#'},
  Reps: {width: 70, header: 'Reps'},
  WeightsKg: {width: 100, header: 'Weights(Kg)'},
};

const ExerciseDetails = ({navigation}) => {
  const [Exercise, setExercise] = useState({});
  const [ExerciseSets, setExerciseSets] = useState([]);

  //
  const submitChanges = values => {
    console.log('Submit: ', values);

    setExerciseSets(values);
  };

  const deleteRow = index => {
    const _ExerciseSets = [...ExerciseSets];
    _ExerciseSets.splice(index, 1);
    const fixedArr = fixSetNumbersArr(_ExerciseSets);
    setExerciseSets(fixedArr);
  };

  const fixSetNumbersArr = arr => {
    arr.forEach((exercise, index) => {
      exercise.SetNumber = index + 1;
    });
    let fixedArr = [...arr];
    return fixedArr;
  };

  const [grid, handleSubmit, Values] = useEditableGrid(
    ExerciseSets,
    submitChanges,
    columns,
    deleteRow,
  );

  useEffect(() => {
    getExercise();

    return () => {
      // cleanup
    };
  }, []);

  const getExercise = () => {
    const _Exercise = navigation.getParam('Exercise');

    if (_Exercise) {
      setExercise(_Exercise);
      setExerciseSets(_Exercise.Sets);
    }
  };

  const addSet = () => {
    const _ExerciseSets = [...ExerciseSets];
    const arrLength = _ExerciseSets.length;
    _ExerciseSets.push({
      SetNumber: arrLength + 1,
      Reps: ExerciseSets[ExerciseSets.length - 1].Reps,
      WeightsKg: ExerciseSets[ExerciseSets.length - 1].WeightsKg,
    });
    setExerciseSets(_ExerciseSets);
  };

  saveChanges = () => {
    console.log('Save', ExerciseSets);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {Exercise ? (
            <View>
              <View>
                <Text style={styles.title}>{Exercise.Name}</Text>
              </View>
              <View>
                <Text style={styles.sectionHeader}>Sets:</Text>
              </View>

              <View style={{padding: 10}}>{grid}</View>
              <View style={{width: 100, marginLeft: 10}}>
                <Button title="Add Set" onPress={() => addSet()} />
              </View>
              <View>
                <Text style={{...styles.sectionHeader, marginTop: 20}}>
                  Notes:
                </Text>
                <View style={{paddingHorizontal: 10}}>
                  <TextInput
                    // onChangeText={text => setExerciseNotes(text)}
                    multiline={true}
                    numberOfLines={5}
                    value={Exercise.Notes}
                    style={{
                      backgroundColor: Colors.White,
                      textAlignVertical: 'top',
                      borderColor: Colors.Gray,
                      borderWidth: 1,
                      padding: 5,
                      width: 250,
                    }}
                  />
                </View>
              </View>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

ExerciseDetails.navigationOptions = {
  title: 'Exercise Details',
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
  title: {
    fontSize: 32,
    paddingLeft: 5,
    margin: 4,
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 22,
    paddingLeft: 5,
    margin: 2,
    marginBottom: 10,
  },
  setsHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  setRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  cell: {
    textAlign: 'center',
    fontSize: 16,
  },
  cellInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray,
    borderLeftWidth: 1,
    borderLeftColor: Colors.Gray,
  },
  borderedCell: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.Gray,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray,
  },
  Name: {
    fontSize: 32,
    color: '#0f9',
  },
});

export default ExerciseDetails;
