import './config.js'
import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
const app = express();
const PORT = process.env.PORT;

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

app.use(cors());
app.use(express.json());

import TodoCreateRoute from "./routes/todoCreateRoute.js"

app.use('/create-todo', TodoCreateRoute);


