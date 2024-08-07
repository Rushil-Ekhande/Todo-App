import Todo from "../models/TodoModel.js";
import User from "../models/UserModel.js";

export default async function deleteTodo(req, res){
    try {
        const {id} = req.user;
        console.log(id);
        
        const {todoId} = req.params;
        const user = await User.findByIdAndUpdate(id,
            {
                $pull: {todos: {_id: todoId}}
            }
        );
        if(!user){
            return res.json({
                success: false,
                message: "Todo or User not found"
            })
        }
        const todo = await Todo.findByIdAndDelete(todoId);
        if(!todo){
            return res.json({
                success: false,
                message: "Todo not found"
            })
        }
        res.json({
            success: true,
            message: "Todo deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Server Error on api delete"
        })
    }
}