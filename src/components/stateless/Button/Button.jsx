import PropTypes from 'prop-types';
import style from './Button.module.css';

/**
 * Computes the CSS class name for the button based on its properties.
 * @param {boolean} isDelete - Whether the button is a delete button.
 * @param {boolean} isSecondary - Whether the button is a secondary button.
 * @returns {string} - The computed CSS class name.
 */
const computeButtonClassName = (isDelete, isSecondary) => {
    if (isDelete) {
        return style.delete;
    } else if (isSecondary) {
        return style.secondary;
    } else {
        return style.primary;
    }
};
/**
 * Button component represents a clickable button.
 * @param {Object} props - The props passed to the component.
 * @param {string} [props.type] - The type of the button (e.g., 'button', 'submit', 'reset').
 * @param {string} [props.className] - Additional class names to be applied to the button.
 * @param {string} [props.children] - The content of the button.
 * @param {string} [props.name] - The name attribute of the button.
 * @param {string} [props.id] - The id attribute of the button.
 * @param {boolean} [props.isSecondary] - Whether the button is a secondary button.
 * @param {boolean} [props.isDelete] - Whether the button is a delete button.
 * @returns {JSX.Element} - The Button component.
 */
function Button({ type, className, children, name, id, isSecondary, isDelete, onClick }) {
    const buttonClassName = computeButtonClassName(isDelete, isSecondary);

    return (
        <button
            onClick={onClick}
            type={type}
            name={name}
            id={id}
            className={` ${style.baseButton} ${buttonClassName} ${className}`}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
    children: PropTypes.node,
    name: PropTypes.string,
    id: PropTypes.string,
    isSecondary: PropTypes.bool,
    isDelete: PropTypes.bool,
    onClick: PropTypes.func
};

export default Button;
