import PropTypes from 'prop-types';
import style from './Error.module.css';

/**
 * Error component for displaying error messages.
 * @param {Object} props - The props passed to the component.
 * @param {string} props.children - The error message to be displayed.
 * @returns {JSX.Element} - The Error component.
 */
function Error({ children }) {
    return <p className={style.error}>{children}</p>;
}

// Prop types validation for Error component
Error.propTypes = {
    children: PropTypes.string.isRequired
};

export default Error;
