import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import ChatBubble from './ChatBubble';
import ResponseContainer from './ResponseContainer';

function MainComponent() {
  const [bubbles, setBubbles] = useState([
    {
      isClientSide: true,
      response: 'Lol',
    },
  ]);
  const styles = StyleSheet.create({
    viewContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: '#92BB9B',
    },
  });

  const setClient = (message, textRef) => {
    textRef.current.clear();
    setBubbles(prevBubbles => [
      ...prevBubbles,
      {
        isClientSide: true,
        response: message,
      },
    ]);
  };

  return (
    <View style={styles.viewContainer}>
      <TopBar />
      <ResponseContainer bubbles={bubbles} />
      <BottomBar setClient={setClient} />
    </View>
  );
}

export default MainComponent;
