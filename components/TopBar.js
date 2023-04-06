import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
const menu = require('../assets/menu.png');
const settings = require('../assets/settings.png');
import LinearGradient from 'react-native-linear-gradient';

function TopBar(props) {
  const styles = StyleSheet.create({
    viewContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
    },
    settingsButtonContainer: {
      padding: 8,
      marginTop: 18,
      marginLeft: 12,
      width: 43,
      height: 43,
    },
    settingsButton: {
      height: '100%',
      width: '100%',
    },
    agroBotText: {
      fontSize: 22,
      fontWeight: 'light',
    },
    topTextContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '72%',
      marginBottom: 4,
    },
    betaFlag: {
      fontSize: 8,
    },
    menuButton: {
      height: '100%',
      width: '100%',
    },
    menuButtonContainer: {
      height: 35,
      width: 35,
      padding: 6,
      position: 'absolute',
      top: 22,
      right: 16,
    },
  });
  return (
    <View style={styles.viewContainer}>
      <View style={styles.settingsButtonContainer}>
        <Image source={settings} style={styles.settingsButton} />
      </View>
      <View style={styles.topTextContainer}>
        <Text style={styles.agroBotText}>{'agroBot'}</Text>
        <Text style={styles.betaFlag}>{'v1.1.2-beta'}</Text>
      </View>
      <View style={styles.menuButtonContainer}>
        <Pressable style={styles.buttonStyling} onPress={props.clearChat}>
          <Image source={menu} style={styles.menuButton} />
        </Pressable>
      </View>
    </View>
  );
}

export default TopBar;
