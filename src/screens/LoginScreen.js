import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';

import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, Icon } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';

import BackgroundImage from '../components/BackgroundImage';
import RoundButton from '../components/RoundButton';
import LoadingOverlay from '../components/LoadingOverlay';
import Images from '../assets/Images'
import { ScrollView } from 'react-native-gesture-handler';
import {showMessage} from "react-native-flash-message";
import {userActions} from '../../redux/actions/userActions';

const LoginScreen = (props) => {
  
  const [email, setEmail] = useState('tenochbush@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    if (props.route.params) {
      setLoading(false);
      const error = props.route.params.err;
      if (error == "invalid") {
        showMessage({
          message: "UserName or Password is incorrect."
        });
      } else if (error == "token is expired") {
        showMessage({
          message: "User Token has been expired."
        });
      }
    }
  }, [props.route.params])
  
  const onLogin = () => {
    if (email == '' || password == '') {
      showMessage({
        message: "Email or Password can't be blank",
      });
      return;
    } else {
      setLoading(true);
      dispatch(userActions.login(email, password, props.navigation));
    }
  }

  const onGoogleAuth = () => {
    setLoading(true);
    dispatch(userActions.googleAuth(props.navigation));
  }
  return (
    <View style={{ backgroundColor: 'white' }}>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="warning"
        message="Email or password can't be blank!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        onDismiss={() => setShowAlert(false)}
      />
      <View>
        {loading && <LoadingOverlay />}
        
        <ScrollView>
          <BackgroundImage backgroundImage={Images.main_bg_login} />
          <View>
            <View style={styles.formStyle}>
              <View style={{position: 'relative', top: -57}}>
                <Text style={styles.titleStyle}>Email Address</Text>
                <Input
                  defaultValue='tenochbush@gmail.com'
                  containerStyle={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                  autoCapitalize={"none"}
                  keyboardType={'email-address'}
                  placeholder='your email address'
                  placeholderTextColor={'#9CA3B7'}
                  onChangeText={(text) => {setEmail(text)}}
                  leftIcon={
                    <Icon size={22} color={'#687A61'} type="font-awesome" name="user-o" />
                  }
                  leftIconContainerStyle={styles.leftIconContainerStyle}
                  onSubmitEditing={() => {}}
                />
                <Text style={styles.titleStyle}>Password</Text>
                <Input
                  defaultValue='123456'
                  secureTextEntry={true}
                  containerStyle={styles.inputContainerStylePassword}
                  inputStyle={styles.inputStyle}
                  placeholder='your password'
                  placeholderTextColor={'#9CA3B7'}
                  onChangeText={(text) => {setPassword(text)}}
                  leftIcon={
                    <EvilIcons
                      name='lock'
                      size={40}
                      color='#687A61'
                    />
                  }
                  leftIconContainerStyle={styles.leftIconContainerStylePassword}
                  ref={ref => {}}
                />
                <TouchableOpacity 
                  onPress={() => {}}
                  style={styles.forgetPwd}
                >
                  <Text style={styles.forgetTxt}>forgot password</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{position: 'relative', top: -57}}>              
              <View style={styles.buttonArea}>
                <RoundButton
                  title="Login"
                  onPress={() => {
                    onLogin();
                  }}
                />
              </View>
            </View>
            <View style={{position: 'relative', top: -57}}>
              <View>
                  <Text style={styles.socialArea}>or login with</Text>
              </View>
            </View>
            <View style={{position: 'relative', top: -57}}>
              <View style={styles.socialIcons}>
                <TouchableOpacity 
                    style={styles.socialIcons}
                    onPress={() => {}}
                >
                  <Image
                    style={styles.socialImage}
                    source={Images.facebookIcon}
                    resizeMode='stretch'
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.socialIcons}
                    onPress={() => onGoogleAuth()}
                >
                  <Image
                    style={styles.socialImage}
                    source={Images.googleIcon}
                    resizeMode='stretch'
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.socialIcons}
                    onPress={() => {}}
                >
                  <Image
                    style={styles.socialImage}
                    source={Images.appleIcon}
                    resizeMode='stretch'
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.signupParas}>
                <Text style={styles.signupTxt}>
                  Don't Have An Account? &nbsp;            
                </Text>
                <TouchableOpacity onPress={() => {props.navigation.navigate('Register');}}>
                  <Text style={styles.bold}>
                    SIGN UP
                  </Text>
                </TouchableOpacity>    
              </View>
            </View>            
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleStyle: {
    color: '#A5593C',
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    fontWeight: 'bold'
    // marginLeft: 40
  },
  formStyle: {
    marginTop: 350,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonArea: {
    alignSelf: 'center',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20
  },
  inputContainerStyle: {
    width: '100%',
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 18,
  },
  inputContainerStylePassword: {
    width: '100%',
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 18,
    left: -5,
  },
  inputStyle: {
    marginBottom: -5,
    fontSize: 16,
    fontFamily: 'Open Sans'
  },
  forgetPwd: {
    marginTop: -10,
    marginBottom: 10,
    alignSelf: 'flex-end',
    marginRight: 5,
  },
  forgetTxt: {
    color: '#C5C5C5',
    fontSize: 16,
  },
  leftIconContainerStyle: {
    // left: -10,
    paddingRight: 0,
    marginRight: 0,
    paddingLeft: 0,
    marginLeft: 0,
  },
  leftIconContainerStylePassword: {
    paddingRight: 0,
    marginRight: 0,
    paddingLeft: 0,
    marginLeft: 0,
  },
  socialArea: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#6E6E6E'
  },
  socialImage: {
    width: 50,
    height: 50
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5
  },
  signupTxt: {
    color: '#141414',
    fontSize: 18,
    marginTop: 15,
    fontFamily: 'OpenSans'
  },
  bold: {
    fontSize: 18,
    marginTop: 15,
    fontFamily: 'OpenSans-Bold',
    color: '#141414',
  },
  signupParas: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'baseline'
  },
  scrollview: {
    paddingBottom: 50,
    marginBottom: 10,
  }
});

export default LoginScreen;
