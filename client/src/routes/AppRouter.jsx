import React, { useContext, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
const Registration = lazy(() => import('../pages/Registration'));

const RouterWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='Registration' element={<Registration />} />
      </Routes>
    </Suspense>
  );
};

export default RouterWrapper;