import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// reducer
import { showSnackbar, hideSnackbar } from '../../store/snackbarReducer';

// styles
import styles from './withSnackbar.module.scss';
import classNames from 'classnames';

export const withSnackbar = (WrappedComponent) => {
  const NewComponent = (props) => {
    const snackbarShow = useSelector((state) => state.snackbar.snackbarShow);
    const snackbarMessage = useSelector((state) => state.snackbar.snackbarMessage);
    const severity = useSelector((state) => state.snackbar.severity);
    const dispatch = useDispatch();

    const classProps = classNames(styles.snackbar, styles[severity]);

    useEffect(() => {
      console.log('Snackbar show: ', snackbarShow);
      console.log('Snackbar message: ', snackbarMessage);
      console.log('Snackbar severity: ', severity);
    }, [snackbarShow, snackbarMessage, severity]);

    const showMessage = useCallback((data) => {
      dispatch(showSnackbar(data.message, data.severity));
    }, [dispatch]);

    const hideMessage = useCallback((data) => {
      dispatch(hideSnackbar(data.message, data.severity));
    }, [dispatch]);

    return (
      <React.Fragment>
        <WrappedComponent {...props} snackbarShowMessage={showMessage} />
        <div className={snackbarShow ? styles.show : styles.hide}>
          <div className={classProps} onClick={hideMessage}>{snackbarMessage}</div>
        </div>
      </React.Fragment>
    );
  };

  return NewComponent;
};