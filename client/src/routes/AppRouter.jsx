import React, { useContext, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
const Registration = lazy(() => import('../pages/Registration'));
const Login = lazy(() => import('../pages/Login'));

const RouterWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default RouterWrapper;