import React, { Component } from 'react';
import {connect} from 'react-redux';
import {SET_USERNAME, SET_PAGE, apiPath} from '../actionTypes';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class SideNav extends Component {

    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };

        // this.logout = this.logout.bind(this);
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    // logout(){
    //     this.props.setData(SET_USERNAME, "");
    //     localStorage.removeItem('userData');  
    //     $.ajax({
    //         method: 'get',
    //         url: apiPath + 'user/logout',
    //         headers: {
    //             'x-access-token': this.props.userData.token
    //         },
            
    //         success: (data) => {
    //            console.log("new question data: ", data);
    //         //    this.setState({questions: data.data});
    //         //    console.log("question levels: ", this.state.questionLevels);
    //         //    this.props.updatePosts(data.data);
               
    //         },
    //         error: function(err){
    //            console.log(err);
    //         }
    //     });  
    // }

    render() {
        
        return (
           

            <Nav vertical>
                                
                <NavItem>
                    <NavLink onClick = {() => {this.props.setData(SET_PAGE, 'HOME')}}>Home</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink onClick = {() => {this.props.setData(SET_PAGE, 'AD')}}>Ad</NavLink>
                </NavItem>
               
            

                <NavItem>
                    <NavLink onClick = {this.props.logout}>Logout</NavLink>
                </NavItem>

            </Nav>
            
        
        );
    }
}


// connect(mapStateToProps)(Login);
export default SideNav;