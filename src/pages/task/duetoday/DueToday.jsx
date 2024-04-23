import { useTodoContext } from 'src/context/todo/Todo';
import { useMemo } from 'react';
import utils from 'src/utils/utils';
import { TodoStatus } from 'src/data';
import TodoDisplay from 'components/stateless/TodoDisplay/TodoDisplay';
import style from './DueToday.module.css';
import { useNavigate } from 'react-router-dom';

function DueToday() {
    const todoCtx = useTodoContext();
    const navigate = useNavigate();

    const todos = useMemo(() => {
        return GetDueTodayList(todoCtx.todos);
    }, [todoCtx.todos]);

    const onTodoDelete = (id) => {
        todoCtx.removeTodo(id);
    };

    const onCardClick = (id) => {
        navigate('/task/' + id, {
            preventScrollReset: false
        });
    };

    const onTodoComplete = (id) => {
        const myTodo = todoCtx.todos.find((todo) => todo.id === id);

        if (myTodo) {
            const updatedTodo = { ...myTodo, status: TodoStatus.COMPLETED };
            todoCtx.updateTodo(updatedTodo);
        }
    };

    return (
        <section className={style.rootContainer}>
            <h1>Due Today</h1>
            <h2> Total Tasks - {todos?.length}</h2>
            <TodoDisplay
                onClick={onCardClick}
                todos={todos}
                onDelete={onTodoDelete}
                onComplete={onTodoComplete}
            ></TodoDisplay>
        </section>
    );
}

export default DueToday;

function GetDueTodayList(todos) {
    const sortedTodos = todos.filter((todo) => {
        const todayDate = new Date();
        todayDate.setUTCHours(23, 59, 59, 999);
        if (todo.dueDate) {
            const differenceDate = utils.getDateDifference(new Date(todo.dueDate), todayDate);

            // Since the function returns 1 if date b is greater than date we check if return is actually 0;
            return 1 === differenceDate;
        }

        return false;
    });
    return sortedTodos;
}
