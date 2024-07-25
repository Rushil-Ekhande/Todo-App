import './config.js'
import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: 'http://127.0.0.1:5500', // Replace with your frontend origin
    credentials: true, // Allow cookies to be sent and received
  }));
app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGODB_ATLAS_CONNECTION_STRING)

    .then(() => {
        console.log("Mongodb Atlas connected");
        app.listen(PORT, () => {
            console.log("App is listening on port", PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    });


import TodoCreateRoute from "./routes/todoCreateRoute.js"
import AuthenticationRoutes from "./routes/authenticationRoute.js"

app.use('/create-todo', TodoCreateRoute);
app.use('/user', AuthenticationRoutes);


