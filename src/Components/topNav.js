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
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class TopNav extends Component {

    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };

        
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    

    render() {
        return (
            <div className = "col-sm-12">
                <Navbar color="success" light expand="lg">
                {/* {this.props.children} */}
                    <NavbarBrand href="/">blags</NavbarBrand>
                    <NavbarToggler className = "d-lg-none" onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto d-lg-none" navbar>
                        
                            <NavItem>
                                <NavLink tag = {Link} to = {'/home'}>Home</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag = {Link} to = {'/profile'}>Profile</NavLink>
                            </NavItem>
                           

                            <NavItem>
                                <NavLink tag = {Link} to = {'/ad'}>Ads</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag = {Link} to = {'/message'}>Chat</NavLink>
                            </NavItem>
                           
                            
                            <NavItem>
                                <NavLink onClick = {this.props.logout}>Logout</NavLink>
                            </NavItem>
                        
                        </Nav>
                    </Collapse>
                </Navbar>    
            </div>
            
        
        );
    }
}


export default TopNav;