import React, { useEffect, useState, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

// components
import Input from '../common/Input';
import Button from '../common/Button';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUnlock,
  faLock,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';

// styles
import styles from './ChangeForgottenPassword.module.scss';

const ChangeForgottenPassword = ({
  handleChangePassword,
  handleChangeConfirmPassword,
  handleSubmitChangePassword,
  password,
  confirmPassword,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPaswordConfirm] = useState(false);

  const methods = useForm();

  const handleShowPassword = (setShowPassword, showPassword) => {
    setShowPassword(!showPassword);
  }

  const isDisabledBtn = useMemo(
    () =>
      !password.trim().length ||
      !confirmPassword.trim().length,
    [password, confirmPassword],
  );

  useEffect(() => {
    console.log('Password: ', password);
  }, [password]);

  return (
    <div className={styles.wrap}>
      <div className={styles.blocksWrap}>
        <div className={styles.topWrap}>
          <h1>Change your password, please.</h1>
        </div>
        <FormProvider {...methods}>
          <form className={styles.formControll}>
            <div className={styles.inputContainer}>
              <Input
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={password}
                handleChange={(event) => handleChangePassword(event)}
                placeholder='Password'
                span='Password'
                size='fullwidthSmall'
                theme='primary'
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
              <Input
                type={showPasswordConfirm ? 'text' : 'password'}
                name='confirm password'
                value={confirmPassword}
                handleChange={(event) => handleChangeConfirmPassword(event)}
                placeholder='Confirm Password'
                span='Confirm Password'
                size='fullwidthSmall'
                theme='primary'
              />
              {
                !showPassword ?
                  <span
                    className={styles.showPassword}
                    onClick={() => handleShowPassword(setShowPaswordConfirm, showPasswordConfirm)}>
                    <FontAwesomeIcon icon={faUnlock} fill='#a1a4b5' width={12} height={12} />
                  </span> :
                  <span
                    className={styles.hidePassword}
                    onClick={() => handleShowPassword(setShowPaswordConfirm, showPasswordConfirm)}>
                    <FontAwesomeIcon icon={faLock} fill='#a1a4b5' width={12} height={12} />
                  </span>
              }
            </div>
            <span className={styles.error}>{error}</span>
            <Button
              type='submit'
              size='fullwidth'
              theme='primary'
              disabled={isDisabledBtn}
              onClick={handleSubmitChangePassword}
            >
              Change Password
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

ChangeForgottenPassword.propTypes = {
  handleChangePassword: PropTypes.func,
  handleChangeConfirmPassword: PropTypes.func,
  handleSubmitChangePassword: PropTypes.func,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  error: PropTypes.string,
};

export default ChangeForgottenPassword;