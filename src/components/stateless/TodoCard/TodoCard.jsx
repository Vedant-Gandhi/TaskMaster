import PropTypes from 'prop-types';
import utils from 'src/utils/utils';
import style from './TodoCard.module.css';
import { useMemo } from 'react';
import Chip from 'components/stateless/Chip/Chip';
import { TodoStatus } from 'src/data';

/**
 * Helper function to get the color for the todo card status.
 * @param {string} status - The status of the todo item.
 * @returns {string} - The color code.
 */
function getTodoCardStatusColor(status) {
    switch (status) {
        case TodoStatus.COMPLETED:
            return '#68D391';
        default:
            return '#a09d9d';
    }
}

/**
 * TodoCard component represents a card displaying details of a todo item.
 * @param {object} props - The props needed by the component.
 * @param {object} props.data - The todo item containing all the fields.
 * @param {Function} [props.onClick] - The callback invoked when the card is clicked.
 * @param {(id:string)=>void} [props.onCompleteClick] - The callback invoked when Complete button is clicked
 * @param {(id:string)=>void} [props.onDeleteClick] - The callback invoked when Delete button is clicked
 * @returns {JSX.Element} - The TodoCard component.
 */
function TodoCard({ data = {}, onClick, onCompleteClick, onDeleteClick }) {
    const humanReadableDueDate = useMemo(
        () =>
            'string' === typeof data.dueDate && '' !== data.dueDate.trim()
                ? utils.getHumanReadableTime(new Date(data.dueDate))
                : '',
        [data]
    );

    const todoCardStatusColor = getTodoCardStatusColor(data.status);

    // Holds if the todo has been expired or not.
    const isExpired = data.dueDate
        ? data.status !== TodoStatus.COMPLETED &&
          utils.getDateDifference(new Date(), new Date(data.dueDate)) === -1
        : false;

    return (
        <article
            className={style.card}
            onClick={() => {
                if ('function' === typeof onClick) {
                    onClick(data.id);
                }
            }}
        >
            <div className={style.actionIconContainer}>
                <i
                    className={`bx bx-check ${style.actionIcon} ${style.okIcon}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if ('function' === typeof onCompleteClick) {
                            onCompleteClick(data.id);
                        }
                    }}
                ></i>
                <i
                    className={`bx bx-trash-alt ${style.actionIcon} ${style.deleteIcon}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if ('function' === typeof onDeleteClick) {
                            onDeleteClick(data.id);
                        }
                    }}
                ></i>
                <p className={` ${style.status}`}>
                    {isExpired && (
                        <i
                            className="bx bxs-skull bx-tada"
                            style={{ color: '#ff4d4d', fontSize: '1.5rem' }}
                        ></i>
                    )}
                    <p
                        className={style.statusDenoter}
                        style={{ backgroundColor: todoCardStatusColor }}
                    ></p>
                    {data.status ?? 'Pending'}
                </p>
            </div>
            <div>
                <h3 className={style.cardTitle} aria-label="Task Name">
                    {data.title}
                </h3>
                <p className={style.dueDate}>
                    <>
                        <i className={`bx bx-alarm ${style.alarmClock}`}></i>
                        Due -&nbsp;
                        {humanReadableDueDate ? humanReadableDueDate : 'Infinite'}
                    </>
                </p>
            </div>
            {Array.isArray(data.tags) && (
                <div className={style.tagWrapper}>
                    {data.tags.map((tag) => {
                        if ('string' === typeof tag) {
                            return <Chip text={tag} key={tag} id={tag} hideDeleteIcon></Chip>;
                        }
                    })}
                </div>
            )}
        </article>
    );
}

TodoCard.propTypes = {
    onClick: PropTypes.func,
    onCompleteClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    data: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                text: PropTypes.string.isRequired,
                id: PropTypes.string.isRequired
            })
        ),
        dueDate: PropTypes.instanceOf(Date),
        status: PropTypes.string.isRequired
    }).isRequired
};

export default TodoCard;
