import React from 'react';
import {StyleSheet, View} from 'react-native';
import MainComponent from './components/MainComponent';

function App(): JSX.Element {
  const styles = StyleSheet.create({
    viewContainer: {
      width: '100%',
      height: '100%',
    },
  });
  return (
    <View style={styles.viewContainer}>
      <MainComponent />
    </View>
  );
}

export default App;
