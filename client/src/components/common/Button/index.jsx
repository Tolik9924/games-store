import React from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

const Button = ({
  children = '',
  iconType = false,
  disabled = false,
  fullwidth = false,
  size = 'medium',
  type = 'button',
  theme = 'primary',
  className = '',
  onClick
}) => {
  const classProps = classNames(styles.button, styles[theme], styles[size], {
    [styles.fullwidth]: fullwidth
  }, className);

  return (
    <button
      type={type}
      onClick={onClick}
      className={classProps}
    >
      {children}
    </button>
  );
};

export default Button;