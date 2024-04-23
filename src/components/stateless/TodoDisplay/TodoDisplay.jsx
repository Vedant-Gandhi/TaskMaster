import PropTypes from 'prop-types';
import style from './TodoDisplay.module.css';
import TodoCard from '../TodoCard/TodoCard';

/**
 * TodoDisplay component displays a list of todos.
 * @param {object} props
 * @param {Array} props.todos - An array of todo objects.
 * @param {(id:string)=>void} [props.onDelete] - Function to handle todo deletion.
 * @param {(id:string)=>void} [props.onComplete] - Function to handle todo completion.
 * @param {(id:string)=>void} [props.onClick] - Function to handle todo click.
 * @returns {JSX.Element} - The TodoDisplay component.
 */
function TodoDisplay({ todos, onDelete, onComplete, onClick }) {
    return (
        <section className={style.rootContainer}>
            {todos.map((todo) => {
                return (
                    <TodoCard
                        key={todo.id}
                        data={todo}
                        onDeleteClick={onDelete}
                        onCompleteClick={onComplete}
                        onClick={onClick}
                    ></TodoCard>
                );
            })}
        </section>
    );
}

TodoDisplay.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string,
            description: PropTypes.string
        })
    ).isRequired,
    onDelete: PropTypes.func,
    onComplete: PropTypes.func,
    onClick: PropTypes.func
};

export default TodoDisplay;
