import Axios from 'axios';
import React, {useState, useContext} from 'react'; 
import {GlobalContext} from '../Context/GlobalProvider';
import TextInput from '../HtmlComponents/TextInput';
import Samples from '../Samples';

function ProfileDiv() {
    const {userData, globals, getUserData} = useContext(GlobalContext);
    

    
    
    // console.log('user inputs: ', userInputs);
    return (
        <div>
            
            
            <span>{userData.username}</span>
            
        </div>
    );
}

// function login(){
//     console.log('login');
// }

export default ProfileDiv;