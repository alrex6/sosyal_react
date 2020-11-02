import Axios from 'axios';
import React, {useState, useContext, useEffect} from 'react'; 
import {GlobalContext} from '../Context/GlobalProvider';
import TextInput from '../HtmlComponents/TextInput';
import Samples from '../Samples';
import { Button } from 'react-bootstrap';

function Messages() {
    console.log('MESSAGE HEADERS');
    const {userData, globals, getMsgs, messageData, forceUpdate, newMsg} = useContext(GlobalContext);
    
    
    
    console.log('msg headers:', messageData.msgHeaders);
    // useEffect(async () => {
    //     // Update the document title using the browser API
    //     getMsgs();
    // }, []);
    function backToMsgHeaders(){
        userData.viewingMsgs = false; 
        forceUpdate();
    }
    // console.log('user inputs: ', userInputs);
    return (
        <div className="">
            <div>
                <button onClick={backToMsgHeaders}>Back</button>
            </div>
            
            {messageData.msgs.map((msg) => {
                return <div key={msg.id}>{msg.message}</div>
                
            })}
            
        </div>
    );
}

export default Messages;