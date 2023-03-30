import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <FastImage
        source={require('./assets/splash_logo.gif')}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8AAF9E',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 200,
    elevation: 7,
  },
});

export default SplashScreen;
