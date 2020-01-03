import AsyncStorage from '@react-native-community/async-storage';

const mockStorage = {
  Workouts: [],
  Exercises: [],
};

export const initMockStorage = async () => {
  console.log('Initializing Mock Storage');
  try {
    await AsyncStorage.setItem('Exercises', JSON.stringify([]));
    await AsyncStorage.setItem('Workouts', JSON.stringify([]));
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
      return data;
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
    return 'error';
  }
};
