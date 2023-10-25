import React from 'react';
import PropTypes from 'prop-types';

const ExpiryInput = React.forwardRef(({ errors }, ref) => {
    return (
    <div className="flex flex-col">
      <label htmlFor="month" className="uppercase font-medium text-sm tracking-wide mb-2">Expiry Date (MM/YY)</label>
      <div className="flex gap-2">
        <input 
          type="text" 
          id="month" 
          name="mmalias" 
          placeholder="MM"
          maxLength="2" 
          className={`border rounded w-20 p-2 ${errors["mmalias"] ? 'border-red-500' : ''}`} 
          autoComplete="cc-csc"
          ref={e => {
            ref({
              ...e,
              name: 'mmalias'
            });
          }}
        />
        <input 
          type="text" 
          name="yyalias"  
          placeholder="YY"
          maxLength="2" 
          className={`border rounded w-20 p-2 ${errors["yyalias"] ? 'border-red-500' : ''}`} 
          autoComplete="cc-csc"
          ref={e => {
            ref({
              ...e,
              name: 'yyalias'
            });
          }}
        />
      </div>
    </div>
  );
});
ExpiryInput.propTypes = {
    errors: PropTypes.object,
  };
  
  ExpiryInput.defaultProps = {
    errors: {},
  };

  
ExpiryInput.displayName = 'ExpiryInput';

export default ExpiryInput;
