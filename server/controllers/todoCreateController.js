import Todo from "../models/TodoModel.js";
import User from "../models/UserModel.js";

export async function todoCreateController(req, res) {
    try {
        const {title, content} = req.body;
        const user = req.user;

        if(title == null || content == null){
            return res.json({
                success: false,
                message: "All fields must be filled"
            })
        }else{
        // console.log(title, content);

        const data = {
            title: title,
            content: content
        }

        const newTodo = new Todo(data);

        const saveNewTodo = await newTodo.save();

        const userModel = await User.findByIdAndUpdate(user.id, 
            { $push: { todos: saveNewTodo._id } },
        );
        await userModel.save();
        if(saveNewTodo){
            return res.json({
                success: true,
                message: "New Todo Created"
            })
        }
    }
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Server error in Create todo Api"
        })
    }
}