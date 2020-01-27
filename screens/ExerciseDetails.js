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
const ExerciseDetails = ({navigation}) => {
  const [Exercise, setExercise] = useState({});
  const [ExerciseSets, setExerciseSets] = useState([]);
  const indexWidth = 30;
  const repsWidth = 80;
  const weightsWidth = 150;

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
                <View style={{paddingHorizontal: 10}}>
                  <View style={styles.setsHeader}>
                    <Text
                      style={{
                        ...styles.cell,
                        width: indexWidth,
                        borderBottomColor: '#777',
                        borderBottomWidth: 1,
                      }}>
                      #
                    </Text>
                    <Text
                      style={[
                        styles.borderedCell,
                        styles.cell,
                        {
                          width: repsWidth,
                        },
                      ]}>
                      Reps
                    </Text>
                    <Text
                      style={{
                        ...styles.borderedCell,
                        ...styles.cell,
                        width: weightsWidth,
                      }}>
                      Weights (kg)
                    </Text>
                  </View>
                  {ExerciseSets.map(exercise => {
                    return (
                      <View
                        key={exercise.SetNumber}
                        style={{...styles.setRow, margin: 0}}>
                        <TextInput
                          style={{
                            ...styles.cell,
                            width: indexWidth,
                            color: '#000',
                            borderBottomColor: Colors.Gray,
                            borderBottomWidth: 1,
                          }}
                          editable={false}>
                          {exercise.SetNumber}
                        </TextInput>
                        <TextInput
                          keyboardType={'numeric'}
                          style={{
                            ...styles.cell,
                            ...styles.cellInput,
                            width: repsWidth,
                            backgroundColor: '#f2f2f2',
                          }}>
                          {exercise.Reps}
                        </TextInput>
                        <TextInput
                          keyboardType={'numeric'}
                          style={{
                            ...styles.cell,
                            ...styles.cellInput,
                            width: weightsWidth,
                          }}>
                          {exercise.Weights}
                        </TextInput>
                      </View>
                    );
                  })}
                </View>
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
