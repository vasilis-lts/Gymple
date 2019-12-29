import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Picker,
} from 'react-native';
import {Colors} from '../Colors';
import NumberInput from '../components/NumberInput';
import SetForm from '../components/SetForm';

const AddExerciseScreen = ({navigation}) => {
  const [WizardStep, setWizardStep] = useState(1);
  const [ExerciseName, onChangeExerciseName] = useState('');
  const [KnownExercisePicker, setKnownExercisePicker] = useState(
    'Select (Empty)',
  );

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

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{color: Colors.White, textAlign: 'center', fontSize: 24}}>
          {WizardStep === 1 && 'Enter a name for the Exercise'}
          {WizardStep === 2 && 'Add Sets, Reps and Weights'}
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
              <SetForm Reps={6} Weights={60} />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Button
                style={styles.wizardBtn}
                title="Previous Step"
                onPress={() => setWizardStep(1)}
              />
              <Button
                style={styles.wizardBtn}
                title="Next Step"
                onPress={() => setWizardStep(3)}
              />
            </View>
          </View>
        )}
      </View>
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
