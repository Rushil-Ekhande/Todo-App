import User from "../models/UserModel.js";

export async function Resgister(req, res) {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password) {
            return res.json({
                success: false,
                message: "All fields are required"
            })    
        }else{
            const existingUser = await User.find({email});
            if(existingUser){
            const hashedPassword = await bcrypt.hash(password, 10);
            const userData = {
                username: username,
                email: email,
                password: hashedPassword
            }
            const user = new User(userData);
            const saveUser = await user.save();
            if(saveUser){
            return res.json({
                success: true,
                message: "User registered successfully"
            })}else{
                return res.json({
                    success: false,
                    message: "unable to register the User"
                })
            }
        }else{
            return res.json({
                success: false,
                message: "user already exists"
            })
        }
    }
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Server error in register api"
        })
    }
}

