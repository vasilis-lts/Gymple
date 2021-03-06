import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import firebase from '../Firebase.js';

import {NavigationActions, StackActions} from 'react-navigation';
import auth from '@react-native-firebase/auth';
import {initMockStorage, getAllStorageKeys} from '../AsyncStorage.js';

export default function LoadingScreen({navigation}) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState('');

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.log('Auth state changed!');
    if (user.email) {
      setUser(user.email);

      console.log(user);
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    signIn();

    return () => {
      // unmount
    };
  }, []);

  const initAppData = async () => {
    initMockStorage();

    // reset stack and navigate
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'WorkoutList'})],
    });

    navigation.dispatch(resetAction);
  };

  const signIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(
        'bill.litsas@gmail.com',
        'bill123',
      );
      initAppData();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <ActivityIndicator size="large" />
          <Text style={{fontSize: 24}}>
            {user ? 'Welcome' : 'Checking auth...'}
          </Text>
          <Text>{initializing ? 'Initializing' : ''}</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

LoadingScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
