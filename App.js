/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import auth from '@react-native-firebase/auth';

import React, {useEffect} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WorkoutList from './screens/WorkoutList';
import DailyWorkoutForm from './screens/DailyWorkoutForm';
import CreateWorkoutWizard from './screens/CreateWorkoutWizard';
import LoadingScreen from './screens/LoadingScreen';
import AddExerciseScreen from './screens/AddExerciseScreen';

import {initMockStorage, getAllStorageKeys} from './AsyncStorage';

const RootStack = createStackNavigator(
  {
    WorkoutList: {screen: WorkoutList},
    DailyWorkoutForm: DailyWorkoutForm,
    CreateWorkoutWizard: CreateWorkoutWizard,
    LoadingScreen: LoadingScreen,
    AddExerciseScreen: AddExerciseScreen,
  },
  {
    initialRouteName: 'CreateWorkoutWizard',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
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
  useEffect(() => {
    initApp();

    return () => {
      // cleanup
    };
  }, []);

  const initApp = async () => {
    initMockStorage();
    console.log('Async Storage:');
    console.log('--------------');
    await getAllStorageKeys();
    console.log('--------------');
  };

  return <AppContainer />;
};
export default App;
