const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");

const app = express();

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Internship");
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
    origin: ["http://localhost:3000"]
}));

app.use("/auth", userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
