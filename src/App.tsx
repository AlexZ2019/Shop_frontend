import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { routes } from './modules';
import UserProvider from './providers/UserProvider';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          {routes.map((r, index) => (
            <Route key={index} path={r.path} element={r.component} />
          ))}
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
