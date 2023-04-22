import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const menu = require('../assets/menu.png');
const settings = require('../assets/settings.png');
const agroBot = require('../assets/agroBot.png');
import LinearGradient from 'react-native-linear-gradient';

function TopBar(props) {
  const styles = StyleSheet.create({
    viewContainer: {
      width: '100%',
      height: 80,
      display: 'flex',
      flexDirection: 'row',
    },
    agroBotStyling: {
      height: '120%',
      width: '122%',
      marginLeft: '-26%',
      marginTop: '-5%',
    },
    topTextContainer: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    betaFlag: {
      fontSize: 8,
    },
    settingsButton: {
      position: 'absolute',
      left: 115,
      top: 45,
      width: 30,
      height: 30,
    },
    menuButton: {
      position: 'absolute',
      right: 15,
      top: 48,
      width: 25,
      height: 25,
    },
  });
  return (
    <View style={styles.viewContainer}>
      <View style={styles.topTextContainer}>
        {/*<Text style={styles.agroBotText}>{'agroBot'}</Text>*/}
        {/*<Text style={styles.betaFlag}>{'v1.1.2-beta'}</Text>*/}
        <ImageBackground style={styles.agroBotStyling} source={agroBot}>
          <Image source={settings} style={styles.settingsButton} />
          <Pressable style={styles.buttonStyling} onPress={props.clearChat}>
            <Image source={menu} style={styles.menuButton} />
          </Pressable>
        </ImageBackground>
      </View>
    </View>
  );
}

export default TopBar;
