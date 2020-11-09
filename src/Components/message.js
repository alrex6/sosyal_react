import React, { Component } from 'react';
import {connect} from 'react-redux';
import {PROFILE, HOME, apiPath, chatApiPath, SMALL, MEDIUM, LARGE} from '../actionTypes';
import { Button, Form, FormGroup, Label, Input, FormText, Card, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";



import PageContainer from './pageContainer';

class Message extends Component {
    
    
    
    postInputs = {
        post: ""
    }

    replyMsgInputs = {
        post: "",
        msgHeaderID: 0
    }

    messageInputs = {
        username: "",
        message: ""
    }
    
    constructor(props){
        super(props);
        console.log("MESSAGE");
        this.state = {
            messageInputs: {
                username: "",
                message: ""
            },
            modal: false,
            msgHeaders: [],
            showingMsgs: false,
            messages: []
        }
        
        this.toggle = this.toggle.bind(this);
        this.processForm = this.processForm.bind(this);
        this.showMessages = this.showMessages.bind(this);
        this.replyMessage = this.replyMessage.bind(this);
        this.createNewMessage = this.createNewMessage.bind(this);
    }

    componentDidMount(){
        $.ajax({
            method: 'post',
            url: chatApiPath + 'message/getMsgHeaders',
            headers: {
                'x-access-token': this.props.allData.userData.token
            },
            // data: {
            //     inputs: JSON.stringify(this.state.messageInputs)
               
            // },
            
            success: (data) => {
               console.log(data);
              
               this.setState({msgHeaders: data.payload});
            //    this.props.updatePosts(data.data);
               
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

    processForm(){
        if(this.state.modal){
            this.createNewMessage();
        }
    }

    createNewMessage(){
        console.log("new mesage");
        $.ajax({
            method: 'post',
            url: chatApiPath + 'message/newMessage',
            headers: {
                'x-access-token': this.props.allData.userData.token
            },
            data: {
                message: this.messageInputs.message,
                username: this.messageInputs.username
            },
            
            success: (data) => {
               console.log(data);
               
            //    this.props.updatePosts(data.data);
               
            },
            error: function(err){
               console.log(err);
            }
        });   
    }

    replyMessage(){
        $.ajax({
            method: 'post',
            url: apiPath + 'message/replyMessage',
            headers: {
                'x-access-token': this.props.allData.userData.token
            },
            data: {
                inputs: JSON.stringify(this.replyMsgInputs)
               
            },
            
            success: (data) => {
               console.log(data);
               
            //    this.props.updatePosts(data.data);
               
            },
            error: function(err){
               console.log(err);
            }
        });   
    }

    showMessages(header){
        // this.state.showingMsgs = true;
        // this.addDisplay();
        this.replyMsgInputs.msgHeaderID = header.id;
        this.setState({showingMsgs: true});
        $.ajax({
            method: 'post',
            url: chatApiPath + 'message/showMessages',
            headers: {
                'x-access-token': this.props.allData.userData.token
            },
            data: {
                headerID: header.id
               
            },
            
            success: (data) => {
               console.log(data);
               this.setState({messages: data.payload});
            //    this.props.updatePosts(data.data);
               
            },
            error: function(err){
               console.log(err);
            }
        });
    }

    chooseReceiverOrSender(header){
        if(header.sendername == this.props.allData.userData.username){
            return header.receivername;
        }else{
            return header.sendername;
        }
    }

    msgsDiv(){
        if(this.props.allData.userData.windowSize != SMALL || this.state.showingMsgs){
            return <div className = {"col-md-9 px-2"} id = 'messagesDiv'>
                <Button color="primary d-md-none" onClick={() => {this.setState({showingMsgs: false})}}>Back</Button>
                <div style = {{height: '200px'}}>
                    {this.state.messages.map((msg, index) => 
                        <Card key = {index}>
                            {msg.message}
                        </Card>    
                    )}           
                </div>
                <FormGroup>
                    
                    <Input onChange = {(e) => {this.replyMsgInputs.post = e.target.value}} type="textarea"/>
                </FormGroup>
                <Button color="primary" onClick={this.replyMessage}>Reply</Button>
            </div>;
        }
        
    }

    addDisplay(div){
        // if(this.props.allData.userData.windowSize != LARGE){
        //     console.log("winow size: ", this.props.allData.userData.windowSize);
        //     $('#msgHeadersDiv').addClass('d-none');
        // }
        if(this.props.allData.userData.windowSize != SMALL){
            return;
        }

        if(div == 'msgHeaders'){
            if(this.state.showingMsgs){
                return 'invisible';
            }else{
                return '';
            }
        }else{
            if(this.state.showingMsgs){
                return '';
            }else{
                return 'invisible';
            }    
        }      
    }

    render() {
        let border = 'border-right';
        

        if(this.props.allData.userData.windowSize == SMALL){
            console.log("window size: ", this.props.allData.userData.windowSize);
            border = '';
        }
        return (
            <PageContainer  userData = {this.props.allData.userData} setData = {this.props.setData}>
                
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>New Message</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input onChange = {(e) => {this.messageInputs.username = e.target.value}} type="text"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="message">Message</Label>
                                <Input onChange = {(e) => {this.messageInputs.message = e.target.value}} type="textarea"/>
                            </FormGroup>
                            
                            
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.createNewMessage}>Do Something</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                
                <div className = "row no-gutters">
                    <div className = "col-md-12 border-bottom mb-3">
                        <Button onClick = {this.toggle}>New Message</Button> 
                    </div>
                    
                    <div className = {'col-md-3 px-1 ' + border + ' ' + this.addDisplay('msgHeaders')} id = 'msgHeadersDiv'>
                       
                        <ListGroup>
                            {this.state.msgHeaders.map((header, index) =>    
                                <ListGroupItem onClick = {() => {this.showMessages(header)}} key = {index}>{this.chooseReceiverOrSender(header)}</ListGroupItem>
                                
                                
                            )}
                            
                        </ListGroup>
                        
                    </div>

                    {/* <div className = {"col-md-9 px-2 " + this.addDisplay('msgs')} id = 'messagesDiv'>
                        <Button color="primary d-md-none" onClick={() => {this.setState({showingMsgs: false})}}>Back</Button>
                        <div style = {{height: '200px'}}>
                            {this.state.messages.map((msg, index) => 
                                <Card key = {index}>
                                    {msg.message}
                                </Card>    
                            )}           
                        </div>
                        <FormGroup>
                            
                            <Input onChange = {(e) => {this.replyMsgInputs.post = e.target.value}} type="textarea"/>
                        </FormGroup>
                        <Button color="primary" onClick={this.replyMessage}>Reply</Button>
                    </div>     */}
                    {this.msgsDiv()}
                </div>
                
            </PageContainer>
            
        
        );
    }
}


export default Message;