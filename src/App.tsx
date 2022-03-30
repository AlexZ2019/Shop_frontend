import React from 'react';
import './App.css';
import {MAIN, SIGN_IN} from "./helpers/consts";

import {Route, Routes} from "react-router-dom";
import AuthProvider from "./modules/Auth";
import SignIn from "./modules/SignIn";
import TopBar from "./Components/TopBar";

function App() {

    const routes = [
        {path: MAIN, component: <div><TopBar/>Main</div>},
        {path: SIGN_IN, component: <SignIn/>},
    ]

    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    {routes.map((r, index) =>
                        <Route key={index} path={r.path} element={r.component} />)}
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
