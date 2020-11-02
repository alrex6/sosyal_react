import React, {createContext, useReducer, useState} from 'react';
import AppReducer from './AppReducer';
import InitialState from './InitialState';
import axios from 'axios';

const initialState = InitialState;




export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    
    
    function login(username){
        console.log('login');
        dispatch({
            type: 'DELETE',
            payload: username
        });
    }

    async function apiCall(url, data){
        console.log('api call');
        console.log('url: ', url);
        console.log('token: ', state.userData.token);
        let response = await axios({
            method: 'post',
            url: url,
            data: data,
            headers: {
                'x-access-token': state.userData.token
            }    
        })
        console.log('response: ', response);
        return response.data;
    }

    async function getUserData(){
        console.log('get user data');
        console.log('api path: ', state.globals.varNames.apiPath);
        // console.log('token: ', state.userData.token);
        var response = await apiCall(state.globals.varNames.apiPath + 'user/getUserData', {});  
       
        console.log('response: ', response);
        if(response.status == 1){
            initiateUserData(response.data.userData);
            setVariables(response.data);
            state.userData.loggedIn = true;
            state.userData.currentPage.back = 'profile';
            // forceUpdate();
            dispatch({
                type: 'UPDATE_USER_DATA',
                payload: 'username'
            });
        }
        // return response;
    }

    async function newMsg(receiver, message){
        console.log('get user data');
        console.log('api path: ', state.globals.varNames.apiPath);
        // console.log('token: ', state.userData.token);
        let data = {
            username: receiver,
            message: message
        }

        apiCall(state.globals.varNames.apiPath + 'message/newMessage', data);  
        
        
        // return response;
    }

    async function getMsgs(headerID, startPoint){
        console.log('get user data');
        console.log('api path: ', state.globals.varNames.apiPath);
        // console.log('token: ', state.userData.token);
        let data = {
            headerID: headerID,
            startPoint: startPoint
        }

        var response = await apiCall(state.globals.varNames.apiPath + 'message/showMessages', data);  
        state.messageData.msgs = response.payload;
        state.userData.viewingMsgs = true;
        forceUpdate();
        // return response.payload;
        // return response;
    }

    function forceUpdate(){
        dispatch({
            type: 'UPDATE_USER_DATA',
            payload: 'username'
        });   
    }

    function initiateUserData(userData){
        console.log('initiate user data');
        state.userData.username = userData.username;
        state.userData.userID = userData.userID;
        state.userData.country = userData.country;
        state.userData.name = userData.name;
        state.userData.followedUsers = userData.followedUsers;
        state.userData.dataBal = userData.dataBal;
        state.userData.totalAddtlData = userData.totalAddtlData;
        state.userData.expenses = userData.expenses;
        state.userData.balance = userData.balance;
        state.userData.passwordSet = userData.passwordSet;
        state.userData.companyIDs = userData.companyIDs;
        state.userData.photoPassword = userData.photoPassword;
        state.userData.companies = userData.companies;
        state.userData.pendingDeductions = userData.pendingDeductions;
        state.userData.pendingDataDeductions = userData.pendingDataDeductions;
        
        
    }

    function changePage(page){
        console.log('initiate user data');
        state.userData.currentPage.back = page;
        
        dispatch({
            type: 'UPDATE_USER_DATA',
            payload: 'username'
        });
        
    }

    function setVariables(payload){
        state.countries = payload.countries;
        // state.globals.varNames.chatApiPath = payload.paths.chat; 
        state.globals.varNames.imgPath = payload.paths.img;  
        // state.globals.varNames.apiPath = payload.paths.own;  
        state.globals.numOfPosts = payload.globals.numOfPosts;
        state.globals.numOfItems = payload.globals.numOfItems;
        state.globals.numOfSearches = payload.globals.numOfSearches;
        // state.globals.varNames.serchApiPath = payload.paths.serch;  
        // state.globals.varNames.ad = payload.paths.chat;   
    }

    function logout(){
        state.userData.loggedIn = false;
        localStorage.removeItem('userData'); 
        state.userData.currentPage.front = 'login';    
        forceUpdate();  
    }

    return (<GlobalContext.Provider value = {{
        userData: state.userData,
        globals: state.globals,
        messageData: state.messageData,
        login,
        apiCall,
        getUserData,
        changePage,
        forceUpdate,
        newMsg,
        getMsgs,
        logout
        
    }}>
        {children}
    </GlobalContext.Provider>)
}