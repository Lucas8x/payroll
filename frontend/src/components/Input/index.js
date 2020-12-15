import React from 'react';

import './styles.css';

const Input = ({ label, name, ...rest }) => {
  return (
    <div className='input-block'>
      <label htmlFor={name}>{label}</label>
      <div className='input-field'>
        <input type='text' id={name} {...rest} />
      </div>
    </div>
  );
};

export default Input;
