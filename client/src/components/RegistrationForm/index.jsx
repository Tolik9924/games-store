import React, { useState, useMemo } from 'react';

// styles
import styles from './RegistrationForm.module.scss';
import { STUDENT_ROLE, TEACHER_ROLE } from '../../constants/userRoles';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';

const RegistrationForm = () => {
  const [data, setData] = useState({
    role: STUDENT_ROLE,
    fullName: '',
    dateOfBirth: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState(0);

  const handleChangeActive = (tab) => {
    setActiveTab(tab);
    setData((prev) => ({...prev, role: `${tab === 0 ? STUDENT_ROLE : TEACHER_ROLE}`}));
  };

  return(
    <div className={styles.contentWrap}>
      {isLoading ? (
        <div>is loading...</div>
      ) : (
        <div className={styles.blocksWrap}>
          <div className={styles.roles}>
            <div className={`${styles.tab} ${activeTab === 0 ? styles.active : ''}`}>
                <button className={styles.button} onClick={() => handleChangeActive(0)}>
                  <h2 onClick={() => handleChangeActive(0)} className={styles.button}>Student</h2>
                </button>
            </div>
            <div className={`${styles.tab} ${activeTab === 1 ? styles.active : ''}`}>
                <button className={styles.button} onClick={() => handleChangeActive(1)}>
                  <h2>Teacher</h2>
                </button>
            </div>
          </div>
          <div className={styles.topWrap}>
            <h1>Get started with Us</h1>
            <p>Register a new membership</p>
          </div>
          <div className={styles.formRegistration}>
            <div className={styles.formControl}>
              <input className={styles.fullName} type="text" />
              <input className={styles.dateOfBirth} type="text" />
              <input className={styles.email} type="email" />
              <input className={styles.password} type="password" />
              <input className={styles.repeatPassword} type="password" />
              <Button 
                type='button'
                size='medium'
                theme='primary'
              >
                Register
              </Button>
            </div>
          </div>
          <div className={styles.bottomWrap}>
            <p>Already have an account?</p>
            <Link className={styles.link}>
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      )}
      <Input />
    </div>
  );
};

export default RegistrationForm;