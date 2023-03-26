import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const ChatBubble = props => {
  return (
    <View
      style={[
        styles.bubble,
        props.isClientSide ? styles.myMessage : styles.theirMessage,
      ]}>
      <Text
        style={[styles.message, {color: props.isClientSide ? '#000' : '#fff'}]}>
        {props.bubble}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    borderRadius: 20,
    maxWidth: '80%',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
  },
  myMessage: {
    backgroundColor: '#C5DACA',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  theirMessage: {
    backgroundColor: '#5C7F64',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
});

export default ChatBubble;
