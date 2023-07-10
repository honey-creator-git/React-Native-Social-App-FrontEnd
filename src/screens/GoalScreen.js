import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';

import BackgroundImage from '../components/BackgroundImage';
import Images from '../assets/Images';

const GoalScreen = (props) => {

  const onSelectGoal = (id) => {
    props.navigation.navigate('Welcome');
  }

  return (

    <View style={styles.container}>
      <View style={styles.container}>
        <ScrollView style={{ width: '100%' }}>
          <View style={{ flex: 1, alignItems: 'center', width: '100%', paddingTop: 30, paddingBottom: 30 }}>
            <View style={styles.titleView}>
              <Image
                resizeMode='cover'
                style={styles.logoImage}
                source={Images.logo}
              />
              <Text style={styles.titleText}>
                What goal do you {'\n'} have in mind?
              </Text>
            </View>
            <View style={styles.scrollView}>
              <TouchableOpacity onPress={() => { onSelectGoal(0) }}>
                <Image
                  style={styles.goal}
                  source={Images.goal1}
                  resizeMode='stretch'
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { onSelectGoal(1) }}>
                <Image
                  style={styles.goal}
                  source={Images.goal2}
                  resizeMode='stretch'
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { onSelectGoal(2) }}>
                <Image
                  style={styles.goal}
                  source={Images.goal3}
                  resizeMode='stretch'
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  logoImage: {
    width: 150, height: 150
  },
  contentView: {
    alignItems: 'center',
    marginTop: '15%'
  },

  titleView: {
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: -70,
  },

  titleText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',

  },
  scrollView: {
    marginTop: '5%',
    width: '100%',
  },
  goal: {
    width: '96%', height: undefined, aspectRatio: 2.4,
    marginTop: '2%',
    marginLeft: '1.5%',
    marginRight: '2%',
  },
});

export default GoalScreen;