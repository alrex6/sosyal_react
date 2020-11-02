import React, {useState, useContext} from 'react'; 
import {GlobalContext} from '../Context/GlobalProvider';
import Login from '../Components/Login';
import Register from '../Components/Register';

function LoginPage() {
    const {userData, globals, getUserData} = useContext(GlobalContext);
    var div = <Login />
    if(userData.registering){
        div = <Register />
    }
    return (
        <div style={{display: 'flex', padding: 50}}>
            {/* <div style={{flex: 2}}></div> */}
            <div style={{flex: 1}}>
                {div}
            </div>
            
        </div>
    );
}

// function login(){
//     console.log('login');
// }

export default LoginPage;