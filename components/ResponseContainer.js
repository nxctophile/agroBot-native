import React, {useState, useRef} from 'react';
import ChatBubble from './ChatBubble';
import {StyleSheet, ScrollView, Alert, Button, View, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';

function ResponseContainer(props) {
  const styles = StyleSheet.create({
    ResponseContainer: {
      marginBottom: 64,
    },
  });
  return (
    <>
      <ScrollView ref={props.ScrollViewRef} style={styles.ResponseContainer}>
        {props.bubbles.map((element, index) => {
          const animation =
            element.role === 'assistant' ? 'fadeInLeft' : 'fadeInRight';
          return (
            <Animatable.View
              animation={animation}
              duration={300}
              easing={'ease-in-out'}
              useNativeDriver={true}
              key={index}>
              <ChatBubble bubble={element.content} role={element.role} />
            </Animatable.View>
          );
        })}
      </ScrollView>
    </>
  );
}
export default ResponseContainer;
