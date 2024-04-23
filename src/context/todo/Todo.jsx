import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import TodoService from 'src/service/todo/TodoService';
import utils from 'src/utils/utils';
import { TodoStatus } from 'src/data';

// Create a new context for todo list
const TodoContext = createContext();

// Custom hook to use the todo context
export const useTodoContext = () => useContext(TodoContext);

// TodoProvider component to wrap your application with
export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    // Function to add a new todo
    const addTodo = (todo) => {
        const currentDate = new Date();
        const newTodo = {
            ...todo,
            id: utils.generateUniqueId(),
            status: TodoStatus.PENDING,
            createdAt: currentDate.toISOString(),
            updatedAt: currentDate.toISOString()
        };
        const newTodos = TodoService.createNewTodo(newTodo, todos);
        setTodos([...newTodos]);
    };

    // Function to remove a todo
    const removeTodo = (id) => {
        const newTodoList = TodoService.removeTodo(id, todos);
        setTodos([...newTodoList]);
    };

    // Function to update a todo
    const updateTodo = (updatedTodo) => {
        const currentDate = new Date();
        updatedTodo = { ...updatedTodo, updatedAt: currentDate.toISOString() };
        const newTodoList = TodoService.updateTodo(updatedTodo, todos);
        setTodos([...newTodoList]);
    };

    useEffect(() => {
        const localData = TodoService.getTodoList();
        if (Array.isArray(localData)) setTodos([...localData]);
    }, []);

    return (
        <TodoContext.Provider value={{ todos, addTodo, removeTodo, updateTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

// Prop types validation for TodoProvider component
TodoProvider.propTypes = {
    children: PropTypes.node.isRequired
};
