import React, {useState, useContext, useEffect} from 'react'; 
import {GlobalContext} from '../Context/GlobalProvider';
import InsidePages from './InsidePages';
import OutsidePages from './OutsidePages';

function Pages() {
    console.log('PAGES');
    const {userData, globals, getUserData} = useContext(GlobalContext);
    
	if(!userData.production){
		globals.varNames.apiPath = globals.varNames.devApi;
    }

    useEffect(async () => {
        // Update the document title using the browser API
        getUserToken(userData, getUserData);
    }, []);
    
    let page = <OutsidePages/>
    if(userData.loggedIn){
        page = <InsidePages/>
    }
    return (
        <div>
            
            {page}
        </div>
    );
}

function getUserToken(userData, getUserData){
    console.log('get user token');
    let userDataStorage = JSON.parse(localStorage.getItem('userData')); 
    
    if(userDataStorage != null){
        console.log('userdata storage: ', userDataStorage);
        userData.token = userDataStorage.token;
        getUserData();
        // this.$store.dispatch('setUserData', userData);
        // this.$store.dispatch('getUserData', (body) => {
            
        //     console.log('body: ', body);
        //     if(body.status == 1){
        //         // this.$store.state.loggedIn = true;
        //         // this.userData.loggedIn = true;
                
        //         this.userData.userViewed.userID = body.data.userData.id;


        //         this.$store.dispatch('initiateUserData', {from: body.data.userData, to: this.userData});
        //         // this.$store.dispatch('initiateGlobals', {from: body.data.globals, to: this.globals});
        //         this.$store.dispatch('initiateGlobals', {from: body.data.globals, to: this.$store.state.globals});
        //         this.$store.dispatch('setVariables', body.data);
                
                
        //     }else{
        //         this.$store.dispatch('error', body);
                
        //     }
        // });
        
        
    }   
}

export default Pages;