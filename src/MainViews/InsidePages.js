import React, {useState, useContext} from 'react'; 
import {GlobalContext} from '../Context/GlobalProvider';
import ProfilePage from '../Views/ProfilePage';
import MessagesPage from '../Views/MessagesPage';
import SideNav from '../Components/SideNav';

function InsidePages() {
    const {userData, globals, getUserData} = useContext(GlobalContext);
    let page = <ProfilePage/>
    if(userData.currentPage.back == 'Home'){
        // page = 
    }else if(userData.currentPage.back == 'Messages'){
        page = <MessagesPage/>
    }
    return (
        <div style={{display: 'flex'}}>
            <div style={{flex: 1}} className='bg-secondary'>
                <SideNav/> 
            </div>
            <div style={{flex: 3}}>
                {page}
            </div>
            
        </div>
    );
}

// function login(){
//     console.log('login');
// }

export default InsidePages;