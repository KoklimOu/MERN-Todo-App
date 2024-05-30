const Todo = require('../models/todo.model');
const { HTTP_STATUS } = require('../utils/http.status');
const apiResponse = require('../utils/response.helpers');

exports.getTodos = async (_, res) => {
    try {
        const todos = await Todo.find();
        apiResponse(res, HTTP_STATUS.OK, 'Success', todos);
    } catch (err) {
        apiResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, err.message);
    }
};

exports.createTodo = async (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });
    try {
        const newTodo = await todo.save();
        apiResponse(res, HTTP_STATUS.CREATED, 'Todo created successfully', newTodo);
    } catch (err) {
        apiResponse(res, HTTP_STATUS.BAD_REQUEST, err.message);
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndUpdate(id, req.body);
        if (!todo) {
            return apiResponse(res, HTTP_STATUS.NOT_FOUND, 'Todo not found');
        }

        const updatedTodo = await Todo.findById(id);
        apiResponse(res, HTTP_STATUS.OK, 'Todo updated successfully', updatedTodo);
    } catch (err) {
        apiResponse(res, HTTP_STATUS.BAD_REQUEST, err.message);
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return apiResponse(res, HTTP_STATUS.NOT_FOUND, 'Todo not found');
        }
        apiResponse(res, HTTP_STATUS.OK, 'Todo deleted successfully');
    } catch (err) {
        apiResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, err.message);
    }
};
