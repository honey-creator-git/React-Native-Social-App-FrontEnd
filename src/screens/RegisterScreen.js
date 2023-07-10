import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { Input } from 'react-native-elements';
import {showMessage} from "react-native-flash-message";
import BackgroundImage from '../components/BackgroundImage';
import RoundButton from '../components/RoundButton';
import LoadingOverlay from '../components/LoadingOverlay';
import Images from '../assets/Images'
import { ScrollView } from 'react-native-gesture-handler';
import {userActions} from '../../redux/actions/userActions';

const SignupScreen = (props) => {

  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    if (props.route.params) {
      setLoading(false)
      const error = props.route.params.err;
      if (error) {
        showMessage({
          message: "Email has already been taken."
        });
      }
    }
  }, [props.route.params])
  
  const onRegister = () => {
    if (firstName == '') {
      showMessage({
        message: "First Name can't be blank",
      });
      return;
    }
    if (lastName == '') {
      showMessage({
        message: "Last Name can't be blank",
      });
      return;
    }
    if (email == '') {
      showMessage({
        message: "Email can't be blank",
      });
      return;
    } else if (email !== '') {
      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (email.match(validRegex)) { 
      } else {
        showMessage({
          message: "Invalid Email Address.\nPlease input a valid email address."
        });
        return;
      }
    }
    if (phoneNumber == '') {
      showMessage({
        message: "Phone Number can't be blank",
      });
      return;
    } else if (phoneNumber !== '') {
      var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      if (re.test(phoneNumber)) {
      } else {
        showMessage({
          message: "Invalid Phone Number. \nPlease input a valid phone number."
        });
        return;
      }
    }
    if (password == '') {
      showMessage({
        message: "Password can't be blank",
      });
      return;
    } else if (password !== '') {
      var len = password.length;
      if (len < 6) {
        showMessage({
          message: "Password should be at least 6 letters."
        });
        return;
      }
    }
    setLoading(true)
    dispatch(userActions.register(firstName, lastName, email, password, phoneNumber, props.navigation));
    setLoading(false)
  }

  const onGoogleAuth = () => {
    setLoading(true);
    dispatch(userActions.googleAuth(props.navigation));
    setLoading(false)     
  }

  return (
    <View style={{backgroundColor: 'white', paddingBottom: '2%'}}>
        {loading && <LoadingOverlay />}
        <ScrollView>
          <BackgroundImage backgroundImage={Images.main_bg_signup} />
          <View style={styles.scrollview}>
            <View style={{position: 'relative', top: 35}}>
              <View style={styles.form}>
                <Text style={styles.titleStyle}>First Name</Text>
                <Input
                  containerStyle={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                  placeholder='your first name'
                  placeholderTextColor={'#9CA3B7'}
                  leftIconContainerStyle={styles.leftIconContainerStyle}
                  onChangeText={(text) => {setFirstName(text)}}
                />
                <Text style={styles.titleStyle}>Last Name</Text>
                <Input
                  containerStyle={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                  placeholder='your last name'
                  placeholderTextColor={'#9CA3B7'}
                  leftIconContainerStyle={styles.leftIconContainerStyle}
                  onChangeText={(text) => {setLastName(text)}}
                />
                <Text style={styles.titleStyle}>Email Address</Text>
                <Input
                  containerStyle={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                  placeholder='your email address'
                  placeholderTextColor={'#9CA3B7'}
                  leftIconContainerStyle={styles.leftIconContainerStyle}
                  onChangeText={(text) => {setEmail(text)}}
                />
                <Text style={styles.titleStyle}>Phone Number</Text>
                <Input
                  keyboardType="phone-pad"
                  inputStyle={styles.inputStyle}
                  containerStyle={styles.inputContainerStyle}
                  placeholder='your phone number'
                  placeholderTextColor={'#9CA3B7'}
                  maxLength={10}
                  leftIconContainerStyle={styles.leftIconContainerStyle}
                  onChangeText={(text) => {setPhoneNumber(text)}}
                />
                <Text style={styles.titleStyle}>Password</Text>
                <Input
                  secureTextEntry={true}
                  inputStyle={styles.inputStyle}
                  containerStyle={styles.inputContainerStyle}
                  placeholder='your password'
                  placeholderTextColor={'#9CA3B7'}
                  leftIconContainerStyle={styles.leftIconContainerStyle}
                  onChangeText={(text) => {setPassword(text)}}
                />
              </View>
            </View>
            <View style={{position: 'relative', top: 35}}>
              <View style={styles.buttonArea}>
                <RoundButton
                  title="Create Account"
                  onPress={() => {
                    onRegister();
                  }}
                />
              </View>
            </View>
            <View style={{position: 'relative', top: 35}}>
              <View>
                <Text style={styles.socialArea}>or sign up with</Text>
              </View>
            </View>
            <View style={{position: 'relative', top: 35}}>
              <View style={styles.socialIcons}>
                <TouchableOpacity
                  style={styles.socialIcons}
                  onPress={() => { }}
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
                  onPress={() => { }}
                >
                  <Image
                    style={styles.socialImage}
                    source={Images.appleIcon}
                    resizeMode='stretch'
                  />
                </TouchableOpacity>
              </View>
            </View>      
            <View style={{position: 'relative', top: 35}}>
              <View style={styles.signupParas}>
                <Text style={styles.signupTxt}>
                  Already Have An Account? &nbsp;
                </Text>
                <TouchableOpacity onPress={() => { props.navigation.navigate('Login') }}>
                  <Text style={styles.bold}>
                    LOGIN
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    color: '#A5593C',
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 40
  },
  form: {
    marginTop: 210,
  },
  buttonArea: {
    marginTop: -20,
    alignSelf: 'center',
    width: '90%',
  },
  inputContainerStyle: {
    width: '90%',
    marginLeft: '7%',
    marginBottom: 19
  },
  forgetPwd: {
    alignSelf: 'flex-end',
    marginRight: 35,
  },
  forgetTxt: {
    color: '#9CA3B7'
  },
  leftIconContainerStyle: {
    // left: -10
  },
  inputStyle: {
    marginBottom: -5,
    color: '#9CA3B7',
    fontSize: 14,
    fontFamily: 'Open Sans'
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
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',
    color: '#141414',
  },
  signupParas: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'baseline'
  },
  scrollview: {
    marginTop: 0,
    paddingBottom: 20,
  }
});

export default SignupScreen;
