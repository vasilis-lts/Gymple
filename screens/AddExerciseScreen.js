import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Picker,
} from 'react-native';
import {Colors} from '../Colors';

const AddExerciseScreen = ({navigation}) => {
  const [WizardStep, setWizardStep] = useState(1);
  const [ExerciseName, onChangeExerciseName] = useState('');
  const [Language, setLanguage] = useState('js');

  useEffect(() => {
    // console.log('mounting add exercise screen');
    return () => {
      // console.log('unmounting add exercise screen');
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{color: Colors.White, textAlign: 'center', fontSize: 24}}>
          Add {navigation.getParam('muscleGroup')} Exercise
        </Text>
      </View>
      <View style={styles.formContainer}>
        {WizardStep === 1 && (
          <>
            <View>
              <Text style={styles.label}>Enter a name for the exercise</Text>
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
                ...but first check if we already have a similar name!
              </Text>
              <Text
                style={{
                  color: Colors.White,
                  fontSize: 16,
                }}>{`(selecting an exercise will put it in the field above)`}</Text>
              <Picker
                selectedValue={Language}
                style={{
                  height: 50,
                  marginTop: 50,
                  backgroundColor: Colors.White,
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setLanguage(itemValue)
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
            </View>
          </>
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
