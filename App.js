/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import auth from '@react-native-firebase/auth';

import React from 'react';
import {createAppContainer, ThemeColors} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WorkoutList from './screens/WorkoutList';
import DailyWorkoutForm from './screens/DailyWorkoutForm';
import CreateWorkoutWizard from './screens/CreateWorkoutWizard';
import LoadingScreen from './screens/LoadingScreen';
import AddExerciseScreen from './screens/AddExerciseScreen';
import WorkoutMuscleGroupsScreen from './screens/WorkoutMuscleGroupsScreen';
import ViewExercisesScreen from './screens/ViewExercisesScreen';
import ExerciseDetails from './screens/ExerciseDetails';
import WorkoutSchedule from './screens/WorkoutSchedule';
import DayRoutine from './screens/DayRoutine';

const RootStack = createStackNavigator(
  {
    WorkoutList: {screen: WorkoutList},
    DailyWorkoutForm: DailyWorkoutForm,
    CreateWorkoutWizard: CreateWorkoutWizard,
    LoadingScreen: LoadingScreen,
    AddExerciseScreen: AddExerciseScreen,
    WorkoutMuscleGroupsScreen: WorkoutMuscleGroupsScreen,
    ViewExercisesScreen: ViewExercisesScreen,
    ExerciseDetails: ExerciseDetails,
    WorkoutSchedule: WorkoutSchedule,
    DayRoutine: DayRoutine,
  },
  {
    initialRouteName: 'WorkoutList',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: ThemeColors.dark.bodyContent,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRightContainerStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppContainer = createAppContainer(RootStack);

const App = () => {
  return <AppContainer />;
};
export default App;
