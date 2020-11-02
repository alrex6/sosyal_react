import React, {useState, useContext} from 'react'; 
import {GlobalContext} from '../Context/GlobalProvider';
import MessageHeaders from '../Components/MessageHeaders';
import Messages from '../Components/Messages';

function MessagesPage() {
    const {userData} = useContext(GlobalContext);
    let page = <MessageHeaders/>;
    if(userData.viewingMsgs){
        page = <Messages/>;
    }
    return (
        <div>
            {page}
        </div>
    );
}

// function login(){
//     console.log('login');
// }

export default MessagesPage;