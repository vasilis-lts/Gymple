import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {Colors} from '../Colors';

const ExercisesForm = props => {
  const [FormValues, setFormValues] = useState([{index: 0}]);
  const [FieldsNum, setFieldsNum] = useState(1);

  useEffect(() => {
    // console.log(FieldsNum);
    // return () => {
    //   cleanup
    // };
  }, [FieldsNum]);

  const handleInputChange = (text, index, name) => {
    const _formValues = [...FormValues];
    _formValues[index][name] = text;
    setFormValues(_formValues);
  };

  const addExercise = () => {
    const _formValues = [...FormValues];
    _formValues.push({index: FormValues.length});
    setFormValues(_formValues);
  };

  const removeExercise = index => {
    console.log('remove ex ' + index);

    const _formValues = [...FormValues];
    _formValues.splice(index, 1);

    console.log(_formValues);

    _formValues.forEach((entry, index) => {
      entry.index = index;
    });

    console.log(_formValues);

    setFormValues(_formValues);
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          paddingVertical: 5,
          borderColor: Colors.White,
          borderWidth: 3,
        }}>
        <Text
          style={{
            color: Colors.White,
            fontSize: 22,
            textAlign: 'center',
            textTransform: 'uppercase',
          }}>
          {props.title}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={FormValues}
        renderItem={({item}) => (
          <View style={styles.ExerciseItem}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: Colors.White, fontSize: 22}}>
                Exercise {item.index + 1}
              </Text>
              <TouchableOpacity onPress={() => removeExercise(item.index)}>
                <Text style={styles.AddExerciseBtnTxt}>X</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.Input}
              value={FormValues[item.index].Name}
              onChangeText={text => handleInputChange(text, item.index, 'Name')}
              placeholder="Enter a name for the exercise"
              placeholderTextColor={Colors.Gray}
            />
          </View>
        )}
        keyExtractor={item => `${item.index}`}
      />
      <TouchableOpacity
        style={styles.AddExerciseBtn}
        onPress={() => addExercise()}>
        <Text style={styles.AddExerciseBtnTxt}>Add +</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  AddExerciseBtnTxt: {color: Colors.White, fontSize: 20},
  ExerciseItem: {
    paddingVertical: 2,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  Input: {
    backgroundColor: Colors.White,
    padding: 5,
    paddingHorizontal: 10,
    marginVertical: 2,
  },
});

export default ExercisesForm;
