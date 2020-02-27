import React, {useState} from 'react';
import {Modal, Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {Colors} from '../Colors';

function LoadingModal() {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: Colors.White,
          alignItems: 'center',
          borderRadius: 2,
        }}>
        <View style={styles.content}>
          <ActivityIndicator style={{marginHorizontal: 5}} />
          <Text style={styles.title}>Saving...</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  title: {
    fontSize: 18,
    color: Colors.Black,
    marginVertical: 5,
  },
  content: {display: 'flex', flexDirection: 'row', padding: 10},
});

export default LoadingModal;
