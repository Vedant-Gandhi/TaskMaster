import PropTypes from 'prop-types';
import style from './TextField.module.css';

/**
 * TextField component represents a text area field.
 * @param {Object} props - The props passed to the component.
 * @param {string} props.value - The current value of the text area field.
 * @param {function} props.onChange - The function to call when the text area value changes.
 * @param {string} props.placeholder - The placeholder text for the field.
 * @param {string} props.resize - The resizing behavior for the text area (e.g., 'none', 'vertical', 'horizontal', 'both').
 * @returns {JSX.Element} - The TextField component.
 */
function TextField({ value, onChange, placeholder, resize }) {
    return (
        <textarea
            className={style.textfield}
            style={{ resize: resize ? resize : 'none' }}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
}

TextField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    resize: PropTypes.oneOf(['none', 'vertical', 'horizontal', 'both'])
};

export default TextField;
