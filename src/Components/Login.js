import Axios from 'axios';
import React, {useState, useContext, useRef} from 'react'; 
import {GlobalContext} from '../Context/GlobalProvider';
import TextInput from '../HtmlComponents/TextInput';
import Samples from '../Samples';
import { Button, FormControl } from 'react-bootstrap';
// import FacebookLogin from 'react-facebook-login';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
// import { render } from 'react-dom';
// import { FacebookProvider, LoginButton } from 'react-facebook';

function Login() {
    console.log('LOGIN');
    const {userData, globals, getUserData, forceUpdate} = useContext(GlobalContext);
    const fbRef = useRef(null);
    // console.log('context: ', context);
    // const [amount, setAmount] = useState(5);
    // const [userInputs, setUserInputs] = useState({
    //     username: '',
    //     password: ''
    // });

    async function login(renderProps){
        console.log('login');
        // FacebookLogin.onClick();
        console.log('fb token: ', userData.fbToken);
        
        if(userData.fbToken != ''){

        }else{
              
        }
        renderProps.onClick(); 
        // fbRef.current.props.onClick();
        console.log('fb ref: ', fbRef);
        // fbRef.onClick();
        // var options = {
        //     method: 'post',
        //     url: globals.varNames.apiPath + 'user/fbLogin',
        //     data: {
        //         accessToken: JSON.stringify({email: 'allana@yahos.com', name: 'Al'}) 
                
        //     },
        // }
        // let response = null;
        // console.log('userdata: ', userData);
        
        // if(userData.usingSample){
        //     response = Samples.login(options);
        // }else{
        //     console.log(' not using sample');
        //     response = await Axios(options);
        // }
        

        // console.log('response: ', response);
        // userData.token = response.data.payload; 
        // localStorage.setItem('userData', JSON.stringify({token: userData.token}));    
        // if(response.data.status == 1){
        //     getUserData();   
        // }
        // console.log('userData: ', userData)
    }

    
    function handleResponse(response){
        console.log('response: ', response);
    }

    function handleError(error){
        console.log('error: ', error);
    }
    
    return (
        <div style={{marginBottom: 50}} >
            
            
            {/* <FacebookLogin
                appId="226137388458423"
                autoLoad={true}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook}
                ref={fbRef}
            /> */}

            {/* <FacebookLogin
                appId="226137388458423"
                autoLoad={false}
                callback={(response) => {
                    responseFacebook(response, userData)
                }}
                render={renderProps => (
                    <button onClick={() => {login(renderProps)}}>This is my custom FB button</button>
                )}
            /> */}
            {/* <FacebookProvider appId="226137388458423">
                <LoginButton
                scope="email"
                onCompleted={handleResponse}
                onError={handleError}
                >
                <span>Login via Facebook</span>
                </LoginButton>
            </FacebookProvider> */}

            {/* <input type='button' onClick = {login} value = "Login"></input> */}
            <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
            <FormControl
                placeholder="Password"
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
            <Button variant="primary">Login</Button>
            <Button onClick={() => {userData.registering = true; forceUpdate()}} variant="link">Register</Button>
        </div>
    );
}




function componentClicked(response){
    console.log('component clicked');
    console.log('response: ', response);
}

function responseFacebook(response, userData){
    console.log('response facebook');
    console.log('response: ', response);
    // const {userData, globals, getUserData} = useContext(GlobalContext);
    if(response.accessToken != null){
        userData.fbToken = response.accessToken;
    }
    // FacebookLogin.onClick();

}

// function login(){
//     console.log('login');
// }

export default Login;