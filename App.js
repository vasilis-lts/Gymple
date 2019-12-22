/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import auth from '@react-native-firebase/auth';

import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WorkoutList from './screens/WorkoutList';
import DailyWorkoutForm from './screens/DailyWorkoutForm';
import CreateWorkoutWizard from './screens/CreateWorkoutWizard';
import LoadingScreen from './screens/LoadingScreen';

const RootStack = createStackNavigator(
  {
    LoadingScreen: LoadingScreen,
    WorkoutList: WorkoutList,
    DailyWorkoutForm: DailyWorkoutForm,
    CreateWorkoutWizard: CreateWorkoutWizard,
  },
  {
    initialRouteName: 'LoadingScreen',
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
  return <AppContainer />;
};
export default App;
