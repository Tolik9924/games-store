import React, { useContext, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

// Context
import { CurrentUserContext } from '../context/AppProvider';

// Routes
import PrivateRoute from './PrivateRoute';
import GeneralLayout from '../components/GeneralLayout/GeneralLayout';

// constants
import { ADMIN_ROLE } from '../constants/userRoles';

// Pages
const Registration = lazy(() => import('../pages/Registration'));
const Login = lazy(() => import('../pages/Login'));
const Main = lazy(() => import('../pages/Main'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Materials = lazy(() => import('../pages/Materials'));

const RouterWrapper = () => {
  const { isAuthenticated, currentUser } = useContext(CurrentUserContext);
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* <Route index element={isAuthenticated ? <Navigate to='/app' /> : <Main />} />
        <Route 
          path='/app'
          element={
            <PrivateRoute>
              <GeneralLayout />
            </PrivateRoute>
          }
        >
        <Route 
          index
          element={
            <PrivateRoute>
              {currentUser.role !== ADMIN_ROLE ? <Dashboard /> : <Navigate to='/app/materials' />}
            </PrivateRoute>
          }
        />
        <Route 
          path='/app/materials'
          element={
            <PrivateRoute>
              <Materials />
            </PrivateRoute>
          }
        />
        </Route> */} 
        <Route path='/app' element={<Main />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default RouterWrapper;