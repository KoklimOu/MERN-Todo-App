const Todo = require('../models/todo.model');
const apiResponse = require('../utils/responseHelpers');

exports.getTodos = async (_, res) => {
    try {
        const todos = await Todo.find();
        apiResponse(res, 200, 'Success', todos);
    } catch (err) {
        apiResponse(res, 500, err.message);
    }
};

exports.createTodo = async (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });
    try {
        const newTodo = await todo.save();
        apiResponse(res, 201, 'Todo created successfully', newTodo);
    } catch (err) {
        apiResponse(res, 400, err.message);
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndUpdate(id, req.body);
        if (!todo) {
            return apiResponse(res, 404, 'Todo not found');
        }

        const updatedTodo = await Todo.findById(id);
        apiResponse(res, 200, 'Todo updated successfully', updatedTodo);
    } catch (err) {
        apiResponse(res, 400, err.message);
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return apiResponse(res, 404, 'Todo not found');
        }
        apiResponse(res, 200, 'Todo deleted successfully');
    } catch (err) {
        apiResponse(res, 500, err.message);
    }
};
