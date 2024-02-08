import React from 'react';
import { useFormContext } from "react-hook-form";
import { AnimatePresence } from 'framer-motion';

import classNames from 'classnames';

import styles from './Input.module.scss';
import { findInputError } from '../../../utils/findInputError';
import { isFormInvalid } from '../../../utils/isFormInvalid';
import InputError from '../InputError';

const Input = ({
  id,
  label,
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
  validation
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const classProps = classNames(styles.input, styles[`${size}Input`], styles[`${theme}Input`], {
    [styles.disabled]: disabled,
  });
  const classSpan = classNames(styles.span, styles[`${size}Span`]);
  const classFormGroup = classNames(styles.formGroup, styles[`${theme}Span`]);

  const inputError = findInputError(errors, label);
  const isInvalid = isFormInvalid(inputError);

  return (
    <div>
      <div className={classFormGroup}>
        <div className={classSpan}>
          {Icon && <i>{<Icon />} </i>}
          {span && <span>{span}</span>}
        </div>
        <input className={classProps}
          id={id}
          placeholder={placeholder}
          {...register(name, validation)}
          type={type}
          name={name}
          disabled={disabled}
          onChange={handleChange}
          value={value} />
      </div>
      <div className={styles.error}>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputError.error.message}
              key={inputError.error.message}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Input;