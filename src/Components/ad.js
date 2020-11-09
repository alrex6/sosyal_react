import React, { Component } from 'react';
import {connect} from 'react-redux';
import {PROFILE, SET_PAGE, HOME, apiPath, adsApiPath} from '../actionTypes';
import { Button, Form, FormGroup, Label, Input, FormText, Card, Modal, ModalBody, ModalHeader, ModalFooter, NavLink, Nav, NavItem } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import PageContainer from './pageContainer';


class Ad extends Component {
    
    
    
   
    adInputs = {
        name: "",
        imgURL: ""
    }
    
    payAdInputs = {
        id: 0,
        amt: 0,
        kwartaUsername: 0
    }

    confirmPayInputs = {
        requestID: 0,
        code: 0
    }
    constructor(props){
        super(props);
        console.log("ADS");
        this.state = {
            ads: [],
            payingAd: false,
            confirmingPayment: false,
            siteTab: true,
            modal: false
        }
        this.createAd = this.createAd.bind(this);
        this.payAd = this.payAd.bind(this);
        this.toggle = this.toggle.bind(this);
        this.confirmPayment = this.confirmPayment.bind(this);
    }

    componentDidMount(){
        console.log("component did mount");
        this.getAds();
    }

    createAd(){
        console.log("create ad");
        $.ajax({
            method: 'post',
            // url:'http://localhost:3000/api/ad/newAd',
            url: adsApiPath + 'ad/newAd',
            headers: {
                'x-access-token': this.props.allData.userData.token
            },
            data: {
                adName: this.adInputs.name
            },
            success: (data) => {
                console.log("ad data:", data);
                
               
            },
            error: function(err){
               console.log(err);
            }
        });
    }
    
    getAds(){
        console.log("get ads");
        $.ajax({
            method: 'post',
            // url:'http://localhost:3000/api/ad/newAd',
            url: adsApiPath + 'ad/getAds',
            headers: {
                'x-access-token': this.props.allData.userData.token
            },
            data: {
                inputs: JSON.stringify(this.payAdInputs)
            },
            success: (data) => {
                console.log("ad data:", data);
                this.setState({ads: data.payload});
               
            },
            error: function(err){
               console.log(err);
            }
        });    
    }

    payAd(){
        console.log("pay ad");
        $.ajax({
            method: 'post',
            // url:'http://localhost:3000/api/ad/newAd',
            url: adsApiPath + 'ad/createPayRequest',
            headers: {
                'x-access-token': this.props.allData.userData.token
            },
            data: {
                kwartaUsername: this.payAdInputs.kwartaUsername,
                amount: this.payAdInputs.amt,
                adID: this.payAdInputs.id
            },
            success: (data) => {
                console.log("ad data:", data);
                if(data.status == 1){
                    this.confirmPayInputs.requestID = data.payload;
                    this.setState({confirmingPayment: true});
                }
               
            },
            error: function(err){
               console.log(err);
            }
        }); 
    }

    confirmPayment(){
        console.log("pay ad");
        $.ajax({
            method: 'post',
            // url:'http://localhost:3000/api/ad/newAd',
            url: adsApiPath + 'ad/confirmPayRequest',
            headers: {
                'x-access-token': this.props.allData.userData.token
            },
            data: {
                adPaymentRequestID: this.confirmPayInputs.requestID,
                code: this.confirmPayInputs.code,
                
            },
            success: (data) => {
                console.log("ad data:", data);
                if(data.status == 1){
                    this.confirmPayInputs.requestID = data.payload;
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

    adsListOrAdPaymentDiv(){
        
        if(this.state.payingAd){
            if(!this.state.confirmingPayment){
                return <div id = "ConfirmPayment">
                    <Form>
                        <FormGroup>
                            <Label for="payAdAmount">Amount</Label>
                            <Input onChange = {(e) => {this.payAdInputs.amt = e.target.value}} type="text" id = "payAdAmount"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="kwartaUsername">Kwarta username</Label>
                            <Input onChange = {(e) => {this.payAdInputs.kwartaUsername = e.target.value}} type="text" id = "kwartaUsername"/>
                        </FormGroup>
                        
                        <Button onClick = {this.payAd}>Submit</Button>
                    </Form>    
                </div>;   
            }else{
                return  <div id = "AdPayment">
                    <Form>
                        <FormGroup>
                            <Label for="payAdAmount">Code</Label>
                            <Input onChange = {(e) => {this.confirmPayInputs.code = e.target.value}} type="text"/>
                        </FormGroup>
                        
                        
                        <Button onClick = {this.confirmPayment}>Submit</Button>
                    </Form>    
                </div>;
            }
             
        }else{
            return <div id = "AdsListDiv">
                {this.adsTabsDiv()}
                {this.siteAdsDiv()}  
                {this.otherAdsDiv()}        
            </div>;
        }
          
    }

    // siteTab(){
    //     if(this.state.siteTab){
            
    //     }
    // }

    siteAdsDiv(){
        if(this.state.siteTab){
            return <div id = "SiteAdsList">
               
                {this.state.ads.map((ad, index) =>
                    // <option key = {index} value={user.username} />
                    <Card onClick = {() => {this.payAdInputs.id = ad.id; this.setState({payingAd: true})}} key = {index}>{ad.name}</Card>
                )}         
            </div>;
        }
    }

    otherAdsDiv(){
        if(!this.state.siteTab){
            return <div id = "OthersAdsList">
                
                {this.state.ads.map((ad, index) =>
                    // <option key = {index} value={user.username} />
                    <Card onClick = {() => {this.payAdInputs.id = ad.id; this.setState({payingAd: true})}} key = {index}>{ad.name}</Card>
                )}         
            </div>;
        }
    }

    adsTabsDiv(){
        return <div className = 'clearfix border-bottom mb-5'>
            <h6 onClick = {() => this.setState({siteTab: true})} className = 'float-left mx-2'>Site</h6>
            <h6 onClick = {() => this.setState({siteTab: false})} className = 'float-left mx-2'>Others</h6>
        </div>;
    }

    adsDiv(){
        return <div>
            {this.adsTabsDiv()}
            {this.adsListOrAdPaymentDiv()}
            {this.sendDiv()}
        </div>
    }

    modal(){
        return <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>New Ad</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="adName">Name</Label>
                        <Input onChange = {(e) => {this.adInputs.name = e.target.value}} type="text" name="adName" id="adName" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="adImage">Image</Label>
                        <Input onChange = {(e) => {this.adInputs.image = e.target.value}} type="password" name="password" id="adImage"/>
                    </FormGroup>
                    
                    
                </Form> 

            </ModalBody>

            <ModalFooter>
                <Button onClick = {this.createAd}>Submit</Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>;
    }

    newAdBtn(){
        return <div>
            <Button color="secondary" onClick={this.toggle}>New Ad</Button>    
        </div>;
    }

    render() {
        
        
        return (
            <PageContainer allData = {this.props.allData} setData = {this.props.setData}>
                {this.newAdBtn()}
                {/* <Form>
                    <FormGroup>
                        <Label for="adName">Name</Label>
                        <Input onChange = {(e) => {this.adInputs.name = e.target.value}} type="text" name="adName" id="adName" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="adImage">Image</Label>
                        <Input onChange = {(e) => {this.adInputs.image = e.target.value}} type="password" name="password" id="adImage"/>
                    </FormGroup>
                    
                    <Button onClick = {this.createAd}>Submit</Button>
                </Form>   */}
                 
                {this.modal()}
                {this.adsListOrAdPaymentDiv()}
                
                
            </PageContainer>
            
        
        );
    }
}



export default Ad;