import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Home from './home';
import { withRouter } from 'react-router-dom';
import { apiPath, SET_PAGE, GET_USER_PROFILE, SET_FOLLOWED_USERS, SET_USER_IS_LOGGED_IN } from '../actionTypes';

import store from '../store';
import OtherFunctions from '../otherFunctions';

class Login extends Component {
    
    
    registerInput = {
        username: "",
        password: ""
    }

    loginInput = {
        username: "",
        password: ""
    }

    forgetPassInputs = {
        username: "",
        email: ""
    }
    constructor(props){
        super(props);
        console.log("LOGIN");
        console.log("userData", this.props.userData);
        this.userInput = this.props.userData;
        // this.userInput.username = "bangog";
        
        this.state = {
            // userData: this.props.userData,
            username: this.loginInput.username,
            password: this.loginInput.password,
            modal: false,
            forgotPassword: false,
            forgotPassText: "",
            register: false,
            loggedIn: false,
            userData: {}
        }

        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.toggle = this.toggle.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    register(){
        console.log("register");
       

        $.ajax({
            method: 'post',
            url: apiPath + 'user/register',
            
            data: {
                username: this.registerInput.username,
                password: this.registerInput.password
            },
            success: (data) => {
                console.log(data);
                
                if(data.status == 1){
                    this.setState({register: false});
                }
               
            },
            error: function(err){
               console.log(err);
            }
        });
        // this.props.setUsername()
    }

    getFollowedUsers(){
        console.log("get followed users");
        $.ajax({
            method: 'post',
            url: apiPath + 'user/getUserFolloweds',
            headers: {
                'x-access-token': this.props.allData.userData.token
            },
            
            
            success: (data) => {
                console.log("followed users data ", data);
                
                if(data.status == 1){
                    
                    this.props.setData(SET_FOLLOWED_USERS, data.payload);
                }
                
                
               
            },
            error: function(err){
               console.log(err);
            }
        });
    }

    login(){
        console.log("login");
        
        $.ajax({
            method: 'post',
            url: apiPath + 'user/login',
            
            data: {
                
                username: this.loginInput.username,
                password: this.loginInput.password
            },
            success: (data) => {
                console.log("login data:", data);
                console.log(data.payload.username);
                if(data.status == 1){
                    
                    this.props.allData.userData.token = data.payload;
                    store.userData.token = data.payload;
                    localStorage.setItem('userData', JSON.stringify({token: data.payload}));
                    // this.props.setData(GET_USER_PROFILE, '');
                    OtherFunctions.getUserProfile((data) => {
                        if(data.status == 1){
                            store.userIsLoggedIn = true;
                            this.forceUpdate();
                        }
                    })
                    // this.props.allData.userIsLoggedIn = true;
                    // this.props.setData(SET_USER_IS_LOGGED_IN, true);
                    
                }
               
            },
            error: function(err){
               console.log(err);
            }
        });
    }
    
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    changePassword(){
        console.log("change password");
        $.ajax({
            method: 'post',
            url: apiPath + 'user/forgotPassword',
            
            data: {
                // userData: JSON.stringify(this.loginInput),
                email: this.forgetPassInputs.email,
                username: this.forgetPassInputs.username
            },
            success: (data) => {
                console.log("data:", data);
                if(data.status == 1){
                    this.setState({forgotPassText: "Your new password has been sent to your email address."})
                }
                
               
            },
            error: function(err){
               console.log(err);
            }
        });
    }

    modal(){
        return <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Forgot Password</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="username">username</Label>
                        <Input onChange = {(e) => {this.forgetPassInputs.username =  e.target.value}} type="text"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="message">email</Label>
                        <Input onChange = {(e) => {this.forgetPassInputs.email = e.target.value}} type="text"/>
                    </FormGroup>
                    
                    <p>{this.state.forgotPassText}</p>
                </Form>

            </ModalBody>

            <ModalFooter>
                <Button color="primary" onClick={this.changePassword}>Change</Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>;
    }

    formDiv(){
        if(!this.state.register){
            return <Form>
                <FormGroup>
                    <Label for="exampleEmail">Username</Label>
                    <Input onChange = {(e) => {this.loginInput.username = e.target.value}} type="text" name="email" id="exampleEmail" />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input onChange = {(e) => {this.loginInput.password = e.target.value}} type="password" name="password" id="examplePassword" />
                </FormGroup>
                
                <Button className = 'btn-block' onClick = {this.login}>Login</Button>
                <a href = 'Javascript:void(0)' onClick = {() => {this.setState({register: true})}}>Register</a>
                <a href = 'Javascript:void(0)' onClick = {() => {this.setState({forgotPassword: true}); this.toggle()}}>Forgot Password?</a>
            </Form>;
        }else{
            return <Form>
                <FormGroup>
                    <Label for="exampleEmail">Username</Label>
                    <Input onChange = {(e) => {this.registerInput.username = e.target.value}} type="text" name="email" id="exampleEmail" />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input onChange = {(e) => {this.registerInput.password = e.target.value}} type="password" name="password" id="examplePassword" />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Repeat Password</Label>
                    <Input onChange = {(e) => {this.registerInput.password = e.target.value}} type="password" name="password" id="examplePassword" />
                </FormGroup>
                
                
                <Button className = 'btn-block' onClick = {this.register}>Register</Button>
                <a href = 'Javascript:void(0)' onClick = {() => {this.setState({register: false})}}>Login</a>
            </Form>;
        }
    }

    form(){
        return <div className = 'col-lg-4 float-right' style = {{marginTop: 50}}>
             
            {this.formDiv()}
        </div>;
                     
    }

    logoDiv(){
        return <div className = 'col-lg-8 text-center float-left' style = {{marginTop: 100}}>

            <h1>Blags</h1>
        </div>;
    }

    footerDiv(){
        return <div className = 'position-absolute text-center border-top' style = {{height: 30, bottom: 0, width: '100%'}}>

            Blags Co. 
        </div>;    
    }

    wholeDiv(){
        return <div>
            <div className = 'clearfix'>
                {this.logoDiv()}
                {this.form()}
            </div>
            
            {this.footerDiv()}
        </div>;
    }

    render() {
        console.log('RENDER');
        console.log('all data: ', this.props.allData);
        if(store.userIsLoggedIn){
            return <Redirect to='/home' />;  
        }

        return (
            <div>
                
                {/* <Link to="/home">home</Link> */}
                {this.modal()}
                {this.wholeDiv()}
            </div>
            
        
        );
    }
}




export default Login;