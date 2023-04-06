import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
const bot = require('../assets/bot.gif');

function Dashboard() {
  const [greetingText, setGreetingText] = useState('Hey there!');

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 12) {
      setGreetingText('Good morning!');
    } else if (hour >= 12 && hour < 18) {
      setGreetingText('Good afternoon!');
    } else if (hour >= 18 && hour < 24) {
      setGreetingText('Good evening!');
    } else {
      setGreetingText('Hey there!');
    }
  }, []);
  const styles = StyleSheet.create({
    viewContainer: {
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    greetingText: {
      color: '#fff',
      fontSize: 25,
    },
    greetingTextContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: '#3F7E63',
      paddingTop: 12,
      paddingBottom: 12,
      padding: 15,
      borderRadius: 17,
      marginTop: 30,
      marginBottom: 30,
      elevation: 7,
    },
    bot: {
      height: '100%',
      width: '100%',
    },
    imageView: {
      height: 220,
      width: 290,
      borderRadius: 30,
      borderBottomLeftRadius: 0,
      overflow: 'hidden',
    },
    Tooltip: {
      fontSize: 17,
      color: '#000',
      textAlign: 'center',
    },
    TooltipContainer: {
      backgroundColor: '#a7ccb9',
      padding: 12,
      paddingTop: 15,
      paddingBottom: 15,
      borderRadius: 15,
      borderBottomRightRadius: 0,
      marginTop: 20,
    },
    TooltipContainerBox: {
      marginTop: 10,
      width: '80%',
    },
  });

  return (
    <View style={styles.viewContainer}>
      <View style={styles.greetingTextContainer}>
        <Text style={styles.greetingText}>{greetingText}</Text>
      </View>
      <View style={styles.imageView}>
        <FastImage
          source={bot}
          style={styles.bot}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View style={styles.TooltipContainerBox}>
        <View style={styles.TooltipContainer}>
          <Text style={styles.Tooltip}>
            Major limitation 😵‍💫 - (As of now) {'\n'}
            Can't generate latest data for the events that have occurred after
            2021.
          </Text>
        </View>
        <View style={styles.TooltipContainer}>
          <Text style={styles.Tooltip}>
            Get Started 👻 - {'\n'}Begin With: "Namaste!" or "Which season is
            suitable for wheat crops?"
          </Text>
        </View>
        <View style={styles.TooltipContainer}>
          <Text style={styles.Tooltip}>
            Voice recognition ✨ - {'\n'}Tap on the mic button to start!
          </Text>
        </View>
      </View>
    </View>
  );
}
export default Dashboard;
