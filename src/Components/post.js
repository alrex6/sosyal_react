import React, { Component } from 'react';
import {connect} from 'react-redux';
import {UPDATE_POSTS, MOST_RECENT, LAST_REPLIED, TAGS, USER, PROFILE, HOME, POST_LIMIT, apiPath} from '../actionTypes';
import { Button, Form, FormGroup, Label, Input, FormText,Nav, NavItem, NavLink } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Blog from './blog';

class Post extends Component {
    POST_LIMIT = 2;
    GET_POST_TYPES = {
        changeTab: 1,
        changeStartPoint: 2,
        initialize: 3,
        addStartPoint: 4
    }
    postInputs = {
        post: ""
    }

    replyInputs = {
        post: "",
        replyID: 0
    }

    // posts = [];
    
    constructor(props){
        super(props);
        console.log("POSTS");
        console.log("user and viewed is same: ", this.props.userViewedAndUserIsSame);
        console.log("username", this.props.userViewed);
        this.state = {
            posts: [],
            repliesShown: false,
            replyID: 0,
            tab: TAGS,
            startPoint: 0,
            sortBy: MOST_RECENT
            
        }
        this.submitPost = this.submitPost.bind(this);
        this.showReplies = this.showReplies.bind(this);
        this.replyPost = this.replyPost.bind(this);
        this.onChangeTab = this.onChangeTab.bind(this);
        this.addStartPoint = this.addStartPoint.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.editPost = this.editPost.bind(this);
        this.clickSample = this.clickSample.bind(this);
    }

    clickSample(){
        console.log("click sample");
    }

    componentDidMount(){
        console.log('component mount');
        // this.props.updatePosts([]);
        this.getPosts();
        
    }

