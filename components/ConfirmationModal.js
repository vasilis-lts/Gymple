import React from 'react';
import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';

export default function ConfirmationModal(props) {
  return (
    <Modal
      style={{height: 50}}
      animationType="slide"
      transparent={false}
      visible={props.visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={{marginTop: 22}}>
        <View>
          <Text>Hello World!</Text>

          <TouchableHighlight onPress={() => props.onClose()}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}
