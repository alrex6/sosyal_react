
import React from 'react'; 
import './App.css';
// import OutsidePages from './MainViews/OutsidePages';
import Pages from './MainViews/Pages';
import {GlobalProvider} from './Context/GlobalProvider';

// import {GlobalContext} from '../Context/GlobalProvider';

function App() {
	console.log('APP');
	
	// var pages = <OutsidePages/>
	// console.log('userData: ', userData)
	// if(userData.loggedIn){
	// 	pages = <InsidePages/>
	// }
    return (
		<GlobalProvider>
			<Pages/>
		
		</GlobalProvider>
        
    );
}

export default App;
