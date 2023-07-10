import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Dropdown from '../components/DropDown.js'

import BackgroundImage from '../components/BackgroundImage';
import RoundButton from '../components/RoundButton';
import Images from '../assets/Images';
import { foundations } from '../../redux/constants/configConstants';

const FirstScreen = (props) => {
  
  const [foundation, setFoundation] = useState(foundations[0].value);
  
  const countries = ["Egypt", "Canada", "Australia", "Ireland"]

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, [])  
  
  return (
    <View style={styles.container}>
      <View style={styles.container}>        
        <StatusBar translucent backgroundColor="transparent" />
        <View style={{ flex: 1, alignItems: 'center', width: '100%', paddingHorizontal: 20, paddingTop: 40 }}>
          <View style={styles.titleView}>
            <Image
              resizeMode='cover'
              style={styles.logoImage}
              source={Images.logo}
            />
            <Text style={styles.titleText}>
              Choose your {'\n'} Foundation
            </Text>
          </View>
          <View>
            <Text style={styles.descriptionText}>
              Support your favorite Non-Profit today. A
              percentage of all of your in-app purchases
              will go to the foundation of your choice.
            </Text>
          </View>
          <View style={{width: '100%', marginTop: 50}}>
            {/* <Dropdown
              dropdownPosition='bottom'
              style={styles.dropdown}
              containerStyle={styles.dropdownContainerStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={foundations}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={foundation}
              onChange={item => {
                setFoundation(item.value);
              }}
            />*/}            
            <Dropdown label={'Select Item'} data={foundations} onSelect={setFoundation} />
          </View>
        </View>

        <View style={styles.buttonArea}>
          <RoundButton
            title="Next"
            onPress={() => {
              props.navigation.navigate('Login');
            }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8985d',
    height: '100%',
    width: '100%',
    alignItems: 'center'
  },
  contentView: {
    alignItems: 'center',
  },

  titleView: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    // marginLeft: '-37%',
    position: 'relative',
    right: 50,
  },

  titleText: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontWeight: 'bold',
    marginLeft: '3%'
  },

  logoImage: {
    width: 140, height: 140
  },

  descriptionText: {
    marginTop: 20,
    fontSize: 18,
    lineHeight: 25,
    color: 'white',
    fontFamily: 'OpenSans',
    textAlign: 'center'
  },

  buttonArea: {
    justifyContent: "center",
    width: '100%',
    paddingHorizontal: 30,
    // bottom: Dimensions.get('window').height / 10
    bottom: 83
  },

  dropdown: {
    height: 50,
    borderRadius: 20,
    width: '100%',
    backgroundColor: '#ffffff',
  },

  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 20
  },

  dropdownContainerStyle: {
    borderRadius: 20,
  }
});

export default FirstScreen;
