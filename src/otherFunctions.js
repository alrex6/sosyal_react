import store from './store';
import $ from 'jquery';
import {SET_USERNAME, SET_PAGE, LARGE, MEDIUM, SMALL, SET_WINDOW_SIZE, SET_FOLLOWED_USERS, SET_USER_IS_LOGGED_IN, apiPath, GET_USER_PROFILE } from './actionTypes';

const OtherFunctions = {
    getUserProfile: function(callback){
        $.ajax({
            method: 'post',
            url: apiPath + 'user/getUserData',
            headers: {
                'x-access-token': store.userData.token
            },
            
            
            success: (data) => {
               console.log("userprofile: ", data);
                callback(data);
                
               
            },
            error: function(err){
               console.log(err);
            }
        });   
    },
    
};

export default OtherFunctions;