const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Applied = require("../models/RegisterOpport");

router.post("/signup", async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();
        console.log(newUser);

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRATION_HOUR });
        res.cookie("token", token);
        return res.status(201).json({ message: "User Created Successfully", token });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist with this email" });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Wrong Password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRATION_HOUR });
        res.cookie("token", token);
        return res.status(200).json({ message: "User Successfully Logged in", token });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
});

router.post("/apply", auth, async (req, res) => {
    try {
        const { oppo } = req.body;
        const newApplication = new Applied({
            userid: req.user.id,
            id: oppo.id,
            profile_name: oppo.pname,
            stipend: oppo.stipend,
            company_name: oppo.cname,
            duration: oppo.duration
        });

        await newApplication.save();
        return res.status(200).json({ message: "Applied successfully", status: true });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
});

router.get("/alreadyapplied", auth, async (req, res) => {
    try {
        const appliedList = await Applied.find({ userid: req.user.id });
        return res.status(200).json(appliedList);
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err });
    }
});

router.get("/verify", auth, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Authentication failed", status: false });
        }
        return res.status(200).json({ message: "Authentication successful", status: true });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", status: false, error: err });
    }
});

router.get("/logout", auth, (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Successfully logged out" });
});

module.exports = router;
