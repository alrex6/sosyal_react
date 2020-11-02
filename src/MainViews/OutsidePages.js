import React, {useState, useContext} from 'react'; 
import {GlobalContext} from '../Context/GlobalProvider';
import LoginPage from '../Views/LoginPage';

function OutsidePages() {
    
    return (
        <div>
            <LoginPage/>
        </div>
    );
}

// function login(){
//     console.log('login');
// }

export default OutsidePages;