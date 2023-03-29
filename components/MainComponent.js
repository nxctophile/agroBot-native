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
    Tts.stop();
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

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
    setIsRecognizing(false);
  };

  const styles = StyleSheet.create({
    viewContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: '#8AAF9E',
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

  const setClient = (message, textBox) => {
    setCanRecord(true);
    if (message !== '') {
      textBox.current.clear();
      setBubbles(prevBubbles => [
        ...prevBubbles,
        {
          role: 'user',
          content: message,
        },
      ]);
      ScrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  useEffect(() => {
    if (bubbles.length > 0 && bubbles.length % 2 !== 0) {
      const model = 'gpt-3.5-turbo';
      const maxTokens = 500;
      const temperature = 0.7;
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

      console.log('Bubbles are: ', bubbles);

      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          messages: bubbles,
          model,
          max_tokens: maxTokens,
          temperature: 0.7,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Data is: ', data);
          setBubbles(prevBubbles => [
            ...prevBubbles,
            {
              role: 'assistant',
              content: data.choices[0].message.content,
            },
          ]);
          speak(data.choices[0].message.content);

          ScrollViewRef.current.scrollToEnd({animated: true});
        })
        .catch(error => console.log(error));
    }
  }, [bubbles]);

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
        isRecognizing={isRecognizing}
        stopRecording={stopRecording}
      />
    </View>
  );
}

export default MainComponent;
