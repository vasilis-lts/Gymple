import AsyncStorage from '@react-native-community/async-storage';
import {getAsyncStorageItem, setAsyncStorageItem} from '../AsyncStorage';

const WorkoutsController = {
  GetWorkouts: async () => {
    const User = await getAsyncStorageItem('AdminUser');
    return User.Workouts;
  },
  SaveWorkout: async Workout => {
    const User = await getAsyncStorageItem('AdminUser');
    const Workouts = User.Workouts;
    Workout.id = Workouts[Workouts.length - 1].id + 1;
    Workouts.push(Workout);
    User.Workouts = Workouts;

    try {
      await AsyncStorage.setItem('AdminUser', JSON.stringify(User));
      return Workouts;
    } catch (error) {
      return null;
    }
  },
  DeleteWorkout: async workoutId => {
    const User = await getAsyncStorageItem('AdminUser');
    const Workouts = User.Workouts;
    const _Workouts = Workouts.filter(workout => workout.id !== workoutId);
    User.Workouts = _Workouts;

    try {
      await AsyncStorage.setItem('AdminUser', JSON.stringify(User));
      return _Workouts;
    } catch (error) {
      return null;
    }
  },
};
export default WorkoutsController;
