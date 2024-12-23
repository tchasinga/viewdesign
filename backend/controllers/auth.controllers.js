import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!email.includes("@")) {
        return res.status(400).json({ message: "Please add a valid email address" });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    try {
        
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const login = async (req, res) => {
    console.log("login controller");
}

export const logout = async (req, res) => {  
}
