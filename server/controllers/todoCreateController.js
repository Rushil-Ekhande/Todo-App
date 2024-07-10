import Todo from "../models/TodoModel.js";

export async function todoCreateController(req, res) {
    try {
        const {title, content} = req.body;

        if(title == null || content == null){
            return res.json({
                success: false,
                message: "All fields must be filled"
            })
        }else{
        console.log(title, content);

        const data = {
            title: title,
            content: content
        }

        const newTodo = new Todo(data);

        const saveNewTodo = await newTodo.save();

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