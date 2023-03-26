import React, {useState, useEffect, useRef} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import ChatBubble from './ChatBubble';
import ResponseContainer from './ResponseContainer';
import {Configuration, OpenAIApi} from 'openai';

function MainComponent() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const ScrollViewRef = useRef(null);
  const styles = StyleSheet.create({
    viewContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: '#92BB9B',
    },
  });

  const clearChat = () => {
    Alert.alert(
      'Delete all messages',
      'Are you sure you want to continue?',
      [
        {
          text: 'Cancel',
          onPress: handleCancel,
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: handleOk,
        },
      ],
      {cancelable: false},
    );
  };
  const handleOk = () => {
    setBubbles([]);
    setShowDeleteDialog(false);
  };

  const handleCancel = () => {
    setShowDeleteDialog(false);
  };

  const setClient = async (message, textRef) => {
    if (message !== '') {
      textRef.current.clear();
      setBubbles(prevBubbles => [
        ...prevBubbles,
        {
          isClientSide: true,
          response: message,
        },
      ]);
      ScrollViewRef.current.scrollToEnd({animated: true});

      const prompt = message.toLowerCase();
      const model = 'text-davinci-003';
      const maxTokens = 200;
      const temperature = 0.2;
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

      fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt,
          model,
          max_tokens: maxTokens,
          temperature,
        }),
      })
        .then(response => response.json())
        .then(data => {
          setBubbles(prevBubbles => [
            ...prevBubbles,
            {
              isClientSide: false,
              response: data.choices[0].text.split('\n')[2],
            },
          ]);
          ScrollViewRef.current.scrollToEnd({animated: true});
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <View style={styles.viewContainer}>
      <TopBar clearChat={clearChat} />
      <ResponseContainer
        handleOk={handleOk}
        handleCancel={handleCancel}
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        ScrollViewRef={ScrollViewRef}
        bubbles={bubbles}
      />
      <BottomBar setClient={setClient} />
    </View>
  );
}

export default MainComponent;
