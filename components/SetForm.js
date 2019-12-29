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
import PropTypes from 'prop-types';
import {Colors} from '../Colors';

const SetForm = props => {
  const textInputWidth = 55;

  const InputNames = {
    REPS: 'Reps',
    WEIGHTS: 'Weights',
  };

  const [RepsValue, setRepsValue] = useState('8');
  const [WeightsValue, setWeightsValue] = useState('50');
  const [LastValidValue, setLastValidValue] = useState('');
  const [FocusedInputName, setFocusedInputName] = useState('');

  useEffect(() => {
    initValues();

    return () => {
      // unmount
    };
  }, []);

  const initValues = () => {
    setRepsValue(`${props[InputNames.REPS]}`);
    setWeightsValue(`${props[InputNames.WEIGHTS]}`);
  };

  const onChangeValue = (value, inputName) => {
    inputName === InputNames.REPS
      ? setRepsValue(value)
      : setWeightsValue(value);
  };

  const onFocusInput = inputName => {
    setFocusedInputName(inputName);
    inputName === InputNames.REPS
      ? setLastValidValue(RepsValue)
      : setLastValidValue(WeightsValue);
  };

  const onBlurInput = inputName => {
    console.log('Blurred ' + inputName);
    if (inputName === InputNames.REPS) {
      const _repsValue = parseInt(RepsValue, 10);

      isNaN(_repsValue)
        ? setRepsValue(`${LastValidValue}`)
        : setRepsValue(`${_repsValue}`);
    } else if (inputName === 'Weights') {
      const _weightsValue = parseFloat(WeightsValue, 10);

      isNaN(_weightsValue)
        ? setWeightsValue(`${LastValidValue}`)
        : setWeightsValue(`${_weightsValue}`);
    }

    console.log({
      Reps: parseInt(RepsValue, 10),
      Weights: parseFloat(WeightsValue, 10),
    });
  };

  return (
    <View style={styles.setFormContainer}>
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
          1.
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
          onFocus={() => onFocusInput(InputNames.REPS)}
          onChangeText={text => onChangeValue(text, InputNames.REPS)}
          onBlur={() => onBlurInput(InputNames.REPS)}
          style={{
            width: textInputWidth,
            textAlign: 'center',
            backgroundColor: 'white',
            fontSize: 18,
          }}
          value={RepsValue}
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
          onFocus={() => onFocusInput(InputNames.WEIGHTS)}
          onChangeText={text => onChangeValue(text, InputNames.WEIGHTS)}
          onBlur={() => onBlurInput(InputNames.WEIGHTS)}
          style={{
            width: textInputWidth,
            textAlign: 'center',
            backgroundColor: 'white',
            fontSize: 18,
          }}
          value={WeightsValue}
        />
      </View>
      <View>
        <Text>Add +</Text>
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

SetForm.propTypes = {
  Reps: PropTypes.number.isRequired,
  Weights: PropTypes.number.isRequired,
};

export default SetForm;
