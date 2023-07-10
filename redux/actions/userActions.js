import axios from "axios";
import {AsyncStorage} from 'react-native';

import {userConstants} from '../constants';

import store from '../store';
import { ENDPOINT, GOOGLE_WEB_CLIENTID, GOOGLE_ANDROID_CLIENTID } from 'react-native-dotenv';
import authHead from "../helpers/authHead";
import Snackbar from 'react-native-snackbar';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

export const userActions = {
    login,
    register,
    logout,
    loginSocial,
    googleAuth,
    updateUserInfo,
    getAllUsers,
};

function login(username, password, navigation) {
    return dispatch => {
        axios.post(ENDPOINT + '/user/signin', {'Email': username, 'Password': password})
        .then((result)=>{
            const { data } = result
            if(data["status"] == true) {
                const userData = data["payload"]["data"];
                const userToken = data["payload"]["token"];
                dispatch({ type: userConstants.SET_USER, userData: userData, userToken: userToken});
                navigation.navigate('HearAboutUs');
            } else if(data["status"] == false){
                navigation.navigate('Login', {err: "invalid"});
            }
        }).catch(err=>{
            console.log("Error => ", err);
            navigation.navigate('Login', {err: "invalid"})
        });
    };
}

function register(firstName, lastName, email, password, phoneNumber, navigation) {
    return dispatch => {
        axios.post(
            ENDPOINT + '/user/create',
            {
                'FirstName': firstName,
                'LastName': lastName,
                'Email': email,   
                'Password': password,
                'PhoneNumber': phoneNumber
            }
        ).then((result) => {
            const { data } = result
            if(data["status"] == true) {
                const userData = data["payload"]["data"];
                const userToken = data["payload"]["token"];
                dispatch({ type: userConstants.SET_USER, userData: userData, userToken: userToken });
                navigation.navigate('HearAboutUs');
            } else if(data["status"] == false) {
                navigation.navigate('Register', {err: "invalid"});
            }
        }).catch(err => {
            console.log("Error => ", err);
            navigation.navigate('Register', {err: 'invalid'});
        });
    };
}

function loginSocial(user) {
    return dispatch => {
        dispatch({ type: userConstants.SOCIAL_LOGIN_SUCCESS, user });
    };
}

function updateUserInfo(userToken, user, userId, navigation) {
    return dispatch => {
        axios.put(ENDPOINT + `/user/${userId}`,
        user,
        {
            headers: {
                'Authorization': `Bearer ${userToken}`
            },
        }).then((result) => {
            const {data} = result
            if(data["status"] == true) {
                const userData = data["payload"];
                dispatch({ type: userConstants.UPDATE_USER, userData: userData});
                navigation.navigate('AccountSettings', {result: 'success'})
            } else if (data['status'] == false) {
                navigation.navigate('AccountSettings', {result: 'failed'})
            }
        }).catch(err => {
            console.log("Error => ", err);

            navigation.navigate('AccountSettings', {result: 'failed'})
        })
    }
}

function logout(navigation) {
    return dispatch => {
        // AsyncStorage.removeItem('user')
        navigation.navigate("First");
        dispatch({ type: userConstants.LOGOUT });
    };
}

function googleAuth(navigation) {
    GoogleSignin.configure({
        offlineAccess: true,
        webClientId: GOOGLE_WEB_CLIENTID,
        androidClientId: GOOGLE_ANDROID_CLIENTID
    });
    return async (dispatch) => {
        try {
            await GoogleSignin.hasPlayServices();
            GoogleSignin.signIn().then((userInfo) => {
                axios.post(ENDPOINT + '/user/social/google_auth', {
                    'Email': userInfo['user']['email'],
                    'FirstName': userInfo['user']['givenName'],
                    'LastName': userInfo['user']['familyName'],
                    'Avatar': userInfo['user']['photo'],
                    'SocialType': 'Google',
                    'SocialId': userInfo['user']['id'],
                })
                .then((result)=>{
                    const { data } = result
                    if(data["status"] == true) {
                        const userData = data["payload"]["data"];
                        const userToken = data["payload"]["token"];
                        dispatch({ type: userConstants.SET_USER, userData: userData, userToken: userToken});
                        navigation.navigate('HearAboutUs');
                    } else if(data["status"] == false){
                        navigation.navigate('Login', {err: "invalid"});
                    }
                }).catch(err=>{
                    console.log("Error => ", err);
                    navigation.navigate('Login', {err: "invalid"})
                });
            })            
        } catch (error) {
            console.log(error)
            navigation.navigate('Login', {err: "invalid"})
        }
    }
}

function getAllUsers(userToken, navigation) {
    return dispatch => {
        axios.get(ENDPOINT + '/admin/users?results=1000&page=1&sortField=email&sortOrder=ascend', {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then((result) => {
            const { data } = result
            if(data["status"] == true) {
                const allUsers = JSON.stringify(data["payload"])
                
                dispatch({
                    type: userConstants.GET_ALL_USERS,
                    allUsers: allUsers,
                })
            } else if(data["status"] == "Error Occurred in parsing user token.") {
                dispatch({type: userConstants.LOGOUT});
                navigation.navigate('Login', {err: "token is expired"});
            }
        }).catch((err) => {
            console.log("Error => ", err);
        })
    }
}