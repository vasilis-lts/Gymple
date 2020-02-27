import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
import {Colors} from '../Colors';

function MainScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{marginTop: 100}}>
        <Text style={styles.title}>Gymple</Text>
        <Text style={{color: Colors.White, textAlign: 'center'}}>v1.0</Text>
      </View>
      <View style={{marginTop: 150}}>
        <Button
          title="View your workouts"
          onPress={() => navigation.push('WorkoutList')}
        />
      </View>
    </View>
  );
}

MainScreen.navigationOptions = {headerShown: false};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.Black,
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: 52,
    color: Colors.White,
  },
});

export default MainScreen;
