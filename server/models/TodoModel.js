import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;