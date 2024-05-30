import { useEffect, useState } from 'react';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../../services/todoService';
import TodoForm from '../TodoForm/TodoForm';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const apiResponse = await getTodos();
            if (apiResponse.data) setTodos([...apiResponse.data].reverse());
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    const postTodo = async (text) => {
        try {
            const newTodo = { text: text, completed: false };
            const apiResponse = await createTodo(newTodo);
            setTodos(prevTodos => [apiResponse.data, ...prevTodos]);
        } catch (error) {
            console.error('Error creating todo:', error.message);
        }
    }

    const toggleComplete = async (id) => {
        try {
            const todo = todos.find((todo) => todo._id === id);
            const updatedTodo = { ...todo, completed: !todo.completed };
            const apiResponse = await updateTodo(id, updatedTodo);
            setTodos(todos.map((todo) => (todo._id === id ? apiResponse.data : todo)));
        } catch (error) {
            console.error('Error toggling complete status:', error.message);
        }
    };

    const deleteTodoById = async (id) => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error.message);
        }
    };

    const updateTextTodo = async (id, newText) => {
        try {
            const todo = todos.find((todo) => todo._id === id);
            const updatedTodo = { ...todo, text: newText };
            const apiResponse = await updateTodo(id, updatedTodo);
            setTodos(todos.map((todo) => (todo._id === id ? apiResponse.data : todo)));
        } catch (error) {
            console.error('Error updating todo text:', error.message);
        }
    };

    return (
        <div className={styles.todoListContainer}>
            <h1 className={styles.title}>Todo List</h1>
            <div className={styles.todoListContent}>
                <TodoForm addTodo={postTodo} />
                <ul>
                    {todos.length > 0 ? (
                        todos.map((todo) => (
                            <Todo
                                key={todo._id}
                                todo={todo}
                                toggleComplete={toggleComplete}
                                deleteTodo={deleteTodoById}
                                updateTodoText={updateTextTodo}
                            />
                        ))
                    ) : (
                        <li>No todos available</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;
