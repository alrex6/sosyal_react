import Axios from 'axios';
import React, {useState, useContext} from 'react'; 
import {GlobalContext} from '../Context/GlobalProvider';


function ProfileDiv() {
    const {userData, globals, changePage, logout} = useContext(GlobalContext);
    

    
    
    // console.log('user inputs: ', userInputs);
    return (
        <div>
            
            <div onClick={() => {changePage('Home')}}>Home</div>
            <div onClick={() => {changePage('Messages')}}>Messages</div>
            <div onClick={() => {changePage('Messages')}}>Wallet</div>
            <div onClick={logout}>Logout</div>
           
            
            
        </div>
    );
}

// function login(){
//     console.log('login');
// }

export default ProfileDiv;