    submitPost(){
        console.log("submit post");
        // console.log(this.props.username);
        $.ajax({
            method: 'post',
            url: apiPath + 'blog/createBlog',
            headers: {
                'x-access-token': this.props.userData.token
            },
            data: {
                post: this.postInputs.post,
                creator: this.props.username
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

    showReplies(post){
        console.log('show replies', post);
        // this.state.repliesShown = true;
        console.log("posts: ", this.state.posts);
        this.setState({repliesShown: true});
        this.replyInputs.replyID = post.id;

        $.ajax({
            method: 'post',
            url: apiPath + 'blog/showReplies',
            headers: {
                'x-access-token': this.props.userData.token
            },
            data: {
                
                
                replyID: post.id,
                sortBy: this.state.sortBy
            },
            
            success: (data) => {
                console.log("replies: ", data);
                if(data.status == 1){
                    if(data.data.length > 0){
                        let postsClone = this.state.posts;
                        let index = postsClone.indexOf(post);
                        let lastValue = null;
                        data.data.forEach((value) => {
                            // postsClone.splice(index + 1, 0, value);
                            this.addAddtlData(value);
                            this.state.posts.splice(index + 1, 0, value);    
                            lastValue = value;
                        });
                        
                        index = this.state.posts.indexOf(lastValue);
                        this.state.posts.forEach((value, ndx) => {
                            if(ndx > index){
                                value.render = false;
                            }
                        })
                        this.setState({posts: postsClone});

                        console.log("postsclone: ", postsClone);
                    }
                    
                }
                
                // this.setState({posts: postsClone});
            //    this.props.updatePosts(data.data);
               
            },
            error: function(err){
               console.log(err);
            }
        });  
    }

    addAddtlData(post){
        post.render = true;
    }

    getPosts(getPostType = this.GET_POST_TYPES.initialize){
        
        
        let url =  apiPath + 'blog/getHomeBlogs';
        if(this.props.page == PROFILE){
            url =  apiPath + 'blog/getProfileBlogs';
        }
        
        $.ajax({
            method: 'post',
            url: url,
            headers: {
                'x-access-token': this.props.userData.token
            },
            data: {
                tab: this.state.tab,
                sortBy: this.state.sortBy,
                startPoint: this.state.startPoint,
                // userViewed: this.props.userViewed,
                userViewedID: this.props.userViewedID
            },
            
            success: (data) => {
                console.log("getposts data:", data);
                if(data.status == 1){
                    data.payload.forEach((value) => {
                        this.addAddtlData(value);
                        console.log("value: ", value.post);
                        
                    });
                    
                    if(getPostType == this.GET_POST_TYPES.addStartPoint){
                        this.addPosts(data.payload);
                    }else{
                        console.log("get posts payload:", data.payload);
                        // this.setState({posts: data.payload});
                        this.setState({posts: data.payload});
                        console.log("posts: ", this.state.posts);
                    }
                }
                
                
            //    this.props.updatePosts(data.data);
               
            },
            error: function(err){
               console.log(err);
            }
        });   
    }

    addPosts(addtlPosts){
        
        addtlPosts.forEach((value) => {
            this.state.posts.push(value);
        });
        
        this.setState({posts: this.state.posts});
    }

    replyPost(){
        console.log('reply post');
        $.ajax({
            method: 'post',
            url: apiPath + 'blog/replyBlog',
            headers: {
                'x-access-token': this.props.userData.token
            },
            data: {
                post: this.replyInputs.post,
                
                replyID: this.replyInputs.replyID
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

    deletePost(blogID){
        console.log("delete post");
        console.log("blog id: ", blogID);
        $.ajax({
            method: 'post',
            url: apiPath + 'blog/deleteBlog',
            headers: {
                'x-access-token': this.props.userData.token
            },
            data: {
                
                
                blogID: blogID
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

    editPost(blogID, post){
        console.log("edit post");
        $.ajax({
            method: 'post',
            url: apiPath + 'blog/editBlog',
            headers: {
                'x-access-token': this.props.userData.token
            },
            data: {
                
                post: post,
                blogID: blogID
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

    onChangeTab(tabName){
        console.log("tab: ", tabName);
        this.state.tab = tabName;
        this.state.startPoint = 0;
        this.setState({posts: []});
        // this.state.posts = [];
        // this.setState({tab: tabName, posts: []});
        this.getPosts();
        // this.state.tab = tabName;
    }

    addStartPoint(){
        console.log("add start pt");
        console.log(this.state.startPoint);
        this.state.startPoint = this.state.startPoint + this.POST_LIMIT;
        
        
        if(this.replyInputs.replyID == 0){
            this.getPosts(this.GET_POST_TYPES.addStartPoint);
        }
    }

    render() {
        
        let replyDiv = null;
        if(this.state.repliesShown && this.props.userViewedAndUserIsSame){
            replyDiv = <div className = "mb-1">
                <FormGroup>
                    <Label for="exampleText">Text Area</Label>
                    <Input onChange = {(e) => {this.replyInputs.post = e.target.value}} type="textarea" name="text" id="exampleText" />
                </FormGroup>
                <div id = "replyBtns" className = "clearfix">
                    <Button className = "float-right" onClick = {this.replyPost}>Post</Button>
                </div>
                
            </div>;
        }

        return (
            <div className = '' style = {{width: "100%"}}>
                <div className = 'createPostArea mb-5 p-2 clearfix bg-success'>
                    <FormGroup>
                        
                        <Input rows = '3' onChange = {(e) => {this.postInputs.post = e.target.value}} type="textarea" name="text" id="exampleText" />
                    </FormGroup>
                    <div className= "float-right">
                        <Button className = 'px-5' onClick = {this.submitPost}><small>Submit</small></Button>
                    </div>
                </div>
                <Nav className = 'border-bottom'>
                    <NavItem>
                        <NavLink className = 'h6' onClick = {() => this.onChangeTab(TAGS)} href="#">Tags</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className = 'h6' onClick = {() => this.onChangeTab(USER)} href="#">User</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className = 'h6' href="#">Another Link</NavLink>
                    </NavItem>
                    
                </Nav>
                <div style = {{minHeight: 200}}>
                    {this.state.posts.map((post, index) => <Blog deletePost = {this.deletePost} editPost = {this.editPost} showReplies = {this.showReplies} post = {post} key = {index}></Blog> )}
                </div>
                <div className = 'navDiv mb-5 mt-3 clearfix'>
                    <div className = "col-sm-2 col-5 float-right p-0">
                        <Input className = "float-left col-4 small" onChange = {(e) => {this.setState({startPoint: e.target.value})}} type="text" name="text" id="exampleText" value = {this.state.startPoint} />  
                        <Button className = "float-left col-8" onClick = {this.addStartPoint}><small>Next</small></Button>
                    </div>
                    
                </div>
                {/* {this.state.postsArray.map((post, index) => <Post DeleteBlog = {this.DeleteBlog} navObj = {this.navObj} ShowReplies = {this.ShowReplies} postsProps = {post} key = {post.key}></Post> )}                     */}
                {replyDiv}                 
            </div>
            
        
        );
    }
}

export default Post;

