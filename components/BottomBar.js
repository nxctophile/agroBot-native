import React, {useState, useRef} from 'react';
import {
  TextInput,
  StyleSheet,
  Button,
  Pressable,
  Text,
  Image,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
const microphone = require('../assets/microphone.png');
const send = require('../assets/send.png');
const waveform = require('../assets/Waveform.gif');
const stopImage = require('../assets/stop-button.png');

function BottomBar(props) {
  const styles = StyleSheet.create({
    textBox: {
      width: '100%',
      height: 47,
      borderColor: 'gray',
      borderWidth: 1,
      backgroundColor: '#CCD7D3',
      borderRadius: 30,
      color: '#000',
      fontSize: 20,
      paddingLeft: 15,
      elevation: 5,
    },
    buttonStyling: {
      backgroundColor: '#d7e3de',
      width: 40,
      height: 40,
      padding: 10,
      borderRadius: 12,
      marginLeft: 10,
      elevation: 5,
    },
    sendImage: {
      width: '100%',
      height: '100%',
    },
    bottomBarContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      backgroundColor: 'rgba(255,255,255,0)',
      paddingBottom: 16,
      borderRadius: 30,
    },
    recognitionImage: {
      height: 100,
      width: 400,
      position: 'absolute',
      left: -120,
      bottom: 10,
      backgroundColor: '#8AAF9E',
      borderRadius: 30,
    },
    stopContainer: {
      width: 170,
      backgroundColor: '#d7e3de',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
      borderRadius: 30,
    },
    stopImage: {
      width: 25,
      height: 25,
      marginLeft: 10,
    },
    animateStyle: {
      width: '80%',
    },
  });

  return (
    <View style={styles.bottomBarContainer}>
      {props.isRecognizing && (
        <Animatable.View
          animation={'slideInUp'}
          duration={400}
          easing={'ease-in-out'}
          useNativeDriver={true}>
          <View>
            <FastImage
              source={waveform}
              style={styles.recognitionImage}
              resizeMode={FastImage.resizeMode.contain}
              animated={true}
            />
          </View>
        </Animatable.View>
      )}
      {!props.isRecognizing && (
        <Animatable.View
          style={styles.animateStyle}
          animation={'slideInUp'}
          duration={400}
          easing={'ease-in-out'}
          useNativeDriver={true}>
          <TextInput
            ref={props.textRef}
            style={styles.textBox}
            value={props.text}
            placeholder={'Type a message or query...'}
            placeholderTextColor={'#a8a8a8'}
            onChangeText={props.changeButton}
            onSubmitEditing={() => props.setClient(props.text, props.textRef)}
          />
        </Animatable.View>
      )}
      {props.isRecognizing && (
        <Pressable onPress={props.stopRecording}>
          <Animatable.View
            animation={'slideInUp'}
            duration={400}
            easing={'ease-in-out'}
            useNativeDriver={true}>
            <View style={styles.stopContainer}>
              <Text style={{color: '#000'}}>Stop Recognizing</Text>
              <Image source={stopImage} style={styles.stopImage} />
            </View>
          </Animatable.View>
        </Pressable>
      )}

      {!props.isRecognizing && (
        <Animatable.View
          animation={'slideInUp'}
          duration={400}
          easing={'ease-in-out'}
          useNativeDriver={true}>
          <Pressable
            style={styles.buttonStyling}
            onPress={() => {
              if (props.canRecord) {
                return props.startRecording();
              } else {
                return props.setClient(props.text, props.textRef);
              }
            }}>
            <Image
              source={props.canRecord ? microphone : send}
              style={styles.sendImage}
            />
          </Pressable>
        </Animatable.View>
      )}
    </View>
  );
}

export default BottomBar;
