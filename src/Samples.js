import InitialState from './Context/InitialState';

var samples = {

}

samples.users = [
    {
        id: 1,
        token: JSON.stringify({email: 'allana@yahos.com', name: 'Al'}), 
        username: '',
        userID: 0,
        country: 5,
        name: 'hey',
        // followedUsers: 
        dataBal: 5,
        balance: 50,
        passwordSet: true,
        photoPassword: 'hy',
        pendingDataDeductions: 500,
        pendingDeductions: 300
    }
]

samples.registers = [
    {
        code: '',
        emailCode: '',
        username: '',
        password: '',
        email: ''
    }
]

samples.login = function(options){
    let userFinal = null;
    console.log('initial state: ', InitialState);
    console.log('options; ', options);
    console.log('api path: ', InitialState.globals.varNames.devApi + 'user/fbLogin');
    if(options.url == InitialState.globals.varNames.devApi + 'user/fbLogin'){
        console.log('path is equal');
        samples.users.forEach((user) => {
            
            if(user.token == options.data.accessToken){
                userFinal = user;      
            }
        })
    }

    if(userFinal == null){
        return samples.status(0, 1, 'Error', '');
    }else{
        return samples.status(1, 0, '', userFinal);   
    }
    // return userFinal;
}

samples.register = function(options){
    
    if(options.url == InitialState.globals.varNames.devApi + 'user/register'){
        console.log('path is equal');
        
        var register = {
            code: samples.randomStr(5),
            emailCode: samples.randomStr(5),
            username: options.data.username,
            password: options.data.password,
            email: options.data.email
        }
        samples.registers.push(register);
        console.log('email code: ', register.emailCode);
        return samples.status(1, 0, 'Register successful', {code: register.code, email: register.email});
    }else{
        return samples.status(0, 1, 'Invalid route', '');   
    }


    
    // return userFinal;
}

samples.confirmRegister = function(options){
    
    if(options.url == InitialState.globals.varNames.devApi + 'user/confirmRegister'){
        console.log('path is equal');
        samples.registers.forEach((register) => {
            if(register.email == options.data.email){
                if(register.emailCode == options.data.emailCode && register.code == options.data.code){
                    var user = {
                        id: samples.users.length,
                        token: samples.randomStr(5), 
                        username: register.username,
                        userID: samples.users.length,
                        country: 5,
                        name: 'hey',
                        // followedUsers: 
                        dataBal: 5,
                        balance: 50,
                        passwordSet: true,
                        photoPassword: 'hy',
                        pendingDataDeductions: 500,
                        pendingDeductions: 300
                    }
                    samples.users.push(user);
                    return samples.status(1, 0, 'Register successful', user.userID);   
                }
            }
        })
    }else{
        return samples.status(0, 1, 'Invalid route', '');   
    }


    
    // return userFinal;
}

samples.status = function(status, code, message, payload){
    return {
        status: status,
        code: code,
        message: message,
        payload: payload
    }
}

samples.randomStr = function(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default samples;