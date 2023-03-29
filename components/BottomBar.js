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

function BottomBar(props) {
  const styles = StyleSheet.create({
    textBox: {
      width: '90%',
      height: 45,
      borderColor: 'gray',
      borderWidth: 1,
      backgroundColor: '#CAD2C5',
      borderRadius: 30,
      padding: 10,
      color: '#000',
      fontSize: 20,
      paddingLeft: 15,
    },
    buttonStyling: {
      backgroundColor: '#e1e1e1',
      width: 40,
      height: 40,
      padding: 10,
      borderRadius: 12,
      marginLeft: 10,
      // shadow
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
      backgroundColor: '#6A9373',
      padding: 20,
    },
  });



  return (
    <View style={styles.bottomBarContainer}>
      <TextInput
        ref={props.textRef}
        style={styles.textBox}
        value={props.text}
        placeholder={'Type a message or query...'}
        placeholderTextColor={'#a8a8a8'}
        onChangeText={props.changeButton}
        onSubmitEditing={() => {
          return props.setClient(props.text, props.textRef);
        }}
      />
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
          source={{
            uri: props.canRecord
              ? 'https://i.ibb.co/JrHqVS8/microphone.png'
              : 'https://i.ibb.co/J5Z83YC/send.png',
          }}
          style={styles.sendImage}
        />
      </Pressable>
    </View>
  );
}

export default BottomBar;
