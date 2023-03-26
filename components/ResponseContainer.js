import React, {useState} from 'react';
import ChatBubble from './ChatBubble';
import {StyleSheet, ScrollView} from 'react-native';

function ResponseContainer(props) {
  const styles = StyleSheet.create({
    ResponseContainer: {
      margin: 12,
      marginBottom: 85,
    },
  });
  return (
    <>
      <ScrollView style={styles.ResponseContainer}>
        {props.bubbles.map((element, index) => (
          <ChatBubble
            key={index}
            bubble={element.response}
            isClientSide={element.isClientSide}
          />
        ))}
      </ScrollView>
    </>
  );
}
export default ResponseContainer;
