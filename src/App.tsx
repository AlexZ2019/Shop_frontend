import React from 'react';
import './App.css';
import {MAIN, SIGN_IN} from "./helpers/consts";
import {SignIn} from "./Components/SignIn/SignIn";

function App() {

    const routes = [
        {path: MAIN, component: null},
        {path: SIGN_IN, component: <SignIn/>},
    ]

    return (
        <div className="App">
            test
        </div>
    );
}

export default App;
