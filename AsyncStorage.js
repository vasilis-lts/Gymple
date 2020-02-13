import AsyncStorage from '@react-native-community/async-storage';

const mockStorage = {
  Workouts: [],
  Exercises: [],
};

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Asyncstorage Cleared.');
    return true;
  } catch (error) {
    return error;
  }
};

export const initMockStorage = async () => {
  // const res = await clearAsyncStorage();
  // if (res) {
  //   console.log('Storage cleared!');
  // }
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
          Sets: [{SetNumber: 1, Reps: 10, WeightsKg: 50}],
        },
        {
          id: 2,
          WorkoutId: 1,
          MuscleGroup: 'Back',
          Name: 'Lat Machine',
          Notes: 'Lat Machine Notes',
          Sets: [{SetNumber: 1, Reps: 10, WeightsKg: 50}],
        },
        {
          id: 3,
          WorkoutId: 2,
          MuscleGroup: 'Chest',
          Name: 'Pec-Deck',
          Notes: 'Notes here',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 50},
            {SetNumber: 2, Reps: 6, WeightsKg: 60},
            {SetNumber: 3, Reps: 6, WeightsKg: 60},
          ],
        },
        {
          Id: 4,
          Name: 'Squat',
          Sets: [
            {SetNumber: 1, Reps: 12, WeightsKg: 40},
            {SetNumber: 2, Reps: 8, WeightsKg: 60},
            {SetNumber: 3, Reps: 6, WeightsKg: 70},
          ],
        },
        {
          Id: 5,
          Name: 'Bench Press',
          Sets: [
            {SetNumber: 1, Reps: 10, WeightsKg: 40},
            {SetNumber: 2, Reps: 8, WeightsKg: 60},
            {SetNumber: 3, Reps: 6, WeightsKg: 70},
          ],
        },
        {
          Id: 6,
          Name: 'Lat Pull Down',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 60},
            {SetNumber: 2, Reps: 6, WeightsKg: 60},
            {SetNumber: 3, Reps: 6, WeightsKg: 60},
          ],
        },
        {
          Id: 7,
          Name: 'Leg Curl',
          Sets: [
            {SetNumber: 1, Reps: 6, WeightsKg: 35},
            {SetNumber: 2, Reps: 6, WeightsKg: 35},
            {SetNumber: 3, Reps: 6, WeightsKg: 35},
          ],
        },
        {
          Id: 8,
          Name: 'Upright Row',
          Sets: [
            {SetNumber: 1, Reps: 6, WeightsKg: 40},
            {SetNumber: 2, Reps: 6, WeightsKg: 40},
          ],
        },
        {
          Id: 9,
          Name: 'Skullcrusher',
          MuscleGroup: ['Triceps'],
          Sets: [
            {SetNumber: 1, Reps: 6, WeightsKg: 20},
            {SetNumber: 2, Reps: 6, WeightsKg: 20},
          ],
        },
        {
          Id: 10,
          Name: 'Barbell Curl',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 20},
            {SetNumber: 2, Reps: 6, WeightsKg: 25},
          ],
        },
        {
          Id: 11,
          Name: 'Barbell Shrug',
          Sets: [
            {SetNumber: 1, Reps: 6, WeightsKg: 25},
            {SetNumber: 2, Reps: 6, WeightsKg: 25},
          ],
        },
        {
          Id: 12,
          Name: 'Weighted Knee Raise',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 10},
            {SetNumber: 2, Reps: 8, WeightsKg: 10},
            {SetNumber: 3, Reps: 8, WeightsKg: 10},
          ],
        },
        {
          Id: 13,
          Name: 'Weighted Crunches',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 10},
            {SetNumber: 2, Reps: 8, WeightsKg: 10},
            {SetNumber: 3, Reps: 8, WeightsKg: 10},
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

    await AsyncStorage.setItem(
      'AdminUser',
      JSON.stringify({
        Workouts: [
          {id: 1, Name: 'Mass'},
          {id: 2, Name: '4 days Upper Lower'},
          {
            id: 3,
            Name: 'Total Body',
            Schedule: [
              {
                index: 1,
                DayRoutineId: 1,
                Day: 'Saturday',
                ExerciseIds: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
              },
              {index: 2, DayRoutineId: 2, Day: 'Monday'},
              {index: 3, DayRoutineId: 3, Day: 'Wednesday'},
            ],
          },
        ],
      }),
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
      console.log(data);
    }
  } catch (error) {
    return null;
  }
};

export const getAsyncStorageItem = async itemKey => {
  try {
    const data = await AsyncStorage.getItem(itemKey);
    if (data !== null) {
      return JSON.parse(data);
    }
  } catch (error) {
    return null;
  }
};

export const setAsyncStorageItem = async (itemKey, item) => {
  let obj = {};
  obj[itemKey] = item;

  try {
    await AsyncStorage.setItem('AdminUser', JSON.stringify(obj));
    return 'success';
  } catch (error) {
    return error;
  }
};
