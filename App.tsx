import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import MainComponent from './components/MainComponent';
import SplashScreen from './SplashScreen';
import * as Animatable from 'react-native-animatable';

function App(): JSX.Element {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowSplash(false), 1200);
  }, []);

  return (
    <Animatable.View
      animation={'fadeIn'}
      duration={250}
      easing={'ease-in-out'}
      useNativeDriver={true}
      style={styles.viewContainer}>
      {showSplash ? <SplashScreen /> : <MainComponent />}
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
});

export default App;
