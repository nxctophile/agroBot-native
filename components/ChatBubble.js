import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const ChatBubble = props => {
  return (
    <View
      style={[
        styles.bubble,
        props.role === 'user' ? styles.myMessage : styles.theirMessage,
      ]}>
      <Text
        style={[
          styles.message,
          {color: props.role === 'user' ? '#000' : '#dee6ea'},
        ]}>
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
    marginTop: 10,
    marginBottom: 7,
    marginLeft: 15,
    marginRight: 15,
  },
  message: {
    fontSize: 16,
  },
  myMessage: {
    backgroundColor: '#75A658',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  theirMessage: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#75A658',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
});

export default ChatBubble;
