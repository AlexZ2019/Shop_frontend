import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './modules/auth';
import { routes } from './modules';

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
