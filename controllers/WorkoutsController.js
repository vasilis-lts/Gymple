import {getAsyncStorageItem, setAsyncStorageItem} from '../AsyncStorage';

const WorkoutsController = {
  GetWorkouts: async () => {
    console.log(WorkoutsController);
    return await getAsyncStorageItem('Workouts');
  },
  SaveWorkout: async Workout => {
    const Workouts = await getAsyncStorageItem('Workouts');
    Workout.id = Workouts[Workouts.length - 1].id + 1;
    Workouts.push(Workout);
    const res = await setAsyncStorageItem('Workouts', Workouts);
    if (res === 'success') {
      return Workouts;
    } else {
      return 'error';
    }
  },
  DeleteWorkout: async workoutId => {
    const Workouts = await WorkoutsController.GetWorkouts();
    const _Workouts = Workouts.filter(workout => workout.id !== workoutId);
    return _Workouts;
  },
};
export default WorkoutsController;
