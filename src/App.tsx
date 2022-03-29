import React from 'react';
import './App.css';
import {MAIN, SIGN_IN} from "./helpers/consts";
import {SignIn} from "./Components/SignIn/SignIn";
import {AuthProvider} from "./Auth/AuthProvider";
import {Route, Routes} from "react-router-dom";

function App() {

    const routes = [
        {path: MAIN, component: null},
        {path: SIGN_IN, component: SignIn},
    ]

    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    <Route path={MAIN} element={<div>main</div>}/>
                    <Route path={SIGN_IN} element={<SignIn/>} />
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
