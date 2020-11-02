export default (state, action) => {
    switch(action.type) {
        case 'DELETE':
            console.log('payload: ', action.payload);
            // state.userData.username = action.payload;
            return {
                ...state,
                // userData: {
                //     ...state.userData,
                //     username: action.payload  
                // }
            }

        case 'UPDATE_USER_DATA':
            console.log('UPDATE USER DATA: ');
            // console.log('state: ', state);
            // console.log('user data; ', state.userData);
            // state.userData.username = action.payload;
            return {
                ...state,
                // userData: {
                //     ...state.userData,
                //     username: action.payload  
                // }
            }
        default:
            return state;
    }
}