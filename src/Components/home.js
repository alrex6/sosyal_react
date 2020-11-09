import React, { Component } from 'react';
import {connect} from 'react-redux';
import {PROFILE, HOME, apiPath, SET_IS_LOGGED_IN, SET_USERNAME, SET_FOLLOWED_USERS} from '../actionTypes';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import TopNav from './topNav';
import Post from './post';
import PageContainer from './pageContainer';
import store from '../store';

class Home extends Component {
    
    
    registerInput = {
        username: ""
    }

    loginInput = {
        username: ""
    }
    constructor(props){
        super(props);
        this.state = {
            userID: 0
            
        }
        
        // this.props.allData.userData.forceUpdate = false;
        // this.props.setData(SET_USERNAME, "bas");
        
    }

   

    componentDidUpdate(){
        console.log("component did update HOME");
        
        // this.getUserProfile();
    }

    

    

    render() {
        
        
        console.log("all data render: ", this.props.allData);
        return (
                // <div>Home</div>
                <PageContainer allData = {this.props.allData} setData = {this.props.setData}>
                    
                    <Post userViewed = {store.userData.username} userViewedID = {0} page = {HOME} userViewedAndUserIsSame = {true} userData = {store.userData}></Post>
                </PageContainer>
                
            
            
        
        );
    }
}

export default Home;

