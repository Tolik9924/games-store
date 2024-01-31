import React from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';

const Input = ({
  Icon,
  name = '',
  type = 'text',
  disabled = false,
  value,
  span,
  handleChange,
  size = 'medium',
  placeholder = '',
  theme = 'primary',
}) => {
  const classProps = classNames(styles.input, styles[`${size}Input`], styles[`${theme}Input`], {
    [styles.disabled]: disabled,
  });
  const classSpan = classNames(styles.span, styles[`${size}Span`]);
  const classFormGroup = classNames(styles.formGroup, styles[`${theme}Span`]);

  return (
    <div className={classFormGroup}>
      <div className={classSpan}>
        {Icon && <i>{<Icon />} </i>}
        {span && <span>{span}</span>}
      </div>
      <input className={classProps}
        placeholder={placeholder}
        type={type}
        name={name}
        disabled={disabled}
        onChange={handleChange}
        value={value} />
    </div>
  );
};

export default Input;