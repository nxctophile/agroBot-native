import React, {useState, useEffect, useRef} from 'react';
import {Alert, Button, StyleSheet, View} from 'react-native';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import ResponseContainer from './ResponseContainer';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';

import {PermissionsAndroid} from 'react-native';

function MainComponent() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const ScrollViewRef = useRef(null);
  const ImageRef = useRef(null);
  const textRef = useRef(null);
  const [text, setText] = useState('');
  const [canRecord, setCanRecord] = useState(true);

  const changeButton = txt => {
    setText(txt);
    if (txt.length <= 0) {
      setCanRecord(true);
    } else {
      setCanRecord(false);
    }
  };

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1.5);
  }, []);

  const speak = text => {
    Tts.stop();
    Tts.speak(text);
  };

  Voice.onSpeechStart = () => {
    setIsRecognizing(true);
  };

  Voice.onSpeechEnd = () => {
    setIsRecognizing(false);
  };

  Voice.onSpeechResults = result => {
    let text = result.value[0];
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    setClient(
      JSON.stringify(capitalizeFirstLetter(text)).replace(/"/g, ''),
      textRef,
    );
  };

  const startRecording = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'This app needs access to your microphone',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await Voice.start('en-US');
      } else {
        const askAgain = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message:
              'App needs access to your microphone to record audio. Please grant permission.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'Grant Permission',
          },
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // const stopRecording = async () => {
  //   try {
  //     await Voice.stop();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

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

  const setClient = async (message, textBox) => {
    setCanRecord(true);
    if (message !== '') {
      textBox.current.clear();
      setBubbles(prevBubbles => [
        ...prevBubbles,
        {
          isClientSide: true,
          response: message,
        },
      ]);
      ScrollViewRef.current.scrollToEnd({animated: true});

      const prompt = message.toLowerCase();
      const model = 'gpt-3.5-turbo';
      const maxTokens = 200;
      const temperature = 0.7;
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          model,
          max_tokens: maxTokens,
          temperature,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Data is: ', data);
          setBubbles(prevBubbles => [
            ...prevBubbles,
            {
              isClientSide: false,
              response: data.choices[0].message.content,
            },
          ]);
          speak(data.choices[0].message.content);

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
      <BottomBar
        setClient={setClient}
        startRecording={startRecording}
        textRef={textRef}
        changeButton={changeButton}
        text={text}
        setText={setText}
        canRecord={canRecord}
      />
    </View>
  );
}

export default MainComponent;
