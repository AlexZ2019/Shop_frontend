import React from 'react';
import './App.css';
import {MAIN, SIGN_IN} from "./helpers/consts";
import {SignIn} from "./Components/SignIn/SignIn";
import {AuthProvider} from "./Auth/AuthProvider";
import {Route, Routes} from "react-router-dom";

function App() {

    const routes = [
        {path: MAIN, component: <div>Main</div>},
        {path: SIGN_IN, component: <SignIn/>},
    ]

    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    {routes.map((r, index) => <Route key={index} path={r.path} element={r.component} />)}
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
