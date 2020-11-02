import React, {useState, useContext} from 'react'; 
import {GlobalContext} from '../Context/GlobalProvider';
import ProfileDiv from '../Components/ProfileDiv';

function ProfilePage() {
 
    return (
        <div>
            <ProfileDiv/>
        </div>
    );
}

// function login(){
//     console.log('login');
// }

export default ProfilePage;