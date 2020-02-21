import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

function Panel(props) {
  const [Title, setTitle] = useState(props.title);
  const [Expanded, setExpanded] = useState(false);
  const [MaxHeight, setMaxHeight] = useState(null);
  const [MinHeight, setMinHeight] = useState(null);

  const [CurrentPanelHeight, setCurrentPanelHeight] = useState(30);

  const Animation = useRef(new Animated.Value());

  useEffect(() => {
    // console.log(new Animated.Value());
    return () => {
      // cleanup
    };
  }, []);

  const toggle = () => {
    console.log('toggle');
    let initialValue = Expanded ? MaxHeight + MinHeight : MinHeight;
    let finalValue = Expanded ? MinHeight : MaxHeight + MinHeight;

    setExpanded(!Expanded);

    setCurrentPanelHeight(finalValue);

    // Animation.current.setValue(initialValue);

    // Animated.spring(Animation.current, {
    //   toValue: finalValue,
    // }).start();
  };

  const _setMinHeight = e => {
    console.log('min height ' + e.nativeEvent.layout.height);
    setMinHeight(e.nativeEvent.layout.height);
  };

  const _setMaxHeight = e => {
    console.log('max height ' + e.nativeEvent.layout.height);
    setMaxHeight(e.nativeEvent.layout.height);
  };

  return (
    <Animated.View
      style={{
        backgroundColor: '#fff',
        margin: 10,
        overflow: 'hidden',
        height: CurrentPanelHeight,
      }}>
      <View
        style={styles.titleContainer}
        onLayout={e => _setMinHeight(e)}
        onPress={() => toggle()}>
        <TouchableHighlight style={styles.button} underlayColor="#f1f1f1">
          <Text style={styles.title}>{Title}</Text>
          {/* <Image style={styles.buttonImage} source={icon}></Image> */}
        </TouchableHighlight>
      </View>

      <View style={styles.body} onLayout={e => _setMaxHeight(e)}>
        {props.children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    margin: 10,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    backgroundColor: '#777',
  },
  title: {
    flex: 1,
    padding: 10,
    color: '#2a2f43',
    fontWeight: 'bold',
  },
  button: {},
  buttonImage: {
    width: 30,
    height: 25,
  },
  body: {
    padding: 10,
    paddingTop: 0,
  },
});

export default Panel;
