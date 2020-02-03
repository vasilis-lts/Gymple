import React, {useState} from 'react';
import {
  Modal,
  Text,
  Button,
  View,
  Alert,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Colors} from '../Colors';

const DialogModal = props => {
  const [InputValue, setInputValue] = useState('');

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            marginTop: '40%',
            minHeight: '20%',
            width: '80%',
            backgroundColor: Colors.White,
            padding: 20,
            alignSelf: 'center',
          }}>
          <View>
            <Text style={styles.title}>{props.title}</Text>

            <TextInput
              style={{
                height: 50,
                borderBottomColor: Colors.Gray,
                borderBottomWidth: 1,
                fontSize: 22,
                marginBottom: 10,
              }}
              value={InputValue}
              onChangeText={text => setInputValue(text)}
              autoFocus
            />

            <View style={styles.fixToText}>
              <View style={{marginLeft: 5}}>
                <Button
                  title="Accept"
                  disabled={InputValue === ''}
                  onPress={() => props.onAccept(InputValue)}
                />
              </View>
              <View style={{marginLeft: 5}}>
                <Button
                  title="Cancel"
                  color={Colors.Gray}
                  onPress={() => props.onClose()}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: Colors.Black,
    marginVertical: 5,
  },
  fixToText: {
    marginVertical: 10,

    flexDirection: 'row-reverse',
  },
});

export default DialogModal;
