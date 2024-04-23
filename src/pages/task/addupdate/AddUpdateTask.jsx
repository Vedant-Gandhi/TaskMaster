import Input from 'components/stateless/Input/Input';
import style from './AddUpdateTask.module.css';
import { useState } from 'react';
import TextField from 'components/stateless/TextField/TextField';
import Button from 'components/stateless/Button/Button';
import { useTodoContext } from 'src/context/todo/Todo';
import Error from 'components/stateless/Error/Error';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Chip from 'components/stateless/Chip/Chip';

function AddUpdateTask() {
    const todoCtx = useTodoContext();
    const { todoId } = useParams();
    const location = useLocation();

    const [form, setForm] = useState({
        title: '',
        description: '',
        tags: [],
        dueDate: ''
    });
    const [singleTag, setSingleTag] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onFormSubmit = (e) => {
        e.preventDefault();
        const formSnap = { ...form };

        const validateErr = validateTodo(formSnap);

        if (null !== validateErr) {
            setErrorMessage(validateErr.message);
            return;
        }

        if (todoId) {
            todoCtx.updateTodo(formSnap);
            return;
        }
        todoCtx.addTodo(formSnap);

        resetForm();
    };

    const validateTodo = (todo) => {
        if ('' === todo.title) {
            return {
                key: 'title',
                message: 'Title is not valid'
            };
        }

        return null;
    };

    const resetForm = () => {
        setForm({
            title: '',
            description: '',
            dueDate: '',
            tags: []
        });
        setErrorMessage('');
    };

    const addNewTag = () => {
        const tagCopy = [...form.tags];
        tagCopy.push(singleTag);

        const newForm = { ...form };
        newForm.tags = tagCopy;

        setForm(newForm);

        setSingleTag('');
    };

    useEffect(() => {
        // Get the todo data if the id is present.
        if (todoId) {
            const todo = todoCtx.todos.find((todo) => todo.id === todoId);
            if (todo) {
                setForm({ ...todo });
                setErrorMessage('');
            }
        }
    }, [todoId, todoCtx.todos, location.pathname]);

    useEffect(() => {
        // Reset the form on route change. If the todo is not reset and we click from update to add it can cause state issues.
        if (!todoId) {
            resetForm();
        }
    }, [location.key]);

    return (
        <section className={style.root}>
            <form className={style.form} onSubmit={onFormSubmit}>
                <div>
                    <h2 className={style.title}>
                        {' '}
                        {todoId ? `Update Todo - ${form.title}` : 'Create a new Todo'}
                    </h2>
                </div>
                <div className={style.formRow}>
                    <label>Title:</label>
                    <Input
                        placeholder="Buy Grocery else no food at home 🥕"
                        value={form.title}
                        onChange={(e) => {
                            setForm({ ...form, title: e.target.value });
                            setErrorMessage('');
                        }}
                    ></Input>
                </div>
                <div className={style.formRow}>
                    <label>Description:</label>
                    <TextField
                        value={form.description}
                        onChange={(e) => {
                            setForm({ ...form, description: e.target.value });
                            setErrorMessage('');
                        }}
                    ></TextField>
                </div>

                <div className={style.formRow}>
                    <label>Tags:</label>
                    <div className={style.extraWrapper}>
                        <div>
                            <Input
                                placeholder="Health"
                                value={singleTag}
                                onChange={(e) => {
                                    setSingleTag(e.target.value);
                                    setErrorMessage('');
                                }}
                            ></Input>
                            <div className={style.chipWrapper}>
                                {Array.isArray(form.tags) &&
                                    form.tags.map((tag) => {
                                        return <Chip key={tag} text={tag} id={tag}></Chip>;
                                    })}
                            </div>
                        </div>
                        <Button type="button" onClick={addNewTag}>
                            Add
                        </Button>
                    </div>
                </div>
                <div className={style.formRow}>
                    <label>Due Date:</label>
                    <Input
                        type="datetime-local"
                        value={form.dueDate}
                        onChange={(e) => {
                            setForm({ ...form, dueDate: e.target.value });
                            setErrorMessage('');
                        }}
                    ></Input>
                </div>
                <div className={style.formRow}>
                    <div></div>
                    <Error>{errorMessage} </Error>
                </div>
                <div className={style.formRow}>
                    <div></div>
                    <Button className={style.submitButton}>{todoId ? 'Update' : 'Create'}</Button>
                </div>
            </form>
        </section>
    );
}
export default AddUpdateTask;
