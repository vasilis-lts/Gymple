import React, {useState} from 'react';
import {View, TouchableHighlight, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../Colors';

function Collapsible(props) {
  const [Expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => setExpanded(!Expanded)}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Icon
            name={Expanded ? 'expand-less' : 'expand-more'}
            size={25}
            color={Colors.White}
          />
        </View>
      </TouchableHighlight>

      {Expanded && <View style={styles.body}>{props.children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.Black,
    padding: 10,
  },
  title: {
    flex: 1,
    color: Colors.White,
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
  },
  button: {},
  buttonImage: {
    width: 30,
    height: 25,
  },
  body: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

export default Collapsible;
