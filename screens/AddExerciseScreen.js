import React, {useEffect, useState} from 'react';
import {
  Alert,
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Picker,
  ScrollView,
} from 'react-native';
import {Colors} from '../Colors';
import SetForm from '../components/SetForm';
import AsyncStorage from '@react-native-community/async-storage';
import {getAsyncStorageItem, setAsyncStorageItem} from '../AsyncStorage';

const AddExerciseScreen = ({navigation}) => {
  const [WizardStep, setWizardStep] = useState(1);
  const [MuscleGroup, setMuscleGroup] = useState('');
  const [ExerciseName, onChangeExerciseName] = useState('');
  const [KnownExercisePicker, setKnownExercisePicker] = useState(
    'Select (Empty)',
  );
  const [SetsDraft, setSetsDraft] = useState([]);
  const [ExerciseNotes, setExerciseNotes] = useState('');

  const defaultExercises = {
    Chest: [
      'Barbell Bench Press',
      'Inclined Barbell Bench Press',
      'Dumbell Bench Press',
      'Inclined Dumbell Bench Press',
      'Pec-Deck',
    ],
  };

  useEffect(() => {
    // console.log('mounting add exercise screen');
    const muscleGroup = navigation.getParam('muscleGroup');
    console.log(muscleGroup);
    setMuscleGroup(muscleGroup);
    return () => {
      // console.log('unmounting add exercise screen');
    };
  }, []);

  const updateExerciseName = value => {
    value === 'Select (Empty)'
      ? onChangeExerciseName('')
      : onChangeExerciseName(value);

    setKnownExercisePicker(value);
  };

  const saveSetsDraft = sets => {
    setWizardStep(3);
    console.log('Added sets');
    console.log(sets);
    const _SetsDraft = [...sets];
    setSetsDraft(_SetsDraft);
  };

  const showDialog = () => {
    Alert.alert(
      'Confirmation',
      'Save this exercise?',
      [
        // {
        //   text: 'Ask me later',
        //   onPress: () => console.log('Ask me later pressed'),
        // },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => saveExercise()},
      ],
      {cancelable: false},
    );
  };

  const saveExercise = async () => {
    let exerciseObj = {
      MuscleGroup,
      Name,
      Sets: SetsDraft,
      Notes,
    };

    console.log('Exercise Details:');
    console.log(exerciseObj);

    const getResponse = await getAsyncStorageItem('Exercises');
    if (getResponse) {
      const exercisesArr = [...JSON.parse(getResponse)];
      exercisesArr.push(exerciseObj);

      const setResponse = await setAsyncStorageItem('Exercises', exercisesArr);
      if (setResponse === 'success') {
        navigation.goBack();
      } else {
        console.log(setResponse);
      }
    } else {
      console.log('Could not get Item');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text
            style={{color: Colors.White, textAlign: 'center', fontSize: 24}}>
            {WizardStep === 1 && 'Enter a name for the Exercise'}
            {WizardStep === 2 && 'Add Sets, Reps and Weights'}
            {WizardStep === 3 && 'Notes for the exercise (optional)'}
          </Text>
        </View>
        <View style={styles.formContainer}>
          {WizardStep === 1 && (
            <>
              <View>
                <Text style={styles.label}>Exercise name:</Text>
                <TextInput
                  style={{
                    height: 40,
                    backgroundColor: Colors.White,
                    color: '#000',
                  }}
                  onChangeText={text => onChangeExerciseName(text)}
                  value={ExerciseName}
                />
              </View>
              <View style={{marginTop: 40}}>
                <Text style={{color: Colors.White, fontSize: 16}}>
                  ...but first check if we already have it!
                </Text>
                <Text
                  style={{
                    color: Colors.White,
                    fontSize: 16,
                  }}>{`(Selecting will update the above field)`}</Text>

                <Text
                  style={{
                    color: Colors.White,
                    fontSize: 16,
                    marginTop: 50,
                  }}>
                  Select Exercise!
                </Text>
                <Picker
                  selectedValue={KnownExercisePicker}
                  style={{
                    height: 50,
                    marginTop: 5,
                    backgroundColor: Colors.White,
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    updateExerciseName(itemValue)
                  }>
                  <Picker.Item label="Select (Empty)" value="Select (Empty)" />
                  {defaultExercises.Chest.map(el => {
                    return <Picker.Item key={el} label={el} value={el} />;
                  })}
                </Picker>

                <View style={[styles.wizardBtnContainer]}>
                  <Button
                    title="Next Step"
                    disabled={ExerciseName === '' ? true : false}
                    onPress={() => setWizardStep(2)}
                  />
                </View>
              </View>
            </>
          )}

          {WizardStep === 2 && (
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  paddingBottom: 5,
                  borderBottomColor: Colors.Gray,
                  borderBottomWidth: 2,
                }}>
                <Text style={[{width: '20%'}, styles.gridHeader]}>Set #</Text>
                <Text style={[{width: '40%'}, styles.gridHeader]}>Reps</Text>
                <Text style={[{width: '40%'}, styles.gridHeader]}>Weights</Text>
              </View>
              <SetForm
                goBack={() => setWizardStep(1)}
                saveSetsDraft={saveSetsDraft}
              />
            </View>
          )}

          {WizardStep === 3 && (
            <View>
              <Text style={styles.label}>Exercise Notes:</Text>
              <TextInput
                onChangeText={text => setExerciseNotes(text)}
                multiline={true}
                numberOfLines={8}
                value={ExerciseNotes}
                style={{
                  backgroundColor: Colors.White,
                  textAlignVertical: 'top',
                }}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <Button
                  style={styles.wizardBtn}
                  title="Back to sets"
                  onPress={() => setWizardStep(2)}
                />
                <Button
                  style={styles.wizardBtn}
                  title="Save Exercise"
                  onPress={() => showDialog()}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

AddExerciseScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: '#000',
    color: Colors.White,
  },
  wizardBtnContainer: {
    marginTop: 20,
  },
  gridHeader: {
    color: 'white',
    fontSize: 20,
  },
  formContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  label: {
    color: Colors.White,
    fontSize: 20,
    marginVertical: 5,
  },
});

export default AddExerciseScreen;
