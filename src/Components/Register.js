import Axios from 'axios';
import React, {useState, useContext, useRef} from 'react'; 
import {GlobalContext} from '../Context/GlobalProvider';
import { Button, FormControl } from 'react-bootstrap';
import Samples from '../Samples';



function Register() {
    console.log('REGISTER');
    const {userData, globals, getUserData, forceUpdate} = useContext(GlobalContext);
    const [userInputs, setUserInputs] = useState({
        username: '',
        password: '',
        email: '',
        confirmingRegister: false,
        emailCode: '',
        code: ''   
    })

    async function register(){
        console.log('register');
        var response = null;
        var options = {
            method: 'post',
            url: globals.varNames.apiPath + 'user/register',
            data: {
                username: userInputs.username,
                password: userInputs.password,
                email: userInputs.email
            }
        }
        if(userData.usingSample){
            
            response = Samples.register(options);
        }else{
            response = await Axios(options);
        }

        if(response.status == 1){
            userInputs.confirmingRegister = true;
            setUserInputs({...userInputs});
        }
    }

    async function confirmRegister(){
        console.log('register');
        var response = null;
        var options = {
            method: 'post',
            url: globals.varNames.apiPath + 'user/confirmRegister',
            data: {
                code: userInputs.code,
                emailCode: userInputs.emailCode,
                email: userInputs.email
            }
        }
        if(userData.usingSample){
            
            response = Samples.confirmRegister(options);
        }else{
            response = await Axios(options);
        }
        console.log('response: ', response);
        if(response.status == 1){
            
        }
    }

    var div = <div>
        <FormControl
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={userInputs.username}
            onChange={(e) => {userInputs.username = e.target.value; setUserInputs({...userInputs})}}
        />
        <FormControl
            placeholder="Password"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={userInputs.password}
            onChange={(e) => {setUserInputs({...userInputs, password: e.target.value})}}
        />
        <FormControl
            placeholder="Email"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={userInputs.email}
            onChange={(e) => {setUserInputs({...userInputs, email: e.target.value})}}
        />
        <Button onClick={register} variant="primary">Register</Button>
    </div>;

    if(userInputs.confirmingRegister){
        div = <div>
            <FormControl
                placeholder="Verification Code"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={userInputs.emailCode}
                onChange={(e) => {setUserInputs({...userInputs, emailCode: e.target.value})}}
            />
            
            <Button onClick={confirmRegister} variant="primary">Verify</Button>
        </div>
    }
    
    return (
        <div>
            
            
            {div}
            <Button onClick={() => {userData.registering = false; forceUpdate()}} variant="link">Login</Button>
        </div>
    );
}






export default Register;