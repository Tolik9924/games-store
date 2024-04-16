import React, { useState, useMemo, useEffect } from 'react';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import dayjs from 'dayjs';

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

// regex
import { 
  REGEX_FULL_NAME, 
  REGEX_EMAIL, 
  REGEX_PASSWORD, 
  REGEX_DATE_OF_BIRTH 
} from '../../helpers/regex';
import { registration } from '../../services/authServices';
import Loader from '../common/Loader';

const RegistrationForm = () => {
  const methods = useForm();

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

  const checkValidation = () => {
    const errors = {
      hasMessageError: errMessage,
      hasFullNameError: !REGEX_FULL_NAME.test(data.fullName),
      hasEmailError: !REGEX_EMAIL.test(data.email),
      hasPasswordError: !REGEX_PASSWORD.test(data.password),
      hasRepeatPasswordError: data.password !== data.repeatPassword,
    };

    setHasError((prev) => ({ ...prev, ...errors }));

    return Object.values(errors).includes(true);
  }

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

  const handleDateChange = (event) => {
    setData({ ...data, dateOfBirth: event.target.value });
  };

  const onSubmit = methods.handleSubmit (async formData => {
    console.log('Submit data: ', {...formData, role: data.role});
    if (!checkValidation()) {
      setIsLoading(true);
      await registerUser({...formData, role: data.role});
      setIsLoading(false);
    }
  });

  const registerUser = async (userInfo) => {
    try {
      await registration(userInfo);
      setErrMessage('');
    } catch (err) {
      setIsLoading(false);
      setHasError((prev) => ({ ...prev, hasMessageError: true }));
      setErrMessage(err.response.data.message);
      console.log(err.response.data.message);
    }
  };

  useEffect(() => {
    console.log('Data: ', data);
  }, [data]);

  return (
    <div className={styles.contentWrap}>
      {isLoading ? (
        <Loader isAuthPage/>
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
          <FormProvider {...methods}>
            <form className={styles.formRegistration} 
              onSubmit={e => e.preventDefault()}
              noValidate
              autoComplete="off"
            >
              <div className={styles.formControl}>
                <div className={styles.inputContainer}>
                  <Input type="text"
                    label="fullName"
                    name='fullName'
                    value={data.fullName}
                    span='FullName'
                    placeholder="Fullname"
                    size='fullwidthSmall'
                    theme='primary'
                    validation={{
                      required: {
                        value: true,
                        message: 'required'
                      },
                      pattern: {
                        value: REGEX_FULL_NAME,
                        message: 'Must consist Name and Surname'
                      }
                    }}
                    handleChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.inputContainerDateOfBirth}>
                  <Input type="date"
                    label="date"
                    name='dateOfBirth'
                    value={data.dateOfBirth}
                    span='Date of Birth'
                    placeholder="Date of birth"
                    size='fullwidthSmall'
                    theme='primary'
                    validation={{
                      required: {
                        value: true,
                        message: 'required'
                      },
                    }}
                    handleChange={(e) => handleDateChange(e)}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Input type="text"
                    label="email"
                    name='email'
                    value={data.email}
                    span='email'
                    placeholder="Email"
                    size='fullwidthSmall'
                    theme='primary'
                    validation={{
                      required: {
                        value: true,
                        message: 'required'
                      },
                      pattern: {
                        value: REGEX_EMAIL,
                        message: 'wrong email'
                      }
                    }}
                    handleChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Input type={showPassword ? "text" : "password"}
                    label="password"
                    name='password'
                    value={data.password}
                    span='password'
                    placeholder="password"
                    size='fullwidthSmall'
                    theme='primary'
                    validation={{
                      required: {
                        value: true,
                        message: 'required'
                      },
                      pattern: {
                        value: REGEX_PASSWORD,
                        message: 'Must consist upper and low case, numbers and special symbols'
                      }
                    }}
                    handleChange={(e) => handleChange(e)}
                  />
                  {
                    !showPassword ?
                      <span
                        className={styles.showPassword}
                        onClick={() => handleShowPassword(setShowPassword, showPassword)}>
                        <FontAwesomeIcon icon={faUnlock} fill='#a1a4b5' width={12} height={12} />
                      </span> :
                      <span
                        className={styles.hidePassword}
                        onClick={() => handleShowPassword(setShowPassword, showPassword)}>
                        <FontAwesomeIcon icon={faLock} fill='#a1a4b5' width={12} height={12} />
                      </span>
                  }
                </div>
                <div className={styles.inputContainer}>
                  <Input type={showRepeatPassword ? "text" : "password"}
                    label="repeatPassword"
                    name='repeatPassword'
                    value={data.repeatPassword}
                    span='Repeat Password'
                    placeholder="Repeat Password"
                    size='fullwidthSmall'
                    theme='primary'
                    validation={{
                      required: {
                        value: true,
                        message: 'required'
                      },
                      pattern: {
                        value: REGEX_PASSWORD,
                        message: 'Must consist upper and low case, numbers and special symbols'
                      }
                    }}
                    handleChange={(e) => handleChange(e)}                    
                  />
                  {
                    !showRepeatPassword ?
                      <span
                        className={styles.showPassword}
                        onClick={() => handleShowPassword(setShowRepeatPassword, showRepeatPassword)}>
                        <FontAwesomeIcon icon={faUnlock} fill='#a1a4b5' width={12} height={12} />
                      </span> :
                      <span
                        className={styles.hidePassword}
                        onClick={() => handleShowPassword(setShowRepeatPassword, showRepeatPassword)}>
                        <FontAwesomeIcon icon={faLock} fill='#a1a4b5' width={12} height={12} />
                      </span>
                  }
                </div>
                <div className={styles.buttonContainer}>
                  <Button
                    type='submit'
                    size='fullwidth'
                    theme='primary'
                    disabled={isDisabledBtn}
                    onClick={onSubmit}
                  >
                    Register
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
          <div className={styles.bottomWrap}>
            <p>Already have an account?</p>
            <Link className={styles.link} to="/login">
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;