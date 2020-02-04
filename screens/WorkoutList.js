import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  Alert,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {getAsyncStorageItem, setAsyncStorageItem} from '../AsyncStorage';
import DialogModal from '../components/DialogModal';
import {Colors} from '../Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WorkoutsController from '../controllers/WorkoutsController';

let testFunc;

const WorkoutList = ({navigation}) => {
  const [Data, setData] = useState([]);
  const [showWorkoutModal, setshowWorkoutModal] = useState(false);

  useEffect(() => {
    getWorkouts();

    // getDatabase();
  }, []);

  const getWorkouts = async () => {
    const Workouts = await WorkoutsController.GetWorkouts();
    setData(Workouts);
  };

  const getDatabase = async () => {
    //
    // Read the users documents
    const querySnapshot = await firestore()
      .collection('workouts')
      .doc('MG0birRAbwVFUaHZWmng98sAt203')
      .get();

    const workoutArray = [...Object.values(querySnapshot.data())];

    console.log(workoutArray);
  };

  const writeDatabase = () => {
    firestore()
      .collection('workouts')
      .doc('MG0birRAbwVFUaHZWmng98sAt203')
      .set({
        1: 'Ώμοι',
        2: 'Στήθος',
      })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef);
      })
      .catch(function(error) {
        console.log('Error adding document: ', error);
      });
  };

  testFunc = () => {
    // navigation.navigate('CreateWorkoutWizard');
    setshowWorkoutModal(true);
  };

  const goToWorkoutMuscleGroups = id => {
    navigation.push('WorkoutMuscleGroupsScreen', {
      WorkoutId: id,
    });
  };

  const saveWorkout = async workoutName => {
    setshowWorkoutModal(false);

    const Workout = {
      Name: workoutName,
    };

    const Workouts = await WorkoutsController.SaveWorkout(Workout);
    if (Workouts.length) {
      setData(Workouts);
    } else {
      setData([]);
    }
  };

  const deleteConfirmation = (workoutId, workoutName) => {
    console.log('delete');
    Alert.alert(
      'Delete Confirmation',
      `Delete ${workoutName} Workout?`,
      [
        // {
        //   text: 'Ask me later',
        //   onPress: () => console.log('Ask me later pressed'),
        // },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Delete', onPress: () => deleteWorkout(workoutId, workoutName)},
      ],
      {cancelable: true},
    );
  };

  const deleteWorkout = async (workoutId, workoutName) => {
    //

    const Workouts = await WorkoutsController.DeleteWorkout(workoutId);
    if (Workouts.length) {
      setData(Workouts);
    } else {
      setData([]);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView keyExtractor={item => `${item.id}`}>
          {Data.length ? (
            Data.map(item => (
              <TouchableWithoutFeedback
                key={`${item.id}`}
                onPress={() => goToWorkoutMuscleGroups(item.id)}>
                <View style={styles.item}>
                  <Text style={styles.Name}>{item.Name}</Text>
                  <View
                    style={{
                      backgroundColor: Colors.Red,
                      padding: 5,
                      borderRadius: 25,
                    }}>
                    <Icon
                      name="delete"
                      size={25}
                      color={Colors.White}
                      onPress={() => deleteConfirmation(item.id, item.Name)}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))
          ) : (
            <View>
              <Text>No Workouts! Add a new one!</Text>
            </View>
          )}

          <DialogModal
            title={'Enter a name for the workout:'}
            visible={showWorkoutModal}
            onClose={() => setshowWorkoutModal(false)}
            onAccept={val => saveWorkout(val)}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

WorkoutList.navigationOptions = {
  title: 'Your Workouts',
  headerRight: () => (
    <Text style={{marginRight: 10, color: 'white'}} onPress={() => testFunc()}>
      Add New
    </Text>
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 2,
    marginHorizontal: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Name: {
    fontSize: 22,
    color: Colors.White,
  },
});

export default WorkoutList;
