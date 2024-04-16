import React from 'react';
import { Outlet } from 'react-router';

// components
import Sidebar from '../Sidebar';

// styles
import styles from './GeneralLayout.module.scss';

const GeneralLayout = () => {
  return (
    <>
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default GeneralLayout;