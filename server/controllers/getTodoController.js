import User from "../models/UserModel.js"

export async function getTodoController(req, res) {
    try {
        const user = req.user;
        if(!user){
            return res.json({
                success: false,
                message: "No token found"
            })
        }
        const getUser = await User.findById(user.id).populate('todos');
        return res.json({
            success: true,
            user: getUser,
            message: "Got users"
        });
        
    } catch (error) {
        return res.json({
            success: false,
            message: "Server error in get-todo Api"
        })
    }
}