import React, {useState, useRef} from 'react';
import ChatBubble from './ChatBubble';
import {StyleSheet, ScrollView, Alert, Button, View, Text} from 'react-native';

function ResponseContainer(props) {
  const styles = StyleSheet.create({
    ResponseContainer: {
      marginBottom: 86,
    },
  });
  return (
    <>
      <ScrollView ref={props.ScrollViewRef} style={styles.ResponseContainer}>
        {props.bubbles.map((element, index) => (
          <ChatBubble
            key={index}
            bubble={element.content}
            role={element.role}
          />
        ))}
      </ScrollView>
    </>
  );
}
export default ResponseContainer;
