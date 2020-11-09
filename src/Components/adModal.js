import React, { Component } from 'react';
import {connect} from 'react-redux';
import {PROFILE, HOME, apiPath, SET_PAGE, SET_USERNAME} from '../actionTypes';
import { Button, Form, FormGroup, Label, Input, FormText, Table, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import SideNav from './sideNav';
import TopNav from './topNav';


class AdModal extends Component {
    
    
    
    constructor(props){
        super(props);
        console.log("AD MODAL");
        this.state = {
            modal: false,
            ad: null
        }
        
    }

    componentDidMount(){
        console.log("component did mount");
        this.getAd(); 
        // this.startAdCount();  
    }

    startAdCount(){
        console.log("start ad count");  
        setTimeout(() => {
            this.setState({modal: true});
            this.adStartAjax();
            this.adTimer();
        }, 5000);    
    }

    adTimer(){
        console.log("ad timer");  
        setTimeout(() => {
            this.adEndAjax();
            this.setState({modal: false});
        }, 5000);   
    }

    adStartAjax(){
        $.ajax({
            method: 'post',
            // url:'http://localhost:3000/api/ad/newAd',
            url: apiPath + 'ad/adStart',
            headers: {
                'x-access-token': this.props.userData.token
            },
            data: {
                requestID: this.state.ad.requestID
            },
            
            success: (data) => {
                console.log("ad data:", data);
                
               
            },
            error: function(err){
               console.log(err);
            }
        });    
    }

    adEndAjax(){
        $.ajax({
            method: 'post',
            // url:'http://localhost:3000/api/ad/newAd',
            url: apiPath + 'ad/adEnd',
            headers: {
                'x-access-token': this.props.userData.token
            },
            data: {
                requestID: this.state.ad.requestID
            },
            
            success: (data) => {
                console.log("ad data:", data);
                
               
            },
            error: function(err){
               console.log(err);
            }
        });     
    }

    getAd(){
        console.log("get ad");
        $.ajax({
            method: 'post',
            // url:'http://localhost:3000/api/ad/newAd',
            url: apiPath + 'ad/playAd',
            headers: {
                'x-access-token': this.props.userData.token
            },
            
            success: (data) => {
                console.log("ad data:", data);
                this.setState({ad: data.payload});
               
            },
            error: function(err){
               console.log(err);
            }
        }); 
    }

    render() {
        
        
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                <ModalBody className = 'p-0 bd-example-modal-lg' style = {{width: '100%', height: '300px'}}>
                       
                    
                </ModalBody>
                <ModalFooter>
                   
                    
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            
        
        );
    }
}


export default AdModal;