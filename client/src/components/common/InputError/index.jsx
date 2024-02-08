import React from 'react';
import { motion } from 'framer-motion';

// helpers
import { framer_error } from '../../../helpers/framerError';

const InputError = ({ message }) => {
  return (
    <motion.p
      {...framer_error}
    >
      {message}
    </motion.p>
  );
};

export default InputError;