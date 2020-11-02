import Axios from 'axios';
import React, {useState, useContext, useEffect} from 'react'; 
import {GlobalContext} from '../Context/GlobalProvider';
import TextInput from '../HtmlComponents/TextInput';
import Samples from '../Samples';
import { Button } from 'react-bootstrap';

function MessageHeaders() {
    console.log('MESSAGE HEADERS');
    const {userData, globals, apiCall, messageData, forceUpdate, newMsg, getMsgs} = useContext(GlobalContext);
    
    
    
    console.log('msg headers:', messageData.msgHeaders);
    useEffect(async () => {
        // Update the document title using the browser API
        getMsgHeaders(apiCall, forceUpdate, globals, messageData);
    }, []);
    
    // console.log('user inputs: ', userInputs);
    return (
        <div className="">
            <div>
                <button onClick={()=>{newMsg('wallet', 'hey')}}>New Message</button>
            </div>
            
            {messageData.msgHeaders.map((msgHeader) => {
                return <div onClick={() => {getMsgs(msgHeader.id, 0)}} key={msgHeader.id}>{msgHeader.receivername}</div>
                
            })}
            {/* {messageData.msgHeaders.map((msgHeader) => (<span key={msgHeader.id}>{msgHeader.receivername}</span>))} */}
            
        </div>
    );
}

async function getMsgHeaders(apiCall, forceUpdate, globals, messageData){
        
    let response = await apiCall(globals.varNames.apiPath + 'message/getMsgHeaders', {startPoint: 0});
    // console.log('response: ', response);
    if(response.status == 1){
        
        messageData.msgHeaders = response.payload;
        console.log('message headers: ', messageData.msgHeaders);
        forceUpdate();
    }
    
}



// function login(){
//     console.log('login');
// }

export default MessageHeaders;