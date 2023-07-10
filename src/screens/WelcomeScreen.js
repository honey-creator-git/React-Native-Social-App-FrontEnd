import React, {Component, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, StyleSheet, Image, Modal, Dimensions, SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';

import BackgroundImage from '../components/BackgroundImage';
import Images from '../assets/Images';
import RoundButton from '../components/RoundButton';
import { toolkitActions } from '../../redux/actions/toolkitActions.js';

const WelcomeScreen = (props) => {
  
  const [showModal, setShowModal] = useState(false);
  const toolkitTypes = useSelector((state) => state.toolkit['toolkitTypes']);
  const toolkitPosts = useSelector((state) => state.toolkit['toolkitPost'])
  const nutritionToolkitPosts = useSelector((state) => state.toolkit['nutritionToolkitPost'])
  const healthyToolkitPost = useSelector((state) => state.toolkit['healthyToolkitPost'])
  const recipeToolkitPost = useSelector((state) => state.toolkit['recipeToolkitPost'])
  const movementToolkitPost = useSelector((state) => state.toolkit['movementToolkitPost'])
  const meditationToolkitPost = useSelector((state) => state.toolkit['meditationToolkitPost'])
  const userToken = useSelector((state) => state.user["token"]);  
  const dispatch = useDispatch();

  useEffect(() => {
    const toolkitTypes = [1, 2, 3, 4, 5, 6, 7];
    toolkitTypes.forEach((item, index) => {
      dispatch(toolkitActions.getToolkitPostsWithType(userToken, item, props.navigation))
    });
    setTimeout(() => {
        setShowModal(true)
    }, 500);
  }, [])

  const navigateToNext = (props) => {
    if(
      !!toolkitTypes && !!toolkitPosts && !!nutritionToolkitPosts && !!healthyToolkitPost && !!recipeToolkitPost && !!movementToolkitPost && !!meditationToolkitPost
    ) {
        props.navigation.navigate('Root', {stackname: 'Home'})
    } else {
      const toolkitTypes = [1, 2, 3, 4, 5, 6, 7];
      toolkitTypes.forEach((item, index) => {
        dispatch(toolkitActions.getToolkitPostsWithType(userToken, item, props.navigation))
      });
      dispatch(toolkitActions.getAllToolkitTypes(userToken, props.navigation));
      dispatch(toolkitActions.getTodayActivityToolkitPost(userToken, props.navigation));
      dispatch(toolkitActions.getWeeklyToolkitPosts(userToken, props.navigation));
      props.navigation.navigate('Root', {stackname: 'Home'});
    }
  }
  
  return (
    <View style={{ height: '100%', position: 'relative' }}>
      <BackgroundImage backgroundImage={Images.welcome} />
      {/* <StatusBar hidden={false} /> */}
      {/* <Modal
        statusBarTranslucent
        transparent
        visible={showModal}
        onRequestClose={() => {setShowModal(false)}}
      > */}
      { showModal && 
        <View style={styles.modal}>
            <View style={styles.centeredView}>
              <View style={styles.warningModal}>
                  <View style={styles.centerView}>
                      <Image 
                          source={Images.logo} 
                          style={styles.logo}
                      />
                  </View>
                  <View style={styles.centerView}>
                      <Text style={styles.welcome}>
                          We're so excited to get started with you, but please check with your doctor before engaging with any types of exercise
                      </Text>
                  </View>
                  <View style={styles.dlgButton}>
                      <RoundButton
                          title="Okay"
                          onPress={() => {
                              setShowModal(false)
                          }}
                      />
                  </View>
              </View>
            </View>
        </View>
      }
      {/* </Modal> */}
      <View style={styles.buttonArea}>
        {/* <RoundButton
            title="Get Started"
            color='brown'
            onPress={() => {
                props.navigation.navigate('Root', {stackname: 'Home'});
            }}
        /> */}
        <TouchableOpacity onPress={() => navigateToNext(props)}>
          <View style={[styles.buttonContainer, styles.brown]}>
              <Text style={[styles.buttonText, styles.whiteText]}>Get Started</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  modal: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },
  container: {
    flex: 1,
  },

  contentView: {
    alignItems: 'center',
    marginTop: 80
  },

  titleView: {
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 10
  },

  titleText: {
    fontSize: 30,
    color:'white',
    fontFamily: 'OpenSans-Bold',
    marginLeft: 80,
  },

  goal: {
    width: 450,
    height: 170,
    margin: 10
  },

  warningModal: {
    width: Dimensions.get('screen').width * 0.9,
    height: 480,
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },

  centeredView: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#00000099',
    height: '100%',
    width: '100%',
    paddingLeft: 20,
    paddingTop: 110,
  },

  centerView: {
    marginTop: 30,
    alignItems: 'center'
  },

  logo: {
    width: 140,
    height: 140,
  },

  buttonArea: {
    position: 'absolute',
    left: 30,
    width: '35%',
    // top: Dimensions.get('window').height - 150
    bottom: 0
  },

  welcome: {
    width: '85%',
    textAlign: 'center',
    color: '#B2B2B2',
    fontFamily: 'OpenSans',
    fontSize: 17,
    lineHeight: 25,
  },

  dlgButton: {
    width: '38%',
    alignSelf: 'center',
    marginTop: 0
  },

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 50,
    marginVertical: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  brown: {
    backgroundColor: '#682911'
  },

  whiteText: {
    color: 'white',
    fontFamily: 'OpenSans'
  },

  buttonText: {
    fontFamily: 'OpenSans',
    fontSize: 20,
  },
});

export default WelcomeScreen;