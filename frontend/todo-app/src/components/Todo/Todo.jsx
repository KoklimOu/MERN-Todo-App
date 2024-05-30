import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './Todo.module.css';

const Todo = ({ todo, toggleComplete, deleteTodo, updateTodoText }) => {
    const [isUpdateTodoText, setIsUpdateTodoText] = useState(false);
    const [updatedText, setUpdatedText] = useState(todo.text);

    const handleTextChange = (event) => {
        setUpdatedText(event.target.value);
    };

    const handleUpdate = () => {
        updateTodoText(todo._id, updatedText);
        setIsUpdateTodoText(false);
    };

    const toggleUpdateTodoText = () => {
        setIsUpdateTodoText((prev) => !prev);
    };

    return (
        <li>
            <div className={styles.checkTodo}>
                <input
                    className={styles.checkBox}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo._id)}
                />
                <input
                    className={styles.text}
                    type="text"
                    disabled={!isUpdateTodoText}
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                    value={updatedText}
                    onChange={handleTextChange}
                />
            </div>
            <div className={styles.actionTodo}>
                {isUpdateTodoText ? (
                    <FontAwesomeIcon className={styles.actionIcon} icon={faSave} onClick={handleUpdate}/>
                ) : (
                    <FontAwesomeIcon className={styles.actionIcon} icon={faEdit} onClick={toggleUpdateTodoText}/>
                )}
                <FontAwesomeIcon className={styles.actionIcon} icon={faTrash} onClick={() => deleteTodo(todo._id)}/>
            </div>
        </li>
    );
};

Todo.propTypes = {
    todo: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    toggleComplete: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    updateTodoText: PropTypes.func.isRequired,
};

export default Todo;
