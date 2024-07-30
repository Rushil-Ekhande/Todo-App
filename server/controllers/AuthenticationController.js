import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function Resgister(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.json({
                success: false,
                message: "All fields are required"
            })
        } else {
            const existingUser = await User.find({ email });
            if (existingUser) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const userData = {
                    username: username,
                    email: email,
                    password: hashedPassword
                }
                const user = new User(userData);
                const saveUser = await user.save();
                if (saveUser) {
                    return res.json({
                        success: true,
                        message: "User registered successfully"
                    })
                } else {
                    return res.json({
                        success: false,
                        message: "unable to register the User"
                    })
                }
            } else {
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

export async function Login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                success: false,
                message: "All fields are required"
            })
        } else {
            const user = await User.findOne({ email }).populate('todos');
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (isPasswordCorrect) {
                const userData = {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    todos: user.todos
                }
                jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        console.log(err);
                    }
                    res.cookie('authToken', token, {
                        maxAge: 1 * 60 * 60 * 1000, // 24 hrs
                        // httpOnly: true, // Optional: makes the cookie inaccessible to JavaScript's Document.cookie API
                        secure: true, // Set to true if using HTTPS
                        sameSite: 'None', // Adjust as needed ('Strict', 'Lax', 'None')
                    });
                    res.json({
                        success: true,
                        message: 'Login successful'
                    });
                });

            } else {
                res.json({
                    success: false,
                    message: "Incorrect password"
                })
            }
        }
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Server error in login api"
        });
    }
}