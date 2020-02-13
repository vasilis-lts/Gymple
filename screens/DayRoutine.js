import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {Colors} from '../Colors';

function DayRoutine({navigation}) {
  const [DayRoutine, setDayRoutine] = useState([]);

  useEffect(() => {
    const _DayRoutine = navigation.getParam('DayRoutine');
    console.log('Routine: ', _DayRoutine);
    setDayRoutine(_DayRoutine);
    return () => {
      //
    };
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView keyExtractor={item => `${item.id}`}>
          <Text>Day Routine</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

DayRoutine.navigationOptions = {
  title: 'Day Routine',
  // headerRight: () => (
  //   <Text style={{marginRight: 10, color: 'white'}} onPress={() => testFunc()}>
  //     Add New DayRoutine
  //   </Text>
  // ),
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

export default DayRoutine;
