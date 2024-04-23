import React, { useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import PropTypes from 'prop-types';

import ChangeForgottenPassword from '../../components/ChangeForgottenPassword';
import RequestChangePassword from '../../components/RequestChangePassword';

// hoc
import { withSnackbar } from '../../components/withSnackbar/withSnackbar';

// service
import { resetPasswordService, requestChangePasswordService } from '../../services/authServices';

const ChangePassword = ({ snackbarShowMessage }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const id = searchParams.get('id');
  const navigate = useNavigate();

  const hangleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const requestChangePassword = async (email) => {
    try {
      //const changePassword = await requestChangePasswordService(email);
      snackbarShowMessage({
        message: 'Email was sent',
        severity: 'success',
      });
      setError('');
      console.log("Changed email: ", email);
      //return changePassword;
    } catch (error) {
      setError(error.response.data.error);
      console.log('error', error);
    }
  };

  const handleSubmitEmail = async () => {
    await requestChangePassword(email);
    setEmail('');
  };

  const handleSubmitChangePassword = async () => {
    //await changePassword();
    console.log('Password is changed!');
  };

  return (
    <>
      {false ? (
        <ChangeForgottenPassword 
        handleChangePassword={handleChangePassword}
        handleChangeConfirmPassword={handleChangeConfirmPassword}
        handleSubmitChangePassword={handleSubmitChangePassword}
        password={password}
        confirmPassword={confirmPassword}
        error={error}
        />
      ) : (
        <RequestChangePassword 
          handleChangeEmail={hangleChangeEmail}
          handleSubmitEmail={handleSubmitEmail}
          email={email}
          error={error}
        />
      )}
    </>
  );
};

ChangePassword.propTypes = {
  snackbarShowMessage: PropTypes.func,
};

export default withSnackbar(ChangePassword);