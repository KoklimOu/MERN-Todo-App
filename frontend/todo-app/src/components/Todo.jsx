import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';



const Todo = ({ todo, toggleComplete, deleteTodo, updateTextTodo }) => {
    const [isUpdateTodoText, setIsUpdateTodoText] = useState(false);
    const [updatedText, setUpdatedText] = useState(todo.text);

    const handleTextChange = (event) => {
        setUpdatedText(event.target.value);
    };

    const handleUpdate = () => {
        updateTextTodo(todo._id, updatedText);
        setIsUpdateTodoText(false);
    };

    const toggleUpdateTodoText = () => {
        setIsUpdateTodoText((prev) => !prev);
    };

    return (
        <li>
            <div className="check-todo">
                <input
                    className="check-box"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo._id)}
                />
                <input
                    className="text"
                    type="text"
                    disabled={!isUpdateTodoText}
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                    value={updatedText}
                    onChange={handleTextChange}
                />
            </div>
            <div className="action-todo">
                {isUpdateTodoText ? (
                    <FontAwesomeIcon className="action-icon" icon={faSave} onClick={handleUpdate}></FontAwesomeIcon>
                ) : (
                    <FontAwesomeIcon className="action-icon" icon={faEdit} onClick={toggleUpdateTodoText}></FontAwesomeIcon>
                )}
                <FontAwesomeIcon className="action-icon" icon={faTrash} onClick={() => deleteTodo(todo._id)}></FontAwesomeIcon>
            </div>
        </li>
    );
};

export default Todo;
