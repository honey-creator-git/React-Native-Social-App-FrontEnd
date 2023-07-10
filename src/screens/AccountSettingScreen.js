import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Image, Switch } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import BackgroundImage from '../components/BackgroundImage';
import RoundButton from '../components/RoundButton';
import LoadingOverlay from '../components/LoadingOverlay';
import Images from '../assets/Images'
import TopBar from '../components/TopBar';
import { ScrollView } from 'react-native-gesture-handler';
import { userActions } from '../../redux/actions/userActions'
import {showMessage} from "react-native-flash-message";

const AccountSettingScreen = (props) => {
  const [firstName, setFirstName] = useState(useSelector((state) => state.user["user"]['firstName']));
  const [lastName, setLastName] = useState(useSelector((state) => state.user["user"]['lastName']));
  const [email, setEmail] = useState(useSelector((state) => state.user["user"]['email']));
  const [phoneNumber, setPhoneNumber] = useState(useSelector((state) => state.user["user"]['phoneNumber']));
  const [password, setPassword] = useState('123456');
  const [pushNotification, setPushNotification] = useState(useSelector((state) => state.user["user"]['pushNotification']));
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const userToken = useSelector((state) => state.user['token'])
  const loggedIn = useSelector((state) => state.user['userLoggedIn']);
  const userId = useSelector((state) => state.user['user']['id'])
  const dispatch = useDispatch();

  const updateUserInfo = () => {
    const user = {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'phoneNumber': phoneNumber,
      'password': password,
      'pushNotification': pushNotification
    }
    if (user['firstName'] == '') {
      showMessage({
        message: "First Name can't be blank",
      });
      return;
    }
    if (user['lastName'] == '') {
      showMessage({
        message: "Last Name can't be blank",
      });
      return;
    }
    if (user['email'] == '') {
      showMessage({
        message: "Email can't be blank",
      });
      return;
    } else if (user['email'] != '') {
      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!user['email'].match(validRegex)) {
        showMessage({
          message: "Invalid Email Address.\nPlease input a valid email address."
        });
        return
      }
    }
    if (user['phoneNumber'] == '') {
      showMessage({
        message: "Phone Number can't be blank",
      });
      return;
    } else if(user['phoneNumber'] != '') {
      var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      if (!re.test(user['phoneNumber'])) {
        showMessage({
          message: "Invalid Phone Number. \nPlease input a valid phone number."
        });
        return;
      }
    }    
    if (user['password'] == '') {
      showMessage({
        message: "Password can't be blank",
      });
      return;
    } else if (user['password'] != '') {
      var len = password.length;
      if (len < 6) {
        showMessage({
          message: "Password should be at least 6 letters."
        });
        return;
      }
    }
    setLoading(true);
    dispatch(userActions.updateUserInfo(userToken, user, userId, props.navigation))
  }

  useEffect(() => {
    if (props.route.params) {
      setLoading(false);
      const result = props.route.params.result;
      setLoading(false);
      if (result == "success") {
        setTitle("Successfully Updated");
        setMessage("Your personal information has been updated successfully !");
        setShowAlert(true);
      } else if (result == "failed") {
        setTitle("Failed to Update");
        setMessage("Your personal information has been updated failed !");
        setShowAlert(true);
      }
    }
  }, [props.route.params])

  return (
    <View>
      { loggedIn == true && <TopBar
        title="Account Settings"
        isArrowBack={true}
        onBack={() => { props.navigation.goBack() }}
      /> }
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={title}
        message={message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        onDismiss={() => setShowAlert(false)}
      />
      <ScrollView>
        <View style={{backgroundColor: 'white'}}>
          {loading && <LoadingOverlay />}

          <View>
            <Text style={styles.profileInformation}>
              Personal Information
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.titleStyle}>First Name</Text>
            <Input
              containerStyle={styles.inputContainerStyle}
              placeholder={useSelector((state) => state.user["user"]['firstName'])}
              placeholderTextColor={'#A1A1A1'}
              inputStyle={{ fontFamily: 'OpenSans', fontSize: 14, paddingBottom: 0, }}
              onChangeText={(text) => {setFirstName(text)}}
            />
            <Text style={styles.titleStyle}>Last Name</Text>
            <Input
              containerStyle={styles.inputContainerStyle}
              placeholder={useSelector((state) => state.user["user"]['lastName'])}
              placeholderTextColor={'#A1A1A1'}
              inputStyle={{ fontFamily: 'OpenSans', fontSize: 14, paddingBottom: 0, }}
              onChangeText={(text) => {setLastName(text)}}
            />
            <Text style={styles.titleStyle}>Email Address</Text>
            <Input
              containerStyle={styles.inputContainerStyle}
              placeholder={useSelector((state) => state.user["user"]['email'])}
              placeholderTextColor={'#A1A1A1'}
              inputStyle={{ fontFamily: 'OpenSans', fontSize: 14, paddingBottom: 0, }}
              onChangeText={(text) => {setEmail(text)}}
            />
            <Text style={styles.titleStyle}>Phone Number</Text>
            <Input
              maxLength={10}
              keyboardType="phone-pad"
              containerStyle={styles.inputContainerStyle}
              placeholder={useSelector((state) => state.user["user"]['phoneNumber'])}
              placeholderTextColor={'#A1A1A1'}
              inputStyle={{ fontFamily: 'OpenSans', fontSize: 14, paddingBottom: 0, }}
              onChangeText={(text) => {setPhoneNumber(text)}}
            />
            <Text style={styles.titleStyle}>Password</Text>
            <Input
              secureTextEntry={true}
              containerStyle={styles.inputContainerStyle}
              placeholder='123456'
              placeholderTextColor={'#A1A1A1'}
              inputStyle={{ fontFamily: 'OpenSans', fontSize: 14, paddingBottom: 0, }}
              onChangeText={(text) => {setPassword(text)}}
            />
            
            <View>
              <Text style={styles.notification}>
                Notifications
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={styles.titleStyle}>Push Notifications</Text>
              <Switch
                trackColor={{ false: "#ffffff", true: "#C8C8C8" }}
                thumbColor={pushNotification ? "#6E9277" : "#6E9277"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setPushNotification(!pushNotification)}
                value={pushNotification}
              />
            </View>            

            <View style={styles.buttonArea}>
              <RoundButton
                title="Save Information"
                onPress={updateUserInfo}
              />
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
    fontSize: 16,
  },
  form: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20
  },
  buttonArea: {
    alignSelf: 'center',
    width: '100%',
    marginBottom: 120
  },
  inputContainerStyle: {
    width: '100%',
    marginLeft: 0,
    paddingLeft: 0,
    marginRight: 0,
    paddingRight: 0,
    marginBottom: 20
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
    fontSize: 20,
    marginTop: 15,
    fontFamily: 'OpenSans'
  },
  bold: {
    fontSize: 20,
    marginTop: 15,
    fontFamily: 'OpenSans-Bold'
  },
  signupParas: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  profileInformation: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    marginTop: 20,
    marginLeft: 20,
    color: "#000000"
  },
  notification: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    color: "#000000",
    marginBottom: 10,
  },
});

export default AccountSettingScreen;
