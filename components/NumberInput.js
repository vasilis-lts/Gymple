import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

const NumberInput = props => {
  const [InputValue, setInputValue] = useState(1);
  const [LastValidValue, setLastValidValue] = useState(1);

  const borderRadius = 4;

  useEffect(() => {
    if (props.value) {
      setInputValue(props.value);
    }

    return () => {
      // cleanup
    };
  }, []);

  const valueIncrease = value => {
    if (value < 999) {
      value++;
      setInputValue(value);
    }
  };

  const valueDecrease = value => {
    if (value > 1) {
      value--;
      setInputValue(value);
    }
  };

  const onChangeTextInput = text => {
    console.log(LastValidValue);
    const value = parseFloat(text, 10);
    if (value === NaN) {
      setInputValue(LastValidValue);
    } else {
      setInputValue(value);
    }
  };

  const onFocusInput = () => {
    console.log(InputValue);
    setLastValidValue(InputValue);
  };

  return (
    <View style={styles.numberInputContainer}>
      <TouchableHighlight
        onPress={() => valueDecrease(InputValue)}
        style={[
          styles.buttonStyle,
          {
            borderBottomLeftRadius: borderRadius,
            borderTopLeftRadius: borderRadius,
          },
        ]}>
        <Icon name="remove" size={30} color="white" />
      </TouchableHighlight>
      <TextInput
        keyboardType={'numeric'}
        returnKeyType="done"
        style={[
          styles.inputStyle,
          {width: 40, fontSize: 16, textAlign: 'center', padding: 0},
        ]}
        value={`${InputValue}`}
        selectTextOnFocus
        onChangeText={text => onChangeTextInput(text)}
        onFocus={() => onFocusInput()}
      />
      <TouchableHighlight
        onPress={() => valueIncrease(InputValue)}
        style={[
          styles.buttonStyle,
          {
            borderBottomRightRadius: borderRadius,
            borderTopRightRadius: borderRadius,
          },
        ]}>
        <Icon name="add" size={30} color="white" />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  numberInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 35,
  },
  inputStyle: {
    backgroundColor: 'white',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#777',
  },
});

export default NumberInput;
