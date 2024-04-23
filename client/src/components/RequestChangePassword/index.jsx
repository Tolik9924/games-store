import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

// components
import Input from '../common/Input';
import Button from '../common/Button';

// styles
import styles from './RequestChangePassword.module.scss';

const RequestChangePassword = ({
  handleChangeEmail,
  handleSubmitEmail,
  email,
  error
}) => {

  const methods = useForm();

  const isDisabledBtn = useMemo(
    () =>
      !email.trim().length,
    [email],
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.blocksWrap}>
        <div className={styles.topWrap}>
          <h1 className={styles.topWrapHeader}>Enter your email, please.</h1>
        </div>
        <FormProvider {...methods}>
          <form className={styles.formControl}>
            <div className={styles.inputContainer}>
              <Input
                type='email'
                name='email'
                value={email}
                handleChange={(event) => handleChangeEmail(event)}
                placeholder='Email'
                span='email'
                size='fullwidthSmall'
                theme='primary'
              />
            </div>
            <span className={styles.error}>{error}</span>
            <Button
              type='submit'
              size='fullwidth'
              theme='primary'
              disabled={isDisabledBtn}
              onClick={handleSubmitEmail}
            >
              Send Email
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

RequestChangePassword.propTypes = {
  handleChangeEmail: PropTypes.func,
  handleSubmitEmail: PropTypes.func,
  email: PropTypes.string,
  snackbarShowMessage: PropTypes.func,
  error: PropTypes.string,
};

export default RequestChangePassword;