import React, { Component } from 'react';
import TopNav from './topNav';
import Post from './post';
import PageContainer from './pageContainer';
import {connect} from 'react-redux';
import {PROFILE, apiPath, SET_IS_LOGGED_IN, SET_USERNAME, imgPath, SET_FOLLOWED_USERS, countriesList} from '../actionTypes';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import store from '../store';

class Profile extends Component {
    
    userViewed = "";
    userViewedID = 0;
    userViewedAndUserIsSame = true;
    userIsFollowed = false;

    changePassInputs = {
        oldPass: "",
        newPass: "",
        repeatPass: ""
    }

    changeProfileInputs = {
        name: ""
    }

    changeAPIInputs = {
        apiKey: ''
    }

    constructor(props){
        super(props);
        console.log("PROFILE");
        this.state = {
            userViewedID: this.props.allData.userData.userID,
            editingProfile: false,
            gotProfile: false,
            userExists: true,
            
            // userData: {
            //     username: this.props.allData.userData.username,
            //     name: this.props.allData.userData.name,
            //     country: this.props.allData.userData.country,
            //     imgPath: this.props.allData.userData.imgPath,
            //     userID: this.props.allData.userData.userID
            // },
            userData: {
                username: store.userData.username,
                name: store.userData.name,
                country: store.userData.country,
                imgPath: store.userData.imgPath,
                userID: store.userData.userID
            },
            editProfileInputs: {
                country: this.props.allData.userData.countryIndex,
                name: this.props.allData.userData.name
            },
            imageFile: null
            
        }

        this.follow = this.follow.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeProfile = this.changeProfile.bind(this);
        this.changeAPI = this.changeAPI.bind(this);
        this.countryOnchange = this.countryOnchange.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);

