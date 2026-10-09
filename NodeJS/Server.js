
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import cors from "cors";
import { registerUser } from "./controller/MyController.js";
import mongoose from "mongoose";
import { createContact } from "./controller/ContactController.js";
const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();
router.post("/register" ,registerUser);
router.post("/createcontact",createContact);
app.use("/api",router);
const connectDB = async () => {
    try {
       await mongoose.connect("mongodb+srv://myclass:myclass@cluster0.vzxv6tl.mongodb.net/kamran?retryWrites=true&w=majority");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};
const startServer = async () => {
   await connectDB();
    app.listen(3000, () => {
        console.log(`Server is listening on port 3000`);
    });
};
startServer();