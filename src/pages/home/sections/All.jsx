import { useTodoContext } from 'src/context/todo/Todo';
import { useMemo } from 'react';
import utils from 'src/utils/utils';
import { TodoStatus } from 'src/data';
import TodoDisplay from 'components/stateless/TodoDisplay/TodoDisplay';
import { useNavigate } from 'react-router-dom';
function All() {
    const todoCtx = useTodoContext();
    const navigate = useNavigate();

    const todos = useMemo(() => {
        return SortTodosByUpdatedAt(todoCtx.todos);
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
        <TodoDisplay
            todos={todos}
            onDelete={onTodoDelete}
            onComplete={onTodoComplete}
            onClick={onCardClick}
        ></TodoDisplay>
    );
}

export default All;

function SortTodosByUpdatedAt(todos) {
    const sortedTodos = todos.sort((a, b) => {
        return utils.getDateDifference(new Date(a.updatedAt), new Date(b.updatedAt));
    });
    return sortedTodos;
}
