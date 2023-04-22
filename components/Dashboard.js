import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
const bot = require('../assets/bot.gif');
const news = require('../assets/news.png');

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
    },
    greetingText: {
      color: '#fff',
      fontSize: 25,
    },
    greetingTextContainer: {
      paddingTop: 12,
      paddingBottom: 12,
      padding: 15,
      borderRadius: 17,
      marginTop: 22,
      marginLeft: 16,
      marginBottom: 12,
    },
    bot: {
      height: '100%',
      width: '100%',
    },
    imageView: {
      height: 200,
      width: 200,
      position: 'absolute',
      top: -15,
      right: -30,
    },
    Tooltip: {
      fontSize: 17,
      color: '#b9c4c9',
      textAlign: 'center',
    },
    TooltipContainer: {
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#75A658',
      padding: 12,
      paddingTop: 15,
      paddingBottom: 15,
      borderRadius: 25,
      borderBottomLeftRadius: 0,
      marginTop: 20,
    },
    TooltipContainerBox: {
      marginTop: 30,
      width: '80%',
    },
    TipContainer: {
      // marginLeft: 20,
      display: 'flex',
      width: '100%',
      alignItems: 'center',
    },
    greetBubbleContainer: {
      alignSelf: 'flex-start',
      marginLeft: 24,
    },
    greetBubble: {
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#75A658',
      fontSize: 14,
      padding: 10,
      borderRadius: 20,
      borderBottomRightRadius: 0,
    },
    headlineText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    headlineTextContainer: {
      marginTop: 30,
      marginLeft: 30,
    },
    newsContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: -20,
    },
    newsFeed: {
      height: 100,
      width: 170,
      backgroundColor: '#333',
      marginLeft: 20,
      borderRadius: 10,
      overflow: 'hidden',
    },
    newsRow: {
      flexDirection: 'row',
      padding: 20,
    },
    newsImg: {
      height: '100%',
      width: '100%',
    },
  });

  return (
    <View style={styles.viewContainer}>
      <View style={styles.greetingTextContainer}>
        <Text style={styles.greetingText}>{greetingText}</Text>
      </View>
      <View style={styles.greetBubbleContainer}>
        <Text style={styles.greetBubble}>Hi there, how can I help you?</Text>
      </View>
      <View style={styles.imageView}>
        <FastImage
          source={bot}
          style={styles.bot}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View>
        <View style={styles.headlineTextContainer}>
          <Text style={styles.headlineText}>Top Headlines</Text>
        </View>
        <View style={styles.newsContainer}>
          <View style={styles.newsRow}>
            <View style={styles.newsFeed}>
              <Image style={styles.newsImg} source={news} />
            </View>
            <View style={styles.newsFeed}>
              <Image style={styles.newsImg} source={news} />
            </View>
          </View>
          <View style={styles.newsRow}>
            <View style={styles.newsFeed}>
              <Image style={styles.newsImg} source={news} />
            </View>
            <View style={styles.newsFeed}>
              <Image style={styles.newsImg} source={news} />
            </View>
          </View>
          <View style={styles.newsRow}>
            <View style={styles.newsFeed}>
              <Image style={styles.newsImg} source={news} />
            </View>
            <View style={styles.newsFeed}>
              <Image style={styles.newsImg} source={news} />
            </View>
          </View>
          <View style={styles.newsRow}>
            <View style={styles.newsFeed}>
              <Image style={styles.newsImg} source={news} />
            </View>
            <View style={styles.newsFeed}>
              <Image style={styles.newsImg} source={news} />
            </View>
          </View>
          <View style={styles.newsRow}>
            <View style={styles.newsFeed}>
              <Image style={styles.newsImg} source={news} />
            </View>
            <View style={styles.newsFeed}>
              <Image style={styles.newsImg} source={news} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
export default Dashboard;
