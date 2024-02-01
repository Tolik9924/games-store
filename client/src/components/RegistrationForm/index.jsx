import React, { useState, useMemo, useEffect } from 'react';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUnlock,
  faLock
} from '@fortawesome/free-solid-svg-icons';

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

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [hasError, setHasError] = useState({
    hasMessageError: false,
    hasFullNameError: false,
    hasEmailError: false,
    hasPasswordError: false,
    hasRepeatPasswordError: false,
  });

  const [errMessage, setErrMessage] = useState('');

  const minAge = 8;
  const maxAge = 100;

  const isDisabledBtn = useMemo(
    () =>
      !data.fullName.trim().length ||
      !data.dateOfBirth.trim().length ||
      !data.email.trim().length ||
      !data.password.trim().length ||
      !data.repeatPassword.trim().length,
    [data.fullName, data.dateOfBirth, data.email, data.password, data.repeatPassword],
  );

  const handleChangeActive = (tab) => {
    setActiveTab(tab);
    setData((prev) => ({ ...prev, role: `${tab === 0 ? STUDENT_ROLE : TEACHER_ROLE}` }));
  };

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const handleShowPassword = (setShowPassword, showPassword) => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async() => {
    registerUser(data);
  }

  const registerUser = async(userInfo) => {
    return await data;
  };

  useEffect(() => {
    console.log('Data: ', data);
    console.log('Show Password: ', showPassword);
  }, [data, showPassword]);

  return (
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
          <form className={styles.formRegistration} onSubmit={handleSubmit}>
            <div className={styles.formControl}>
              <div className={styles.inputContainer}>
                <Input type="text"
                  name='fullName'
                  value={data.fullName}
                  span='FullName'
                  placeholder="Fullname"
                  size='fullwidthSmall'
                  theme='primary'
                  handleChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.inputContainer}>
                <Input type="date"
                  name='dateOfBirth'
                  value={data.dateOfBirth}
                  span='Date of Birth'
                  placeholder="Date of birth"
                  size='fullwidthSmall'
                  theme='primary'
                  handleChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.inputContainer}>
                <Input type="text"
                  name='email'
                  value={data.email}
                  span='email'
                  placeholder="Email"
                  size='fullwidthSmall'
                  theme='primary'
                  handleChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.inputContainer}>
                <Input type={showPassword ? "text" : "password"}
                  name='password'
                  value={data.password}
                  span='password'
                  placeholder="password"
                  size='fullwidthSmall'
                  theme='primary'
                  handleChange={(e) => handleChange(e)}
                />
                {
                  !showPassword ?
                    <span
                      className={styles.showPassword} 
                      onClick={() => handleShowPassword(setShowPassword, showPassword)}>
                        <FontAwesomeIcon icon={faUnlock} fill='#a1a4b5' width={12} height={12}/>
                    </span> :
                    <span
                      className={styles.showPassword} 
                      onClick={() => handleShowPassword(setShowPassword, showPassword)}>
                        <FontAwesomeIcon icon={faLock} fill='#a1a4b5' width={12} height={12}/>
                    </span>
                }
              </div>
              <div className={styles.inputContainer}>
                <Input type={showRepeatPassword ? "text" : "password"}
                  name='repeatPassword'
                  value={data.repeatPassword}
                  span='Repeat Password'
                  placeholder="Repeat Password"
                  size='fullwidthSmall'
                  theme='primary'
                  handleChange={(e) => handleChange(e)}
                />
                {
                  !showRepeatPassword ?
                    <span
                      className={styles.showPassword} 
                      onClick={() => handleShowPassword(setShowRepeatPassword, showRepeatPassword)}>
                        <FontAwesomeIcon icon={faUnlock} fill='#a1a4b5' width={12} height={12}/>
                    </span> :
                    <span
                      className={styles.showPassword} 
                      onClick={() => handleShowPassword(setShowRepeatPassword, showRepeatPassword)}>
                        <FontAwesomeIcon icon={faLock} fill='#a1a4b5' width={12} height={12}/>
                    </span>
                }
              </div>
              <div className={styles.buttonContainer}>
                <Button
                  type='submit'
                  size='medium'
                  theme='primary'
                  disabled={isDisabledBtn}
                  onClick={handleSubmit}
                >
                  Register
                </Button>
              </div>
            </div>
          </form>
          <div className={styles.bottomWrap}>
            <p>Already have an account?</p>
            <Link className={styles.link}>
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;