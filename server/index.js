const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const app = express();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.FrontPort || "http://localhost:3000", 
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/auth", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
