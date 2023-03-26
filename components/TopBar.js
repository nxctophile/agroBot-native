import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

function TopBar(props) {
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
      marginTop: 12,
      marginLeft: 12,
      backgroundColor: '#fff',
      width: 45,
      height: 45,
      borderRadius: 50,
    },
    profilePic: {
      height: '100%',
      width: '100%',
    },
    agroBotText: {
      fontSize: 20,
      marginTop: 19,
      marginLeft: 12,
      fontWeight: 'bold',
    },
    betaFlag: {
      fontSize: 10,
      marginTop: 29,
      marginLeft: 4,
    },
    deleteButton: {
      height: '100%',
      width: '100%',
    },
    deleteButtonContainer: {
      height: 40,
      width: 40,
      padding: 6,
      backgroundColor: '#eee',
      borderRadius: 50,
      position: 'absolute',
      top: 15,
      right: 15,
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
      <View style={styles.deleteButtonContainer}>
        <Pressable style={styles.buttonStyling} onPress={props.clearChat}>
          <Image
            source={{uri: 'https://i.ibb.co/YLtfm2F/delete.png'}}
            style={styles.deleteButton}
          />
        </Pressable>
      </View>
    </View>
  );
}

export default TopBar;
