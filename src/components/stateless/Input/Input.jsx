import PropTypes from 'prop-types';
import style from './Input.module.css';

/**
 * Input component represents a text input field.
 * @param {Object} props - The props passed to the component.
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.onChange - The function to call when the input value changes.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {string} props.type - The type of the input field (e.g., 'text', 'password', 'email', etc.).
 * @returns {JSX.Element} - The Input component.
 */
function Input({ value, onChange, placeholder, type }) {
    return (
        <input
            type={type}
            className={style.input}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
}

Input.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string
};

export default Input;
