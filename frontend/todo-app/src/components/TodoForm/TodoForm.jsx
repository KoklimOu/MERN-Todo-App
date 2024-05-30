import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TodoForm.module.css'; 

const TodoForm = ({ addTodo }) => {
    const [todoText, setTodoText] = useState('');

    const handleChange = (e) => {
        setTodoText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todoText.trim()) return; 
        addTodo(todoText);
        setTodoText(''); 
    };

    return (
        <form className={styles.formTodo} onSubmit={handleSubmit}> 
            <input 
                className={styles.todoInput} 
                type="text" 
                value={todoText} 
                onChange={handleChange} 
                placeholder="Enter your todo" 
            />
            <button className={styles.addTodoButton} type="submit">+</button> 
        </form>
    );
};

TodoForm.propTypes = {
    addTodo: PropTypes.func.isRequired
};

export default TodoForm;
