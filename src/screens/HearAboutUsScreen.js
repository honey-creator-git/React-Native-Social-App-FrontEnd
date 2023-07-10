import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions } from 'react-native';
// import { RadioButton } from 'react-native-paper';
import { Input } from 'react-native-elements';

import BackgroundImage from '../components/BackgroundImage';
import RoundButton from '../components/RoundButton';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Images from '../assets/Images';
import { toolkitActions } from '../../redux/actions/toolkitActions.js';

const HearAboutUsScreen = (props) => {

  const [checked, setChecked] = useState(0);
  const [others, setOthers] = useState(false);
  const selections = [{label: 'Instagram', value: 0}, {label: 'Influencer', value: 1}, {label: 'Foundation', value: 2}, {label: 'Friends', value: 3}, {label: 'Family', value: 4}, {label: 'Others', value: 5}];
  const userToken = useSelector((state) => state.user["token"]);  
  const dispatch = useDispatch();

  const handleReadioForm = ({value}) => {
    setChecked(value);
    if(value == 5) {
      setOthers(true);
    } else {
      setOthers(false);
    }
  }

  useEffect(() => {
    dispatch(toolkitActions.getAllToolkitTypes(userToken, props.navigation));
    dispatch(toolkitActions.getTodayActivityToolkitPost(userToken, props.navigation))
    dispatch(toolkitActions.getWeeklyToolkitPosts(userToken, props.navigation))
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', width: '100%', paddingHorizontal: 30, paddingTop: 50 }}>
          <View style={styles.titleView}>
            <Image
              resizeMode='cover'
              style={styles.logoImage}
              source={Images.logo}
            />
            <Text style={styles.titleText}>
              Where did you {'\n'} hear about us?
            </Text>
          </View>
          <View style={styles.radioGroup}>
            <RadioForm
              >
                {
                  selections.map((obj, i) => (
                    <RadioButton key={i} >
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={checked === i}
                        onPress={(value) => {handleReadioForm({value:value})}}
                        borderWidth={1}
                        buttonOuterColor={'#ffffff'}
                        buttonInnerColor={checked === i ? '#82C568' : '#000'}
                        buttonSize={10}
                        buttonOuterSize={16}
                        buttonStyle={{}}
                        buttonWrapStyle={{
                          marginLeft: 10,
                          marginRight: 10,
                          marginBottom: 10,
                          backgroundColor: '#ffffff',
                          borderTopEndRadius: 10,
                          borderBottomEndRadius: 10,
                          borderTopStartRadius: 10,
                          borderBottomStartRadius: 10
                        }}
                      />
                      <RadioButtonLabel
                        obj={obj}
                        index={i}
                        labelHorizontal={true}
                        onPress={(obj) => {handleReadioForm({value:obj.value})}}
                        labelStyle={{fontSize: 16, color: '#ffffff', position: 'relative', bottom: 5}}
                        labelWrapStyle={{}}
                      />
                    </RadioButton>
                  ))
                }
            </RadioForm>
            {others ?
              <Input
                placeholder='type here...'
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                placeholderTextColor='#ffffff'
              /> :
              <View style={{ height: 50 }}></View>
            }
          </View>
          <View style={styles.buttonArea}>
            <RoundButton
              title="Next"
              onPress={() => {
                props.navigation.navigate('Goal')
              }}
            />
          </View>
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
  },
  titleView: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: 'center',
    marginLeft: '-30%'
  },

  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
  },

  logoImage: {
    width: 150, height: 150,
  },

  radioGroup: {
    marginTop: 50,
    width: '70%'
  },

  radioPattern: {
    flexDirection: 'row',
  },

  radioCaption: {
    marginLeft: 5,
    marginTop: 4,
    color: 'white',
    fontFamily: 'OpenSans',
    fontSize: 16,
  },

  inputStyle: {
    color: '#ffffff',
    fontSize: 13,
    left: 15,
  },

  inputContainerStyle: {
    marginLeft: 20,
    width: '100%',
    borderBottomColor: '#ffffff',
    bottom: 10,
    paddingBottom: -20,
    height: 30
  },

  buttonArea: {
    marginTop: 40,
    alignSelf: 'center',
    width: '100%',
    bottom: 20
  },
});

export default HearAboutUsScreen;
