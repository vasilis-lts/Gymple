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
import {TouchableHighlight} from 'react-native-gesture-handler';

const SetForm = props => {
  const textInputWidth = 55;

  const InputNames = {
    REPS: 'Reps',
    WEIGHTS: 'Weights',
  };

  const [RepsValue, setRepsValue] = useState('');
  const [WeightsValue, setWeightsValue] = useState('');
  const [LastValidValue, setLastValidValue] = useState('');
  const [FocusedInputName, setFocusedInputName] = useState('');
  const [FocusedIndex, setFocusedIndex] = useState(0);

  const [formData, setformData] = useState([
    {SetNumber: 1, Reps: 10, Weights: 50},
  ]);
  let defaultSet = {Reps: 8, Weights: 60};

  useEffect(() => {
    initValues();

    return () => {
      // unmount
    };
  }, []);

  const initValues = () => {
    // setRepsValue(`${props[InputNames.REPS]}`);
    // setWeightsValue(`${props[InputNames.WEIGHTS]}`);
  };

  const onFocusInput = (inputName, value, index) => {
    setFocusedInputName(inputName);
    setFocusedIndex(index);

    inputName === InputNames.REPS
      ? setRepsValue(value)
      : setWeightsValue(value);
    setLastValidValue(value);
  };

  const onChangeValue = (value, inputName) => {
    inputName === InputNames.REPS
      ? setRepsValue(value)
      : setWeightsValue(value);
  };

  const onBlurInput = (inputName, index) => {
    setFocusedInputName('');
    let value;

    console.log('Blurred ' + inputName);
    if (inputName === InputNames.REPS) {
      value = parseInt(RepsValue, 10);

      isNaN(value)
        ? setRepsValue(`${LastValidValue}`)
        : setRepsValue(`${value}`);
    } else if (inputName === 'Weights') {
      value = parseFloat(WeightsValue, 10);

      isNaN(value)
        ? setWeightsValue(`${LastValidValue}`)
        : setWeightsValue(`${value}`);
    }

    updateGrid(index, inputName, value);
  };

  const updateGrid = (index, inputName, value) => {
    const clonedData = [...formData];
    clonedData[index][inputName] = value;
    setformData(clonedData);
  };

  const addSet = () => {
    const clonedData = [...formData];
    defaultSet.SetNumber = formData.length + 1;
    clonedData.push(defaultSet);
    setformData(clonedData);
  };

  const saveSets = () => {
    props.saveSets(formData);
  };

  return (
    <View>
      {formData.map((el, index) => {
        return (
          <View key={el.SetNumber} style={styles.setFormContainer}>
            <View
              style={{
                width: '20%',

                // backgroundColor: 'red',
              }}>
              <TextInput
                editable={false}
                style={{
                  // backgroundColor: 'white',
                  color: 'white',
                  fontSize: 18,
                }}>
                {el.SetNumber}.
              </TextInput>
            </View>
            <View
              style={{
                width: '40%',
                // backgroundColor: 'green'
              }}>
              <TextInput
                keyboardType="numeric"
                selectTextOnFocus
                onFocus={() => onFocusInput(InputNames.REPS, el.Reps, index)}
                onChangeText={text => onChangeValue(text, InputNames.REPS)}
                onBlur={() => onBlurInput(InputNames.REPS, index)}
                style={{
                  width: textInputWidth,
                  textAlign: 'center',
                  backgroundColor: 'white',
                  fontSize: 18,
                }}
                value={`${
                  FocusedIndex === index && FocusedInputName === InputNames.REPS
                    ? RepsValue
                    : el.Reps
                }`}
              />
            </View>
            <View
              style={{
                width: '40%',
                // backgroundColor: 'blue'
              }}>
              <TextInput
                keyboardType="numeric"
                selectTextOnFocus
                onFocus={text =>
                  onFocusInput(InputNames.WEIGHTS, el.Weights, index)
                }
                onChangeText={text => onChangeValue(text, InputNames.WEIGHTS)}
                onBlur={() => onBlurInput(InputNames.WEIGHTS, index)}
                style={{
                  width: textInputWidth,
                  textAlign: 'center',
                  backgroundColor: 'white',
                  fontSize: 18,
                }}
                value={`${
                  FocusedIndex === index &&
                  FocusedInputName === InputNames.WEIGHTS
                    ? WeightsValue
                    : el.Weights
                }`}
              />
            </View>
          </View>
        );
      })}
      <View style={{paddingVertical: 15}}>
        <Button
          title="Add set"
          style={{backgroundColor: 'red'}}
          onPress={() => addSet()}
        />
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
          onPress={() => props.goBack()}
        />
        <Button
          style={styles.wizardBtn}
          title="Next Step"
          onPress={() => saveSets()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  setFormContainer: {
    flexDirection: 'row',
    borderBottomColor: Colors.Gray,
    borderBottomWidth: 1,
    paddingVertical: 2,
  },
});

export default SetForm;
