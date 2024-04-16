import React, { 
  useState, 
  useMemo, 
  useContext 
} from 'react';

import { Link, useNavigate } from 'react-router-dom';

// components
import Input from '../common/Input';
import Loader from '../common/Loader';

// services
import { login } from '../../services/authServices';

// Context
import { CurrentUserContext } from '../../context/AppProvider';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUnlock,
  faLock,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';

// styles
import styles from './LoginForm.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import Button from '../common/Button';

const LoginForm = () => {
  const { fetchUser } = useContext(CurrentUserContext);

  const history = useNavigate();
  
  const methods = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const handleShowPassword = (setShowPassword, showPassword) => {
    setShowPassword(!showPassword);
  }

  const isDisabledBtn = useMemo(
    () =>
      !data.email.trim().length ||
      !data.password.trim().length,
    [data.email, data.password],
  );

  const loginUser = async (userInfo) => {
    try {
      setIsLoading(true);
      const {
        data: { token },
      } = await login(userInfo);
      if (token) {
        await fetchUser();
        history('/app');
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.log(err);
    }
  };

  const onSubmit = methods.handleSubmit(async () => {
    await loginUser(data);
  });

  return (
    <div className={styles.wrap}>
      {isLoading ? (
        <Loader isAuthPage />
      ) : (
        <div className={styles.blocksWrap}>
          <div className={styles.topWrap}>
            <h1>Let&apos;s Get Started</h1>
            <p>Sign in to continue to Inter School</p>
          </div>
          <FormProvider {...methods}>
            <form className={styles.formControl}
              onSubmit={e => e.preventDefault()}
            >
              <div className={styles.inputContainer}>
                <Input type='email'
                  name='email'
                  value={data.email}
                  span='email'
                  placeholder="email"
                  size='fullwidthSmall'
                  theme='primary'
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
              <div className={styles.forgotPasswordWrap}>
                <Link to='/reset-password'>
                  <span>Forgot password?</span>
                </Link>
              </div>
              <Button type='submit'
                size='fullwidth'
                theme='primary'
                disabled={isDisabledBtn}
                onClick={onSubmit}

              >
                Sign in
              </Button>
              {isError ? (
                <div className={styles.error}>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    fill='#d57c77'
                    width={12}
                    height={12}
                  />
                  {' Wrong password or email address...'}
                </div>
              ) : (
                ''
              )}
            </form>
          </FormProvider>
          <div className={styles.bottomWrap}>
            <p>Don&apos;t have an account?</p>
            <Link className={styles.link} to='/registration'>
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;