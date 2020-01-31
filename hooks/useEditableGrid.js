import React, {useState, useEffect} from 'react';
import {Button, Text, View, TextInput, TouchableHighlight} from 'react-native';
import {Colors} from '../Colors';
import {Icon} from 'react-native-elements';

let FocusFieldValue = '';
let _Values = [];

function useEditableGrid(
  data,
  submitCallback,
  columns,
  deleteRow,
  saveMethod = 'onBlur',
) {
  const [Elements, setElements] = useState([]);
  const [gridValues, setgridValues] = useState([]);
  const defaultFieldWidth = 70;
  const deleteActionWidth = 40;

  useEffect(() => {
    _Values = data;
    setgridValues(_Values);
    createElements(_Values);
  }, [data]);

  // createElements(Values);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const createElements = Values => {
    if (Values.length) {
      let _Elements = [];
      let header = [];
      let gridWidth = 0;

      Values.forEach((obj, index) => {
        let row = [];
        for (const prop in obj) {
          if (index === 0) {
            header.push(
              <TextInput
                name={prop}
                key={`${prop}-header`}
                style={{
                  width: columns[prop]
                    ? columns[prop].width
                    : defaultFieldWidth,
                  borderLeftWidth: 1,
                  borderLeftColor: Colors.Gray,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.Gray,
                  textAlign: 'center',
                  paddingVertical: 2,
                  color: 'black',
                }}
                value={columns[prop] ? columns[prop].header : ''}
                editable={false}
              />,
            );

            gridWidth += columns[prop]
              ? columns[prop].width
              : defaultFieldWidth;
          }

          row.push(
            <TextInput
              name={prop}
              key={`${prop}${obj.id}`}
              keyboardType={'numeric'}
              selectTextOnFocus={true}
              style={{
                width: columns[prop] ? columns[prop].width : defaultFieldWidth,
                borderLeftWidth: 1,
                borderLeftColor: Colors.Gray,
                borderBottomWidth: 1,
                borderBottomColor: Colors.Gray,
                textAlign: 'center',
                paddingVertical: 5,
              }}
              value={`${obj[prop]}` || ''}
              // onFocus={e => onFocusField(e)}
              onChangeText={text => handleChange(text, index, prop)}
              // onBlur={e => onBlurField(e, index)}
            />,
          );
        }
        _Elements.push(
          <View
            style={{display: 'flex', flexDirection: 'row'}}
            key={`row${index}`}>
            {row}
            <View
              key={`delete-row${index}`}
              style={{
                width: deleteActionWidth,
                borderLeftWidth: 1,
                borderLeftColor: Colors.Gray,
                borderBottomWidth: 1,
                borderBottomColor: Colors.Gray,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="remove-circle"
                onPress={() => deleteRow(index)}
                color={Colors.Red}
              />
            </View>
          </View>,
        );
      });

      header.push(
        <View
          key={'header-col'}
          style={{
            width: deleteActionWidth,
            backgroundColor: Colors.GrayLight,
            borderLeftWidth: 1,
            borderLeftColor: Colors.Gray,
            borderBottomWidth: 1,
            borderBottomColor: Colors.Gray,
            borderRightWidth: 1,
            borderRightColor: Colors.Gray,
          }}
        />,
      );

      setElements(
        <View
          style={{
            borderTopColor: Colors.Gray,
            borderTopWidth: 1,
            borderRightColor: Colors.Gray,
            borderRightWidth: 1,
            width: gridWidth + deleteActionWidth,
          }}>
          <View style={{display: 'flex', flexDirection: 'row'}}>{header}</View>
          {_Elements}
        </View>,
      );
    }
    // };
  };

  const handleChange = (text, index, prop) => {
    _Values[index][prop] = text;
    submitCallback(_Values);
    createElements(_Values);
  };

  const onFocusField = e => {
    FocusFieldValue = e.target.value;
  };

  const onBlurField = e => {
    if (saveMethod === 'onBlur') {
      if (`${FocusFieldValue}` !== `${e.target.value}`) {
        submitCallback(Values);
      }
    }
    FocusFieldValue = '';
  };

  const handleSubmit = e => {
    submitCallback(Values);
  };

  return [Elements, handleSubmit, gridValues];
}

export default useEditableGrid;
