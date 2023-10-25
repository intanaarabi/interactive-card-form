import PropTypes from 'prop-types';

function Input({ label, inputType, placeholder }) {
    return (
        <div className="flex flex-col">
            {label && <label className="uppercase font-medium text-sm tracking-wide mb-2">{label}</label>}
            <input autoComplete="off" type={inputType} placeholder={placeholder} className="border rounded p-2"/>
        </div>
    );
}

Input.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    inputType: PropTypes.oneOf(['text', 'number', 'password', 'email', 'checkbox', 'radio', 'date', 'file', 'hidden', 'image', 'button', 'submit', 'reset']).isRequired,
};

Input.defaultProps = {
    label: '',
    placeholder: '',
    inputType: 'text',
};

export default Input;
