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
  UpdateWorkoutByDayRoutine: async (dayRoutine, workoutId) => {
    const Workouts = await WorkoutsController.GetWorkouts();

    let WorkoutToUpdate = Workouts.find(workout => workout.id === workoutId);

    WorkoutToUpdate.Schedule[dayRoutine.index - 1] = dayRoutine;

    console.log(WorkoutToUpdate.Schedule[dayRoutine.index - 1].Exercises[0]);

    const indexToUpdate = Workouts.findIndex(
      workout => workout.id === workoutId,
    );
    console.log('indexToUpdate', indexToUpdate);
    Workouts[indexToUpdate].WorkoutToUpdate;

    try {
      await AsyncStorage.setItem(
        'AdminUser',
        JSON.stringify({
          Workouts,
        }),
      );
      return 'success';
    } catch (error) {
      return error;
    }
  },
};
export default WorkoutsController;
