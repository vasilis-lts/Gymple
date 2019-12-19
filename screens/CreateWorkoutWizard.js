import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../Colors';
import ExercisesForm from '../components/ExercisesForm';

const MuscleGroups = ['Chest', 'Back', 'Biceps', 'Triceps', 'Legs', 'Abs'];

const CreateWorkoutForm = ({navigation}) => {
  const [WorkoutName, setWorkoutName] = useState('');
  const [Value, setValue] = useState(null);

  const [MuscleGroupsSelected, setMuscleGroupsSelected] = useState([]);
  const [WizardStep, setWizardStep] = useState(1);

  useEffect(() => {
    //
  }, []);

  const muscleGroupsHandler = selection => {
    let _muscleGroupsSelected = [...MuscleGroupsSelected];

    if (_muscleGroupsSelected.includes(selection)) {
      _muscleGroupsSelected = _muscleGroupsSelected.filter(
        item => item !== selection,
      );
    } else {
      _muscleGroupsSelected.push(selection);
    }

    const _fieldsNum = [];
    _muscleGroupsSelected.forEach(el => {
      _fieldsNum.push(1);
    });

    setMuscleGroupsSelected(_muscleGroupsSelected);
  };

  const wizardHandler = step => {
    setWizardStep(step);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {WizardStep === 1 ? (
          <View style={styles.form}>
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{color: Colors.White}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.formTitle}>
                Select target muscle group(s)
              </Text>
            </View>

            <View style={styles.muscleGroupsContainer}>
              {MuscleGroups.map(el => {
                return (
                  <TouchableHighlight
                    key={el}
                    onPress={() => muscleGroupsHandler(el)}
                    style={{
                      width: '50%',
                      paddingVertical: 20,
                      borderColor: '#777',
                      borderWidth: 2,
                      backgroundColor: MuscleGroupsSelected.includes(el)
                        ? '#444'
                        : '#222',
                    }}
                    underlayColor="white">
                    <View>
                      <Text style={styles.muscleGroupsText}>{el}</Text>
                    </View>
                  </TouchableHighlight>
                );
              })}
            </View>

            {MuscleGroupsSelected.length ? (
              <View style={{marginTop: 20}}>
                <TouchableHighlight onPress={() => setWizardStep(2)}>
                  <View>
                    <Text
                      style={{
                        textAlign: 'right',
                        fontSize: 22,
                        color: Colors.White,
                      }}>
                      Next ->
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            ) : null}
          </View>
        ) : null}

        {WizardStep === 2 ? (
          <View style={styles.form}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                onPress={() => setWizardStep(1)}
                style={styles.formTitle}>{`<- Back`}</Text>
              <Text style={styles.formTitle}>Add Exercises</Text>
              <Text
                onPress={() => setWizardStep(1)}
                style={styles.formTitle}>{`Done`}</Text>
            </View>

            {MuscleGroupsSelected.map((el, index) => {
              return (
                <View key={el}>
                  <ExercisesForm title={el} />
                </View>
              );
            })}
          </View>
        ) : null}
      </SafeAreaView>
    </>
  );
};

CreateWorkoutForm.navigationOptions = {
  headerShown: false,
  // title: 'Create Workout',
  // headerRight: () => (
  //   <Text
  //     style={{marginRight: 10, color: Colors.White, fontWeight: 'bold'}}
  //     onPress={() => alert('Saved!')}>
  //     Save
  //   </Text>
  // ),
};

const styles = StyleSheet.create({
  AddExerciseBtnTxt: {color: Colors.White, fontSize: 20},
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  form: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  formTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 15,
  },
  muscleGroupsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  muscleGroups: {
    width: '50%',
    paddingVertical: 20,
    borderColor: '#777',
    borderWidth: 2,
  },
  muscleGroupsHighlighted: {
    backgroundColor: '#444',
  },
  muscleGroupsText: {
    textTransform: 'uppercase',
    color: Colors.White,
    textAlign: 'center',
  },
  label: {
    fontSize: 24,
    color: Colors.White,
  },
  textInput: {
    backgroundColor: Colors.White,
    borderBottomWidth: 2,
    fontSize: 20,
    color: '#ddd',
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 5,
  },
  title: {
    fontSize: 32,
    color: '#0f9',
  },
});

export default CreateWorkoutForm;
