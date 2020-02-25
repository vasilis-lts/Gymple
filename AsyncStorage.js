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
        {
          Id: 20,
          Name: 'Deadlift',
          Sets: [
            {SetNumber: 1, Reps: 10, WeightsKg: 40},
            {SetNumber: 2, Reps: 8, WeightsKg: 60},
            {SetNumber: 3, Reps: 6, WeightsKg: 70},
          ],
        },
        {
          Id: 21,
          Name: 'Leg Extension',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 12.5},
            {SetNumber: 2, Reps: 8, WeightsKg: 12.5},
            {SetNumber: 3, Reps: 8, WeightsKg: 12.5},
          ],
        },
        {
          Id: 22,
          Name: 'Dumbbell Bench Press',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 20},
            {SetNumber: 2, Reps: 6, WeightsKg: 22},
            {SetNumber: 3, Reps: 6, WeightsKg: 22},
          ],
        },
        {
          Id: 23,
          Name: 'Seated Barbell Press',
          Sets: [
            {SetNumber: 1, Reps: 6, WeightsKg: 20},
            {SetNumber: 2, Reps: 6, WeightsKg: 20},
            {SetNumber: 3, Reps: 6, WeightsKg: 20},
          ],
        },
        {
          Id: 24,
          Name: 'Seated Calf Raise',
          Sets: [
            {SetNumber: 1, Reps: 20, WeightsKg: 110},
            {SetNumber: 2, Reps: 20, WeightsKg: 110},
          ],
        },
        {
          Id: 25,
          Name: 'Cable Tricep Extension',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 8},
            {SetNumber: 2, Reps: 8, WeightsKg: 8},
          ],
        },
        {
          Id: 26,
          Name: 'Concentration Curl',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 15},
            {SetNumber: 2, Reps: 8, WeightsKg: 15},
          ],
        },
        {
          Id: 27,
          Name: 'Rear Lateral',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 10},
            {SetNumber: 2, Reps: 8, WeightsKg: 10},
          ],
        },
        {
          Id: 28,
          Name: 'Weighted Leg Raises',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 10},
            {SetNumber: 2, Reps: 8, WeightsKg: 10},
          ],
        },
        {
          Id: 40,
          Name: 'Leg Press',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 110},
            {SetNumber: 2, Reps: 8, WeightsKg: 110},
            {SetNumber: 3, Reps: 8, WeightsKg: 110},
          ],
        },
        {
          Id: 41,
          Name: 'Barbell Row',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 20},
            {SetNumber: 2, Reps: 8, WeightsKg: 20},
            {SetNumber: 3, Reps: 8, WeightsKg: 20},
          ],
        },
        {
          Id: 42,
          Name: 'Romanian Deadlift',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 40},
            {SetNumber: 2, Reps: 8, WeightsKg: 40},
          ],
        },
        {
          Id: 43,
          Name: 'Incline Bench Press',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 40},
            {SetNumber: 2, Reps: 6, WeightsKg: 50},
            {SetNumber: 3, Reps: 6, WeightsKg: 50},
          ],
        },
        {
          Id: 44,
          Name: 'Side Lateral',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 12},
            {SetNumber: 2, Reps: 8, WeightsKg: 12},
          ],
        },
        {
          Id: 45,
          Name: 'Close Grip Push Ups',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 0},
            {SetNumber: 2, Reps: 8, WeightsKg: 0},
            {SetNumber: 3, Reps: 8, WeightsKg: 0},
          ],
        },
        {
          Id: 46,
          Name: 'Pinwheel Curl',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 15},
            {SetNumber: 2, Reps: 8, WeightsKg: 15},
          ],
        },
        {
          Id: 47,
          Name: 'Dumbbell Shrug',
          Sets: [
            {SetNumber: 1, Reps: 8, WeightsKg: 22},
            {SetNumber: 2, Reps: 8, WeightsKg: 22},
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
          // {id: 1, Name: 'Mass'},
          // {id: 2, Name: '4 days Upper Lower'},
          {
            id: 3,
            Name: 'Total Body',
            Schedule: [
              {
                index: 1,
                DayRoutineId: 1,
                Day: 'Saturday',
                ExerciseIds: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 28],
                Exercises: [
                  {
                    Name: 'Squat',
                    Sets: [
                      {SetNumber: 1, Reps: 12, WeightsKg: 40},
                      {SetNumber: 2, Reps: 8, WeightsKg: 60},
                      {SetNumber: 3, Reps: 6, WeightsKg: 70},
                    ],
                  },
                  {
                    Name: 'Bench Press',
                    Sets: [
                      {SetNumber: 1, Reps: 10, WeightsKg: 40},
                      {SetNumber: 2, Reps: 8, WeightsKg: 60},
                      {SetNumber: 3, Reps: 6, WeightsKg: 70},
                    ],
                  },
                  {
                    Name: 'Lat Pull Down',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 60},
                      {SetNumber: 2, Reps: 6, WeightsKg: 60},
                      {SetNumber: 3, Reps: 6, WeightsKg: 60},
                    ],
                  },
                  {
                    Name: 'Leg Curl',
                    Sets: [
                      {SetNumber: 1, Reps: 6, WeightsKg: 35},
                      {SetNumber: 2, Reps: 6, WeightsKg: 35},
                      {SetNumber: 3, Reps: 6, WeightsKg: 35},
                    ],
                  },
                  {
                    Name: 'Upright Row',
                    Sets: [
                      {SetNumber: 1, Reps: 6, WeightsKg: 40},
                      {SetNumber: 2, Reps: 6, WeightsKg: 40},
                    ],
                  },
                  {
                    Name: 'Skullcrusher',
                    MuscleGroup: ['Triceps'],
                    Sets: [
                      {SetNumber: 1, Reps: 6, WeightsKg: 20},
                      {SetNumber: 2, Reps: 6, WeightsKg: 20},
                    ],
                  },
                  {
                    Name: 'Barbell Curl',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 20},
                      {SetNumber: 2, Reps: 6, WeightsKg: 25},
                    ],
                  },
                  {
                    Name: 'Barbell Shrug',
                    Sets: [
                      {SetNumber: 1, Reps: 6, WeightsKg: 25},
                      {SetNumber: 2, Reps: 6, WeightsKg: 25},
                    ],
                  },
                  {
                    Name: 'Weighted Knee Raise',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 10},
                      {SetNumber: 2, Reps: 8, WeightsKg: 10},
                      {SetNumber: 3, Reps: 8, WeightsKg: 10},
                    ],
                  },
                  {
                    Name: 'Weighted Crunches',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 10},
                      {SetNumber: 2, Reps: 8, WeightsKg: 10},
                      {SetNumber: 3, Reps: 8, WeightsKg: 10},
                    ],
                  },
                  {
                    Name: 'Weighted Leg Raises',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 10},
                      {SetNumber: 2, Reps: 8, WeightsKg: 10},
                    ],
                  },
                ],
              },
              {
                index: 2,
                DayRoutineId: 2,
                Day: 'Monday',
                ExerciseIds: [20, 21, 22, 23, 24, 25, 26, 27, 13, 28],
                Exercises: [
                  {
                    Name: 'Deadlift',
                    Sets: [
                      {SetNumber: 1, Reps: 10, WeightsKg: 40},
                      {SetNumber: 2, Reps: 8, WeightsKg: 60},
                      {SetNumber: 3, Reps: 6, WeightsKg: 70},
                    ],
                  },
                  {
                    Name: 'Leg Extension',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 12.5},
                      {SetNumber: 2, Reps: 8, WeightsKg: 12.5},
                      {SetNumber: 3, Reps: 8, WeightsKg: 12.5},
                    ],
                  },
                  {
                    Name: 'Dumbbell Bench Press',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 20},
                      {SetNumber: 2, Reps: 6, WeightsKg: 22},
                      {SetNumber: 3, Reps: 6, WeightsKg: 22},
                    ],
                  },
                  {
                    Name: 'Seated Barbell Press',
                    Sets: [
                      {SetNumber: 1, Reps: 6, WeightsKg: 20},
                      {SetNumber: 2, Reps: 6, WeightsKg: 20},
                      {SetNumber: 3, Reps: 6, WeightsKg: 20},
                    ],
                  },
                  {
                    Name: 'Seated Calf Raise',
                    Sets: [
                      {SetNumber: 1, Reps: 20, WeightsKg: 110},
                      {SetNumber: 2, Reps: 20, WeightsKg: 110},
                    ],
                  },
                  {
                    Name: 'Cable Tricep Extension',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 8},
                      {SetNumber: 2, Reps: 8, WeightsKg: 8},
                    ],
                  },
                  {
                    Name: 'Concentration Curl',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 15},
                      {SetNumber: 2, Reps: 8, WeightsKg: 15},
                    ],
                  },
                  {
                    Name: 'Rear Lateral',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 10},
                      {SetNumber: 2, Reps: 8, WeightsKg: 10},
                    ],
                  },
                  {
                    Name: 'Weighted Crunches',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 10},
                      {SetNumber: 2, Reps: 8, WeightsKg: 10},
                      {SetNumber: 3, Reps: 8, WeightsKg: 10},
                    ],
                  },
                  {
                    Name: 'Weighted Leg Raises',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 10},
                      {SetNumber: 2, Reps: 8, WeightsKg: 10},
                    ],
                  },
                ],
              },
              {
                index: 3,
                DayRoutineId: 3,
                Day: 'Wednesday',
                ExerciseIds: [40, 41, 42, 43, 44, 45, 46, 47, 13, 28],
                Exercises: [
                  {
                    Id: 40,
                    Name: 'Leg Press',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 110},
                      {SetNumber: 2, Reps: 8, WeightsKg: 110},
                      {SetNumber: 3, Reps: 8, WeightsKg: 110},
                    ],
                  },
                  {
                    Id: 41,
                    Name: 'Barbell Row',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 20},
                      {SetNumber: 2, Reps: 8, WeightsKg: 20},
                      {SetNumber: 3, Reps: 8, WeightsKg: 20},
                    ],
                  },
                  {
                    Id: 42,
                    Name: 'Romanian Deadlift',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 40},
                      {SetNumber: 2, Reps: 8, WeightsKg: 40},
                    ],
                  },
                  {
                    Id: 43,
                    Name: 'Incline Bench Press',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 40},
                      {SetNumber: 2, Reps: 6, WeightsKg: 50},
                      {SetNumber: 3, Reps: 6, WeightsKg: 50},
                    ],
                  },
                  {
                    Id: 44,
                    Name: 'Side Lateral',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 12},
                      {SetNumber: 2, Reps: 8, WeightsKg: 12},
                    ],
                  },
                  {
                    Id: 45,
                    Name: 'Close Grip Push Ups',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 0},
                      {SetNumber: 2, Reps: 8, WeightsKg: 0},
                      {SetNumber: 3, Reps: 8, WeightsKg: 0},
                    ],
                  },
                  {
                    Id: 46,
                    Name: 'Pinwheel Curl',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 15},
                      {SetNumber: 2, Reps: 8, WeightsKg: 15},
                    ],
                  },
                  {
                    Id: 47,
                    Name: 'Dumbbell Shrug',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 22},
                      {SetNumber: 2, Reps: 8, WeightsKg: 22},
                    ],
                  },
                  {
                    Name: 'Weighted Crunches',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 10},
                      {SetNumber: 2, Reps: 8, WeightsKg: 10},
                      {SetNumber: 3, Reps: 8, WeightsKg: 10},
                    ],
                  },
                  {
                    Name: 'Weighted Leg Raises',
                    Sets: [
                      {SetNumber: 1, Reps: 8, WeightsKg: 10},
                      {SetNumber: 2, Reps: 8, WeightsKg: 10},
                    ],
                  },
                ],
              },
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
