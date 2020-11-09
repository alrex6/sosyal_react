import React, { Component } from 'react';
import {connect} from 'react-redux';
import {PROFILE, HOME, apiPath, SET_PAGE, SET_USERNAME, SET_USER_IS_LOGGED_IN} from '../actionTypes';
import { Button, Form, FormGroup, Label, Input, FormText, Table, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import SideNav from './sideNav';
import TopNav from './topNav';
import AdModal from './adModal';
import store from '../store';

class PageContainer extends Component {
    
    
    
    constructor(props){
        super(props);
        console.log("PAGE CONTAINER");
        console.log("userdata: ", this.props.userData);
        this.state = {
            loggedOut: false,
            marginBottom: 0
        }
        // this.props.userData.username = "";
        this.logout = this.logout.bind(this);
    }

    componentDidMount(){
        // let marginBottom = this.props.allData.userData.windowHeight - $('#logoAndFormDiv').height();
        // this.setState({marginBottom: marginBottom});
        this.updateDimensions();
        console.log("component did mount login");
        console.log('logoand form height: ', $('#logoAndFormDiv').height());
    }

    updateDimensions(){
        console.log("upddate dimensions page container");
    
        let documentHeight = $('#wholeDiv').height();
        
        let windowHeight = $(window).height();
        console.log("document height: ", documentHeight);
        console.log("whole div: ", $('#wholeDiv').height());
        console.log("footerDiv: ", $('#footerDiv').height());
        // console.log("wholeDiv: ", $('#wholeDiv').height());
        console.log("margin top: ", this.state.marginTop);
        console.log('window height: ', windowHeight);
        // let marginTop = 50;
        
        if(windowHeight > documentHeight){
            
            // this.setState({marginTop: windowHeight - documentHeight - 1});
            this.setState({marginBottom: windowHeight - documentHeight - 1});
        }
    }

    componentWillUnmount(){
        console.log("componenet wil unmount");
        window.removeEventListener("resize", this.updateDimensions);
    }

    logout(){
        
        localStorage.removeItem('userData');  
        
        $.ajax({
            method: 'get',
            url: apiPath + 'user/logout',
            headers: {
                'x-access-token': this.props.allData.userData.token
            },
            
            success: (data) => {
                console.log("new question data: ", data);
                
               
            },
            error: function(err){
               console.log(err);
            }
        }); 
        store.userIsLoggedIn = false;
        this.forceUpdate();
    }

    render() {
        console.log('store: ', store);
        if(!store.userIsLoggedIn){
            console.log("redirect");
            
            
            // this.props.setData(SET_PAGE, 'LOGIN');
            return <Redirect to='/login' />
        }
        
        return (
            <div id = 'wholeDiv' className = "bg-light">
                <div id = 'childrenAndNavDiv' className = "row no-gutters">
                    <TopNav logout ={this.logout} userData = {this.props.userData} setData = {this.props.setData}></TopNav>
                    <div className = "col-lg-3 d-none d-lg-block">
                        <SideNav logout ={this.logout} userData = {this.props.userData} setData = {this.props.setData}></SideNav>
                    </div>

                    <div className = "col-lg-9 px-5 mt-2" style = {{marginBottom: this.state.marginBottom}}>
                        {/* <AdModal userData = {this.props.userData}></AdModal> */}
                        {this.props.children}
                    </div>
                </div>
                
                <div className = "text-center" style = {{width: '100%'}}>
                    <h6>Blags Co.</h6>
                </div>
                
            </div>
            
        
        );
    }
}


export default PageContainer;