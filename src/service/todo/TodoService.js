const TMASTER_TODO_STORAGE_KEY = 'tmaster_todo_store_key';

/**
 * Creates a new todo and updates the todo list stored in localStorage.
 * @param {Object} todo - The todo object to be added.
 * @param {Array} prevTodoList - The previous todo list retrieved from localStorage.
 * @returns {Array} - The updated todo list.
 * @throws {Error} - If the todo object is not valid.
 */
function createNewTodo(todo, prevTodoList) {
    if (typeof todo !== 'object' || !Array.isArray(prevTodoList)) {
        // If the parameters are not of the expected types, return the previous todo list.
        return prevTodoList;
    }

    if (typeof todo.title !== 'string' || todo.title.trim() === '') {
        throw new Error('Title is not valid');
    }

    // Clone the previous todo list and add the new todo.
    const newTodoList = [...prevTodoList, todo];

    // Update the todo list stored in localStorage.
    localStorage.setItem(TMASTER_TODO_STORAGE_KEY, JSON.stringify(newTodoList));

    return newTodoList;
}

/**
 * Delete a todo and updates the todo list stored in localStorage.
 * @param {string} id - The todo id to be removed.
 * @param {Array} prevTodoList - The previous todo list retrieved from localStorage.
 * @returns {Array} - The updated todo list.
 * @throws {Error} - If the todo object is not valid.
 */
function removeTodo(id, prevTodoList) {
    if (!Array.isArray(prevTodoList)) {
        // If the parameters are not of the expected types, return the previous todo list.
        return prevTodoList;
    }

    if ('string' !== typeof id || '' === id.trim()) {
        throw new Error('Id is not valid');
    }

    // Clone the previous todo list and delete the new todo.
    const newTodoList = prevTodoList.filter((todo) => todo.id !== id);

    // Update the todo list stored in localStorage.
    localStorage.setItem(TMASTER_TODO_STORAGE_KEY, JSON.stringify(newTodoList));

    return newTodoList;
}

/**
 * Delete a todo and updates the todo list stored in localStorage.
 * @param {string} id - The todo id to be removed.
 * @param {Array} prevTodoList - The previous todo list retrieved from localStorage.
 * @returns {Array} - The updated todo list.
 * @throws {Error} - If the todo object is not valid.
 */
function updateTodo(newTodo, prevTodoList) {
    if (typeof newTodo !== 'object' && !Array.isArray(prevTodoList)) {
        // If the parameters are not of the expected types, return the previous todo list.
        return prevTodoList;
    }

    if ('string' !== typeof newTodo.id || '' === newTodo.id.trim()) {
        throw new Error('Id is not valid');
    }

    // Remove existing todo and add the new object.
    const newTodoList = [...removeTodo(newTodo.id, prevTodoList)];
    newTodoList.push(newTodo);

    // Update the todo list stored in localStorage.
    localStorage.setItem(TMASTER_TODO_STORAGE_KEY, JSON.stringify(newTodoList));

    return newTodoList;
}

function getTodoList() {
    const serializedData = localStorage.getItem(TMASTER_TODO_STORAGE_KEY);

    if (serializedData && '' !== serializedData) {
        const parsedTodos = JSON.parse(serializedData);
        if (Array.isArray(parsedTodos)) {
            return parsedTodos;
        }
    }
    return [];
}

const TodoService = { createNewTodo, getTodoList, removeTodo, updateTodo };
export default TodoService;
