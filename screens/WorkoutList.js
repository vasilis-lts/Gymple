import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const DATA = [
  {
    id: '1',
    title: 'Chest',
  },
  {
    id: '2',
    title: 'Πόδια',
  },
];

let testFunc;

const WorkoutList = ({navigation}) => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    storeDataToAsyncStorage();
  }, []);

  const storeDataToAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('Tasks', JSON.stringify(DATA));
      retrieveData();
    } catch (error) {
      // Error saving data
      alert('Error saving data');
    }
  };

  const retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem('Tasks');
      if (data !== null) {
        // We have data!!
        setData(JSON.parse(data));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  testFunc = () => {
    navigation.navigate('CreateWorkoutWizard');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={Data}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </>
  );
};

WorkoutList.navigationOptions = {
  title: 'Home',
  headerRight: () => (
    <Text style={{marginRight: 10}} onPress={() => testFunc()}>
      New
    </Text>
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#00f',
    padding: 20,
    marginTop: 2,
    marginHorizontal: 2,
  },

  title: {
    fontSize: 32,
    color: '#0f9',
  },
});

export default WorkoutList;
