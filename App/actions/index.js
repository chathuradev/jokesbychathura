import { AsyncStorage } from "react-native"
import { Toast } from 'native-base'
import { responsiveHeight as hp, responsiveWidth as wp, responsiveFontSize as RF } from 'react-native-responsive-dimensions'

import {
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILD,
    USER_ADD,
    USER_ADD_SUCCESS,
    USER_ADD_FAILD,
    USER_DETAILS,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAILD,
    USER_UPDATE,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILD
} from "../constants" //Import the actions types constant we defined in our actions

const URL = "https://api-theraed.herokuapp.com"
// const URL = "http://192.168.1.101:3000";

/**
 *
 * loginUser check form @param {*} userData 
 */
export function loginUser(userData, callback) {
    // console.log(JSON.stringify(userData));
    
}

/**
 *
 * signupUser check form @param {*} userData 
 */
export function signupUser(userData) {
    // console.log(JSON.stringify(userData));
    
}

/**
 * get user details by sending user id
 * @param {*} userData 
 */
export function getUser(userData) {
    
}

/**
 *
 * updateUser check form @param {*} userData 
 */
export function updateUser(userData, callback) {
    //console.log(JSON.stringify(userData));
    
}