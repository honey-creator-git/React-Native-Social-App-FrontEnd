import React, {Component} from 'react';
import {StyleSheet, Image, Dimensions, View, SafeAreaView } from 'react-native';

const BackgroundImage = (props) => {
  
  const {
    backgroundImage, 
    isProfile = false,
    isRecipeDetail = false
  } = props;

  return (
    // <View >
      <Image
        resizeMode='cover'        
        source={backgroundImage}
        style={isProfile ? styles.profileBackground : (isRecipeDetail ? styles.recipeBackground : styles.backgroundImage)}
      />
    // </View>      
  );
}

export default BackgroundImage;

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: '100%',
  },
  profileBackground: {
    position: 'absolute',
    zIndex: 100,
    top: -15, 
    right: -40,
    height: Dimensions.get('screen').width * 0.55,
    width: Dimensions.get('screen').width * 0.45,
    aspectRatio: 1.5,
    resizeMode: 'stretch'
  },
  recipeBackground: {
    left: Dimensions.get('screen').width / -6,
    top: Dimensions.get('screen').height / -4,
    resizeMode: 'cover',
    position: 'absolute',
    height: 500,
    borderWidth: 1,
    borderRadius: 500,
    width: Dimensions.get('screen').width * 1.35,
  },
});
