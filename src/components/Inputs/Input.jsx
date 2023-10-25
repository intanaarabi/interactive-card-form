import PropTypes from 'prop-types';

import React from 'react';

const Input = React.forwardRef(({ label, placeholder, type, name, errors }, ref) => {
    const error = errors[name];
    console.log(errors)

    return (
    <div className="flex flex-col">
      {label && <label  className="uppercase font-medium text-sm tracking-wide mb-2">{label}</label>}
      <input   className={`border rounded p-2 ${error ? 'border-red-500' : ''}`} 
       autoComplete="cc-csc" 
       type={type} 
       placeholder={placeholder} 
       ref={ref}
       name={name}
      />
    </div>
  );
});


Input.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['text', 'number', 'password', 'email', 'checkbox', 'radio', 'date', 'file', 'hidden', 'image', 'button', 'submit', 'reset']).isRequired,
    name: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
};

Input.defaultProps = {
    label: '',
    placeholder: '',
    type: 'text',
    name: '',
    errors: {}
};

Input.displayName = 'Input';

export default Input;
