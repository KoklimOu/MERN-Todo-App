const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema(
    {
        text: { type: String, require: true },
        completed: { type: Boolean, default: false }
    }
);

module.exports = mongoose.model('Todo', TodoSchema);