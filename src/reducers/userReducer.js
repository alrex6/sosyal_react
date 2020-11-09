import {SET_USERNAME, SET_IS_LOGGED_IN} from '../actionTypes';

const initialState = {
    username: "",
    userIsLoggedIn: false
};

export default function(state = initialState, action){
   
    
    switch(action.type){
      case 'INCREASE_COUNTER':
        return {counter: state.counter + 1}
      case 'DECREASE_COUNTER':
        return {counter: state.counter - 1}
      case SET_USERNAME:
        
        return {
  
          ...state,
          username: action.payload
  
          
        };
      case SET_IS_LOGGED_IN:
      
        return {
          ...state,
          userIsLoggedIn: action.payload
        };
    }
  
    return state;
}