import PropTypes from 'prop-types';
import style from './Chip.module.css';
/**
 *
 * @param {object} props
 * @param {string} props.text The text to display.
 * @param {string} props.id The ID of the component.
 * @param {boolean} props.hideDeleteIcon Hide the delete icon for the chip.
 * @param {(id:string)=>void | undefined} props.onDelete The callback invoked when the delete button is clicked.
 * @returns
 */
function Chip({ id, text, onDelete, hideDeleteIcon }) {
    return (
        <div className={style.Chip}>
            <p>#&nbsp;{text}</p>
            {!hideDeleteIcon && (
                <p className={style.closeIcon}>
                    <i
                        onClick={() => {
                            onDelete(id);
                        }}
                        className="bx bx-x"
                        style={{ color: '#000000' }}
                    ></i>
                </p>
            )}
        </div>
    );
}

Chip.propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    hideDeleteIcon: PropTypes.bool
};

export default Chip;
