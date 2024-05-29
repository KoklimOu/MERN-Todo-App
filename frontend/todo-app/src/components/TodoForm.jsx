import { useState } from "react";

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
        <form className="form-todo" onSubmit={handleSubmit}>
            <input 
                className="todo-input" 
                type="text" 
                value={todoText} 
                onChange={handleChange} 
                placeholder="Enter your todo" 
            />
            <button className="todo-button" type="submit">+</button>
        </form>
    
    );
};

export default TodoForm;
