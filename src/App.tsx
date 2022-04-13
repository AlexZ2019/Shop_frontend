import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import modules from './modules';
import UserProvider from './providers/userProvider/UserProvider';
import { IRoute, RouteType } from './modules/common/interfaces/moduleInterfaces';
import { PrivetRouteWrapper } from './modules/auth/routeWrappers/PrivetRouteWrapper';
import { NotAuthWrapper } from './modules/auth/routeWrappers/NotAuthWrapper';

function App() {
  return (
    <div className='App'>
      <UserProvider>
        <Routes>
          {modules.routes.map((r: IRoute, index: number) => {
            switch (r.type) {
              case RouteType.Auth:
                return <Route key={index} path={r.path}
                              element={<PrivetRouteWrapper >{r.component}</PrivetRouteWrapper>} />;
              case RouteType.NotAuth:
                return <Route key={index} path={r.path}
                              element={<NotAuthWrapper>{r.component}</NotAuthWrapper>} />;
              default:
                return <Route key={index} path={r.path}
                                     element={r.component} />;
            }
          })}
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
