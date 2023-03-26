import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

function TopBar() {
  const styles = StyleSheet.create({
    viewContainer: {
      width: '100%',
      height: 68.9,
      backgroundColor: '#6A9373',
      display: 'flex',
      flexDirection: 'row',
    },
    profilePicContainer: {
      padding: 8,
      marginTop: 10,
      marginLeft: 10,
      backgroundColor: '#fff',
      width: 50,
      height: 50,
      borderRadius: 50,
    },
    profilePic: {
      height: '100%',
      width: '100%',
    },
    agroBotText: {
      fontSize: 20,
      marginTop: 18,
      marginLeft: 12,
    },
    betaFlag: {
      fontSize: 10,
      marginTop: 28,
      marginLeft: 5,
    },
  });
  return (
    <View style={styles.viewContainer}>
      <View style={styles.profilePicContainer}>
        <Image
          source={{uri: 'https://i.ibb.co/LnLNDPt/sprout.png'}}
          style={styles.profilePic}
        />
      </View>
      <Text style={styles.agroBotText}>{'agroBot'}</Text>
      <Text style={styles.betaFlag}>{'beta'}</Text>
    </View>
  );
}

export default TopBar;
