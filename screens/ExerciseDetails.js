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
  TextInput,
} from 'react-native';
import {Colors} from '../Colors';
import useEditableGrid from '../hooks/useEditableGrid';

let saveChanges;

const users = [
  {id: '1', name: 'Bill', points: '20'},
  {id: '2', name: 'Stevy', points: '20'},
  {id: '3', name: 'Thomas', points: '30'},
];
const columns = {
  SetNumber: {width: 30, header: '#'},
  Reps: {width: 70, header: 'Reps'},
  WeightsKg: {width: 100, header: 'Weights(Kg)'},
};

const ExerciseDetails = ({navigation}) => {
  const [Exercise, setExercise] = useState({});
  const [ExerciseSets, setExerciseSets] = useState([]);
  const indexWidth = 30;
  const repsWidth = 80;
  const weightsWidth = 140;

  //
  const submitChanges = values => {
    console.log('Submit: ', values);

    setExerciseSets(values);
  };
  const [grid, handleSubmit, Values] = useEditableGrid(
    ExerciseSets,
    submitChanges,
    columns,
  );

  useEffect(() => {
    getExercise();

    return () => {
      // cleanup
    };
  }, []);

  const getExercise = () => {
    const _Exercise = navigation.getParam('Exercise');
    console.log(_Exercise);

    if (_Exercise) {
      setExercise(_Exercise);
      setExerciseSets(_Exercise.Sets);
    }
  };

  const onChangeField = e => {
    console.log(e);
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
