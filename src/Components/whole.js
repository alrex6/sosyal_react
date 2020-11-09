import React, { Component } from 'react';
import {connect} from 'react-redux';
import {SET_USERNAME, SET_PAGE, LARGE, MEDIUM, SMALL, SET_WINDOW_SIZE, SET_FOLLOWED_USERS, SET_USER_IS_LOGGED_IN, apiPath, GET_USER_PROFILE } from '../actionTypes';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TopNav from './topNav';
import Home from './home';
import Profile from './profile';
import Login from './login';
import Message from './message';
import Ad from './ad';

import store from '../store';

class Whole extends Component {
    
    
    
    constructor(props){
        super(props);
        console.log("WHOLE");
        this.state = {
            userData: {
                username: "",
                userID: 0,
                page: "HOME",
                userViewed: "",
                token: "",
                windowSize: this.getWindowSize(),
                followedUsers: [],
                updated: false,
                userIsLoggedIn: true,
                name: "",
                gotProfile: false,
                country: '',
                countryIndex: 0,
                fileExt: ''
            },
            userViewed: {
                username: ''
            },
            gotProfile: false,
            gotToken: false,
            userIsLoggedIn: true,
            searchData: {
                userSearched: ""
            },
            key: 0
        }

        store.windowSize = this.getWindowSize();

        this.setData = this.setData.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);

        this.HomePage = this.HomePage.bind(this);
        this.ProfilePage = this.ProfilePage.bind(this);
        this.LoginPage = this.LoginPage.bind(this);
        this.MessagePage = this.MessagePage.bind(this);
        this.AdPage = this.AdPage.bind(this);

        this.getUserData();
        
        
    }

    componentDidUpdate(){
        console.log('COMPONENT DID UPDATE WHOLE');
    }

    getProfile(){
        console.log("get profile");
       

        $.ajax({
            method: 'post',
            url: apiPath + 'user/getUserData',
            headers: {
                'x-access-token': this.state.userData.token
            },
            
            
            success: (data) => {
               console.log("userprofile: ", data);
                if(data.status == 1){
                    this.state.userData.username = data.data.username;
                    this.state.userData.country = data.data.country;
                    this.state.userData.name = data.data.name;
                    this.state.userData.countryIndex = data.data.countryIndex;
                    this.state.userData.imgPath = data.data.imgPath;
                    this.state.userData.userID = data.data.userID;
                    store.userData = data.data;
                    // this.state.userData.username = data.data.username;
                    // // this.state.userData.id = data.data.id;
                    // this.state.userData.userID = data.data.id;
                   
                    // this.props.allData.userData.userViewed = "";
               }else{
                    // this.setState({userIsLoggedIn: false});   
                    this.state.userIsLoggedIn = false;   
                    store.userIsLoggedIn = false;
               }
               this.setState({gotProfile: true});
               
            },
            error: function(err){
               console.log(err);
            }
        });
    }

    componentDidMount(){
        console.log('COMPONENT DID MOUNT WHOLE');
        if(this.state.gotToken && !this.state.gotProfile){
            this.getProfile();   
        }
        // if(this.state.userIsLoggedIn){
        //     this.getProfile();
        // }
    }

    setData(action, payload){
        console.log("user data: ", this.state);
        if(action == SET_PAGE){
            console.log(SET_PAGE);
            this.setState({userData: {
                ...this.state.userData,
                page: payload
            }});
        }else if(action == SET_USERNAME){
            console.log(SET_USERNAME);
            console.log("payload: ", payload);
            console.log("user data: ", this.state.userData);
            this.setState({userData: {
                ...this.state.userData,
                username: payload
            }});    
        }else if(action == SET_WINDOW_SIZE){
            console.log(SET_WINDOW_SIZE);
            this.setState({userData: {
                ...this.state.userData,
                windowSize: payload
            }});
            console.log("this.state: ", this.state);
        }else if(action == SET_FOLLOWED_USERS){
            console.log(SET_FOLLOWED_USERS);
            this.setState({userData: {
                ...this.state.userData,
                followedUsers: payload
            }});
            console.log("followed users:", this.state.userData.followedUsers);
            console.log("this.state: ", this.state);
        }else if(action == GET_USER_PROFILE){
            console.log(GET_USER_PROFILE);
            this.getProfile();
        }else if(action == SET_USER_IS_LOGGED_IN){
            console.log(GET_USER_PROFILE);
            this.setState({
                userIsLoggedIn: payload
            })
        }
    }

    getWindowSize(){
        let width = $(window).width();
        let size = LARGE;
        if(width >= 992){
            size = LARGE;
            
        }else if(width >= 768 && width < 992){
            size = MEDIUM;
        }else{
            size = SMALL;
        }

        return size;
    }

    updateDimensions(){
        
        let SIZE = this.getWindowSize();
        // if(this.state.userData.windowSize != SIZE){
        //     this.setData(SET_WINDOW_SIZE, SIZE);
        //     // this.forceUpdate();
        // }
        if(store.windowSize != SIZE){
            this.setData(SET_WINDOW_SIZE, SIZE);
            store.windowSize = SIZE;
            this.forceUpdate();
            // this.forceUpdate();
        }
        
    }

    getUserData(){
        let userData = JSON.parse(localStorage.getItem('userData')); 
        console.log("userData: ", userData);
        if(userData != null){
            
            this.state.userData.token = userData.token;
            store.userData.token = userData.token;
            // this.getProfile();
            
        }else{
            this.state.userIsLoggedIn = false;
            this.state.gotProfile = true;
            store.userIsLoggedIn = false;
        }
        this.state.gotToken = true;
        window.addEventListener("resize", this.updateDimensions); 
          
    }

    HomePage(props){
        
        return <Home allData = {this.state} setData = {this.setData}></Home>;
    }

    MessagePage(props){
        
        return <Message allData = {this.state} setData = {this.setData}></Message>;
    }

    AdPage(props){
        
        return <Ad allData = {this.state} setData = {this.setData}></Ad>;
    }

    ProfilePage(props){
        console.log("match: ", props.match.params.username);
        var currentPage = "profile";
        var key = this.state.key;
        

        store.userViewed = store.userData.username;
        if(props.match.params.username != undefined){
            currentPage = currentPage + '/' + props.match.params.username;
            console.log("router params: ", props.match.params);
            store.userViewed = props.match.params.username;
        }   
        
        if(currentPage != this.state.page){
            this.state.page = currentPage;
            this.state.key ++; 
            key ++;   
        }

        return <Profile key = {key} allData = {this.state} setData = {this.setData}></Profile>;    
    }

    LoginPage(){
        
        
        return <Login allData = {this.state} setData = {this.setData}></Login>;
    }

    render() {
        console.log('state.gotprofile: ', this.state.gotProfile);
        if(!this.state.gotProfile){
            return null;
        }
        return (
            
            <Router>
                <div>
                    <Route exact path="/" component={this.HomePage} />
                    <Route exact path="/home" component={this.HomePage} />
                    <Route exact path="/profile" component={this.ProfilePage} />
                    <Route path="/profile/:username" component={this.ProfilePage} />
                    <Route exact path="/message" component={this.MessagePage} />
                    <Route exact path="/ad" component={this.AdPage} />
                    <Route exact path="/login" component={this.LoginPage} />
                </div>
            </Router>
        
        );
    }
}



export default Whole;