        this.userViewed = store.userData.username;
        console.log('this.props.alldata: ', this.props.allData);
        console.log("userViewed: ", store.userViewed);
        if(this.userViewed != store.userViewed && store.userViewed != ""){
            this.userViewed = store.userViewed;
            this.userViewedAndUserIsSame = false;
        }


        
    }

    follow(){
        console.log("FOLLOW");
        console.log("user viewed ID: ", this.userViewedID);
        // this.state.userViewedID = 0;
        let type = "follow";
        if(this.userIsFollowed){
            type = "unfollow";
            let followedUsers = this.props.allData.userData.followedUsers;
            followedUsers.forEach((value, index) => {
                if(value.followed == this.state.userViewedID){
                    followedUsers.splice(index, 1);

                }
                
            });
            this.userIsFollowed = false;
            this.props.setData(SET_FOLLOWED_USERS, followedUsers);

        }else{
            let followedUsers = this.props.allData.userData.followedUsers;
            followedUsers.push({followed: this.state.userViewedID, follower: this.props.allData.userData.userID});   
            console.log("followed users: ", followedUsers);
            this.props.setData(SET_FOLLOWED_USERS, followedUsers);
            this.userIsFollowed = true;
        }
        
        $.ajax({
            method: 'post',
            url: apiPath + 'user/follow/',
            headers: {
                'x-access-token': this.props.allData.userData.token
            },
            data: {
                userToFollow: this.state.userViewedID,
                type: type
               
            },
            
            success: (data) => {
               console.log("follow data: ", data);
            //    this.props.updatePosts(data.data);
               
            },
            error: function(err){
               console.log(err);
            }
        });
    }

    componentDidMount(){
        console.log("component did mount");
        
        if(!this.userViewedAndUserIsSame){
            console.log('user and viwed are same: ', this.userViewedAndUserIsSame);
            this.getProfile();     
        }else{
            this.setState({gotProfile: true, userExists: true});
        }
        
        // if(!this.userViewedAndUserIsSame){
            
        // }
        
    }

    uploadPhoto(){
        console.log('UPLOAD PHOTO');
        
        const formData = new FormData();
        formData.append('sample', 'biga');
        formData.append('avatar', this.state.imageFile);

        $.ajax({
            method: 'post',
            processData: false,
            contentType: false,
            url: apiPath + 'user/uploadProfile',
            headers: {
                'x-access-token': this.props.allData.userData.token
            },
            data: formData,  
            
            success: (data) => {
               console.log("data: ", data);
               if(data.status == 1){
                    // this.props.setIsLoggedIn(true);
                    
                    
               }else{
                   
                
               }
           
               
            },
            error: function(err){
               console.log(err);
            }
        });
    }

    onChangeFile(e){
        console.log('on change file');
        console.log(e.target.files[0]);
        this.state.imageFile = e.target.files[0];
        
       
    }

    changeProfile(){
        console.log("change profile");
        $.ajax({
            method: 'post',
            url: apiPath + 'user/changeProfile',
            headers: {
                'x-access-token': this.props.allData.userData.token
            },
            data: {
                name: this.state.editProfileInputs.name,
                country: this.state.editProfileInputs.country
            },  
            
            success: (data) => {
               console.log("data: ", data);
               if(data.status == 1){
                    // this.props.setIsLoggedIn(true);
                    
                    
               }else{
                   
                
               }
           
               
            },
            error: function(err){
               console.log(err);
            }
        });
    }

    getProfile(){
        console.log("get profile");
        console.log("api path: ", apiPath + 'user/getProfile/' + this.userViewed);
        

        $.ajax({
            method: 'post',
            url: apiPath + 'user/getProfile',
            headers: {
                'x-access-token': this.props.allData.userData.token
            },
            data: {
                username: this.userViewed
            },
            
            success: (data) => {
               console.log("userprofile: ", data);
               this.state.gotProfile = true;
               if(data.status == 1){
                    // this.props.setIsLoggedIn(true);
                    
                    this.setState({userData: {
                            username: data.data.username,
                            userID: data.data.id,
                            name: data.data.name
                        },

                        // userViewedID: data.data.id,
                        userExists: true,
                        // name: data.data.name
                    });
                    
               }else{
                    this.setState({userExists: false});  
                
               }
               
               
            },
            error: function(err){
               console.log(err);
            }
        });
    }

    changePassword(){
        console.log("change password");
        $.ajax({
            method: 'post',
            url: apiPath + 'user/changePassword',
            headers: {
                'x-access-token': this.props.allData.userData.token
            },
            data: {
                newPass: this.changePassInputs.newPass,
                oldPass: this.changePassInputs.oldPass
            },
            
            success: (data) => {
               console.log("userprofile: ", data);
               if(data.status == 1){
                    // this.props.setIsLoggedIn(true);
                    
                    
               }else{
                   
                
               }
           
               
            },
            error: function(err){
               console.log(err);
            }
        });
    }

    changeAPI(){
        console.log("change API");
        $.ajax({
            method: 'post',
            url: apiPath + 'user/createAPI',
            headers: {
                'x-access-token': this.props.allData.userData.token
            },
            data: {
                apiKey: this.changeAPIInputs.apiKey
                
            },
            
            success: (data) => {
               console.log("userprofile: ", data);
               if(data.status == 1){
                    // this.props.setIsLoggedIn(true);
                    
                    
               }else{
                   
                
               }
           
               
            },
            error: function(err){
               console.log(err);
            }
        });
    }

    editProfile(){
        console.log("edit profile");
    }

    getProfileName(){
        return this.state.userData.username;
    }

    followBtn(){
        if(!this.userViewedAndUserIsSame){
            let btnLabel = "Follow";
            console.log("followed users: ", this.props.allData.userData.followedUsers);
            this.props.allData.userData.followedUsers.forEach((value) => {
                if(value.followed == this.state.userViewedID){
                    btnLabel = "Unfollow";
                    this.userIsFollowed = true;
                }
            }); 
            return <Button className = "followOrUnfollow float-right" onClick = {this.follow}>{btnLabel}</Button>;
        }else{
            return <Button className = "float-right" onClick = {() => {this.setState({editingProfile: true})}}><small>Edit Profile</small></Button>;
        } 
    }

    renderPosts(){
        console.log('render posts');
        console.log('user exists: ', this.state.userExists);
        if(this.state.userExists){
            return <Post page = {PROFILE} userViewedAndUserIsSame = {this.userViewedAndUserIsSame} userViewed = {this.userViewed} userViewedID = {this.state.userData.userID} userData = {store.userData}></Post>        
        }
        // if(!this.userViewedAndUserIsSame){
        //     if(this.state.gotProfile){
        //         return <Post page = {PROFILE} userViewedAndUserIsSame = {this.userViewedAndUserIsSame} userViewed = {this.userViewed} userViewedID = {this.state.userViewedID} userData = {this.props.allData.userData}></Post>    
        //     }
            
        // }else{
        //     if(this.props.allData.gotProfile){
        //         console.log('whole got profile');
                
        //     }
        // }
    }

    countryOnchange(e){
        console.log('value: ', e.target.value);
        console.log('country on change');
        this.setState({editProfileInputs: {
            ...this.state.editProfileInputs,
            country: e.target.value
        }})
        
    }

    countryOption(country, index){
        return <option key = {index} value = {index}>{country}</option>
    }

    profileDiv(){
        console.log("PROFILE DIV");
        console.log('name: ', this.props.allData.userData.name);
        console.log('name: ', this.state.name);
        if(!this.state.editingProfile){
            return <div>
                <div className = 'mb-5 p-0 bg-white' style = {{width: '100%', height: 300}}>
                    <div id = "profileDiv" className = "" style = {{height: '80%', width: '100%'}}>
                        <div className = 'pt-5' style = {{height: "100px"}}>
                            <div id = 'profileImg' className = 'float-left mr-2 border' style = {{height: 120, width: 100}}>
                                <img style = {{width: '100%', height: '100%'}} src = {imgPath + 'profile/' + this.state.userData.imgPath}/>
                            </div>
                            <div>
                                <h6><small>@{this.state.userData.username}</small></h6>
                                <h6><small>{this.state.userData.name}</small></h6>
                                <h6><small>{this.state.userData.country}</small></h6>  
                                 
                            </div>
                             
                        </div>
                         
                    </div>
                    
                    <div id = "profileBtns">
                        {this.followBtn()}
                    </div>
                    
                </div>
                
                {this.renderPosts()}    
            </div>
        }else{
            return <div className = 'px-5'>
                <h5 className = 'text-right'>Edit Profile</h5> 
                <div className = 'pb-2'>
                    
                    <h6 className = 'mb-4'>Change Password</h6> 
                    <Form>
                        <FormGroup className = 'border-bottom'>
                            {/* <Label for="exampleEmail" className = 'small'>New Password</Label> */}
                            <Input className = 'form-control-sm border-0 p-0' onChange = {(e) => {this.changePassInputs.newPass = e.target.value}} type="password" name="email" placeholder = 'New password' id="exampleEmail" />
                        </FormGroup>
                        <FormGroup className = 'border-bottom'>
                            {/* <Label for="examplePassword" className = 'small'>Repeat Password</Label> */}
                            <Input className = 'form-control-sm border-0 p-0' onChange = {(e) => {this.changePassInputs.password = e.target.value}} type="password" name="email" placeholder = 'Repeat password' id="exampleEmail" />
                            {/* <Input className = 'form-control-sm border-0' onChange = {(e) => {this.changePassInputs.password = e.target.value}} type="password" placeholder = 'Repeat password' name="password" id="examplePassword" /> */}
                        </FormGroup>
                        <FormGroup className = 'border-bottom'>
                            {/* <Label for="examplePassword" className = 'small'>Repeat Password</Label> */}
                            <Input className = 'form-control-sm border-0 p-0' onChange = {(e) => {this.changePassInputs.oldPass = e.target.value}} type="password" name="email" placeholder = 'Current password' id="exampleEmail" />
                            {/* <Input className = 'form-control-sm border-0' onChange = {(e) => {this.changePassInputs.password = e.target.value}} type="password" placeholder = 'Repeat password' name="password" id="examplePassword" /> */}
                        </FormGroup>
                        {/* <FormGroup>
                            <Label for="examplePassword" className = 'small'>Password</Label>
                            <Input onChange = {(e) => {this.changePassInputs.oldPass = e.target.value}} type="password" name="password" id="examplePassword" />
                        </FormGroup> */}
                        <div className = 'clearfix'>
                            <Button className = 'btn-sm float-right px-3' onClick = {this.changePassword}>Change</Button>
                        </div>
                        
                    </Form>
                </div>
                <hr/>
                <div>
                    <h6 className = 'mb-4'>Profile</h6> 
                    <Form>
                        {/* <FormGroup>
                            <Label for="exampleEmail">Name</Label>
                            <Input onChange = {(e) => {this.changeProfileInputs.name = e.target.value}} type="text" name="email" id="exampleEmail" />
                        </FormGroup> */}
                        <FormGroup className = 'border-bottom'>
                            {/* <Label for="examplePassword" className = 'small'>Repeat Password</Label> */}
                            <Input className = 'form-control-sm border-0 p-0' onChange = {(e) => {this.setState({editProfileInputs: {...this.state.editProfileInputs, name: e.target.value}})}} value = {this.state.editProfileInputs.name} type="text" placeholder = 'Name' />
                            {/* <Input className = 'form-control-sm border-0' onChange = {(e) => {this.changePassInputs.password = e.target.value}} type="password" placeholder = 'Repeat password' name="password" id="examplePassword" /> */}
                        </FormGroup>
                        <FormGroup className = 'border-bottom'>
                            {/* <Label for="examplePassword" className = 'small'>Repeat Password</Label> */}
                            <Input className = 'form-control-sm border-0 p-0' onChange = {(e) => {this.changeProfileInputs.country = e.target.value}} type="text" name="email" placeholder = 'Country' id="exampleEmail" />
                            {/* <Input className = 'form-control-sm border-0' onChange = {(e) => {this.changePassInputs.password = e.target.value}} type="password" placeholder = 'Repeat password' name="password" id="examplePassword" /> */}
                        </FormGroup>

                        <FormGroup className = 'border-bottom'>
                            {/* <Label for="examplePassword" className = 'small'>Repeat Password</Label> */}
                            <Input className = 'form-control-sm border-0 p-0' onChange = {(e) => {this.changeProfileInputs.description = e.target.value}} type="text" name="email" placeholder = 'Description' id="exampleEmail" />
                            {/* <Input className = 'form-control-sm border-0' onChange = {(e) => {this.changePassInputs.password = e.target.value}} type="password" placeholder = 'Repeat password' name="password" id="examplePassword" /> */}
                        </FormGroup>
                        <FormGroup className = 'border-bottom'>
                            <Input value = {this.state.editProfileInputs.country} onChange = {this.countryOnchange} className = 'border-0 form-control-sm p-0' type="select" name="select" id="exampleSelect">
                                {store.countriesList.map((country, index) => 
                                    
                                    this.countryOption(country, index)     
                                )}
                            </Input>
                            {/* <select>
                                {countriesList.map((country, index) => 
                                    <option>{country}</option> 
                                )}
                            </select> */}
                        </FormGroup>
                        
                        
                        <div className = 'clearfix'>
                            <Button className = 'btn-sm float-right px-3' onClick = {this.changeProfile}>Change</Button>
                        </div>
                        
                        {/* <Button onClick = {this.changeProfile}>Change</Button> */}
                    </Form>
                    
                </div>
                <hr/>
                <div>
                    <h6 className = 'mb-4'>API</h6> 
                    <Form>
                        {/* <FormGroup>
                            <Label for="exampleEmail">API</Label>
                            <Input onChange = {(e) => {this.changeAPIInputs.apiKey = e.target.value}} type="text" name="email" id="exampleEmail" />
                        </FormGroup> */}
                        <FormGroup className = 'border-bottom'>
                            {/* <Label for="examplePassword" className = 'small'>Repeat Password</Label> */}
                            <Input className = 'form-control-sm border-0 p-0' onChange = {(e) => {this.changeAPIInputs.apiKey = e.target.value}} type="password" name="email" placeholder = 'API key' id="exampleEmail" />
                            {/* <Input className = 'form-control-sm border-0' onChange = {(e) => {this.changePassInputs.password = e.target.value}} type="password" placeholder = 'Repeat password' name="password" id="examplePassword" /> */}
                        </FormGroup>
                        <FormGroup className = 'border-bottom'>
                            {/* <Label for="examplePassword" className = 'small'>Repeat Password</Label> */}
                            <Input className = 'form-control-sm border-0 p-0' onChange = {(e) => {this.changeAPIInputs.apiKey = e.target.value}} type="password" name="email" placeholder = 'Current password' id="exampleEmail" />
                            {/* <Input className = 'form-control-sm border-0' onChange = {(e) => {this.changePassInputs.password = e.target.value}} type="password" placeholder = 'Repeat password' name="password" id="examplePassword" /> */}
                        </FormGroup>
                        <div className = 'clearfix'>
                            <Button className = 'btn-sm float-right px-3' onClick = {this.changeAPI}>Change</Button>
                        </div>
                        {/* <Button onClick = {this.changeAPI}>Change</Button> */}
                    </Form>
                    
                </div>
                <hr/>
                <div>
                    <h6 className = 'mb-4'>Upload Photo</h6> 
                    <Form>
                        {/* <FormGroup>
                            <Label for="exampleEmail">API</Label>
                            <Input onChange = {(e) => {this.changeAPIInputs.apiKey = e.target.value}} type="text" name="email" id="exampleEmail" />
                        </FormGroup> */}
                        <FormGroup className = 'border-bottom'>
                            {/* <Label for="examplePassword" className = 'small'>Repeat Password</Label> */}
                            <input type="file" name="avatar" onChange={this.onChangeFile}/>
                            {/* <Input className = 'form-control-sm border-0' onChange = {(e) => {this.changePassInputs.password = e.target.value}} type="password" placeholder = 'Repeat password' name="password" id="examplePassword" /> */}
                        </FormGroup>
                        {/* <form  enctype="multipart/form-data">
                            <input type="file" name="avatar" />
                        </form> */}
                        <div className = 'clearfix'>
                            <Button className = 'btn-sm float-right px-3' onClick = {this.uploadPhoto}>Change</Button>
                        </div>
                        {/* <Button onClick = {this.changeAPI}>Change</Button> */}
                    </Form>
                    
                </div>
                <hr/>
                <div className = 'clearfix'>
                    {/* <Button className = 'btn-sm float-right px-3' onClick = {this.changeAPI}>Change</Button> */}
                    <Button className = "btn-sm float-right px-4" onClick = {() => {this.setState({editingProfile: false})}}>Back</Button>  
                </div>
                
                
            </div> 
        }
    }
    
    render() {
        
       
        return (
            <PageContainer allData = {this.props.allData} setData = {this.props.setData}>
                {this.profileDiv()}
            
                
            </PageContainer>
            
        
        );
    }
}


export default Profile;

