import AsyncStorage from '@react-native-community/async-storage';

const mockStorage = {
  Workouts: [],
  Exercises: [],
};

export const initMockStorage = async () => {
  console.log('Initializing Mock Storage');
  try {
    await AsyncStorage.setItem(
      'Exercises',
      JSON.stringify([
        {
          id: 1,
          WorkoutId: 1,
          MuscleGroup: 'Chest',
          Name: 'Pec-Deck',
          Notes: 'Pec Deck Notes here',
          Sets: [{SetNumber: 1, Reps: 10, Weights: 50}],
        },
        {
          id: 2,
          WorkoutId: 1,
          MuscleGroup: 'Back',
          Name: 'Lat Machine',
          Notes: 'Lat Machine Notes',
          Sets: [{SetNumber: 1, Reps: 10, Weights: 50}],
        },
        {
          id: 3,
          WorkoutId: 2,
          MuscleGroup: 'Chest',
          Name: 'Pec-Deck',
          Notes: 'Notes here',
          Sets: [
            {SetNumber: 1, Reps: 8, Weights: 50},
            {SetNumber: 2, Reps: 6, Weights: 60},
            {SetNumber: 3, Reps: 6, Weights: 60},
          ],
        },
      ]),
    );
    await AsyncStorage.setItem(
      'Workouts',
      JSON.stringify([
        {id: 1, Name: 'Mass'},
        {id: 2, Name: '4 days Upper Lower'},
      ]),
    );
  } catch (error) {
    // Error saving data
    alert('Error saving data');
  }
};

export const getAllStorageKeys = async () => {
  try {
    const data = await AsyncStorage.getAllKeys();
    if (data !== null) {
      // We have data!!
      console.log(data);
    }
  } catch (error) {
    // Error retrieving data
  }
};

export const getAsyncStorageItem = async itemKey => {
  try {
    const data = await AsyncStorage.getItem(itemKey);
    if (data !== null) {
      // We have data!!
      return JSON.parse(data);
    }
  } catch (error) {
    return null;
    // Error retrieving data
  }
};

export const setAsyncStorageItem = async (itemKey, item) => {
  try {
    await AsyncStorage.setItem(itemKey, JSON.stringify(item));
    return 'success';
  } catch (error) {
    return error;
  }
};
