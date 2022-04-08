import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import modules from './modules';
import UserProvider from './providers/userProvider/UserProvider';
import { IRoute } from './modules/common/interfaces/moduleInterfaces';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          {modules.routes.map((r: IRoute, index: number) => (
            <Route key={index} path={r.path} element={r.component} />
          ))}
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
