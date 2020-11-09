import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import TopNav from './topNav';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, NavItem, NavLink } from 'reactstrap';





class Blog extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            post: this.props.post,
            editing: false,
            editPost: this.props.post.post
        }

        
        this.editPost = this.editPost.bind(this);
        this.postAnchor = this.postAnchor.bind(this);
        this.clickSample = this.clickSample.bind(this);
    }

    editPost(){
        this.props.post.post = this.state.editPost; 
        this.setState({post: this.props.post, editing: false});
        this.props.editPost(this.props.post.id, this.state.editPost);
        
    }

    componentDidMount(){
        // console.log("component did mount");
        // let as = $('.tagsAnch');
        // as.click(function(e){
        //     console.log("hoy");
        //     this.clickSample();
        // });
        // console.log("as", as);
        // // as.forEach((value) => {
        // //     console.log("value: ", value.innerHTML);
        // // })
        // console.log("a's: ", as[0].innerHTML);

    }

    postAnchor() {
        let post = this.props.post.post;
        // post = '@bangog <div>a</div>hou say ka @baoys';
        let parts = post.split(/@([a-z0-9]+)/gi);
        
        for (var i = 1; i < parts.length; i += 2) {
            console.log("parts: ", parts);
            parts[i] = <Link to = {'/profile/' + parts[i]} className="match" key={i}>@{parts[i]}</Link>;
        }
        // post = post.replace(/@([a-z0-9]+)/gi, "<a class = 'border-bottom tagsAnch'>@$1</a>");
        // post = ReactHtmlParser(post);
        // console.log("new post", post);
        // console.log("type: ", post[0].type);
        
        // console.log("post anchor");
        return parts;
        // return {__html: post};
        // return {__html: 'hi'};
    }

    render() {
        if(!this.props.post.render){
            return null;
        }
        
        
        
        let cardBody = <CardBody className = 'p-0'>
            <CardTitle className = "clearfix m-0">
                <div className = 'border float-left' style = {{width: 40, height: 50}}>

                </div>
                <div className = 'mx-1 float-left'>
                    <NavLink className = "p-0" tag = {Link} to = {'/profile/' + this.props.post.username}><h6 className = 'm-0'>@{this.props.post.username}</h6></NavLink>    
                    <span style = {{fontSize: 12}}>35 mins</span>
                </div>
                
                
            </CardTitle>
                
                
                
            <CardText className = 'border-top px-3 py-2' style = {{minHeight: 100, fontSize: 14}}>{this.postAnchor()}</CardText>
            <div className = "clearfix">
                <div className = "float-right">
                    <a href = 'javascript:void(0)' onClick = {() => {this.props.showReplies(this.props.post)}}>Show</a>
                    <Button className = 'btn-sm px-3' onClick = {() => {this.setState({editing: true})}}>Edit</Button>
                    <Button className = 'btn-sm px-3' onClick = {() => {this.props.deletePost(this.props.post.id)}}>Delete</Button>
                </div>
                
            </div>
            
            
            
        </CardBody>;

        if(this.state.editing){
            cardBody = <CardBody>
                <CardTitle>{this.state.post.creator}</CardTitle>
                {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                <FormGroup>
                    <Label for="exampleText">Edit</Label>
                    <Input onChange = {(e) => {this.setState({editPost: e.target.value})}} value = {this.state.editPost} type="textarea" name="text" id="exampleText" />
                </FormGroup>
                <Button onClick = {this.editPost}>Ok</Button>
                
            </CardBody>;
        }
        return (
            <div>
                <Card className = 'border-0 mt-2'>
                    {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
                    {cardBody}
                    
                </Card>
            </div>
            
        
        );
    }
}



export default Blog;