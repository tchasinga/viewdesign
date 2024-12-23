import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { redis } from "../db/redis.js";




const generateToken = async (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET_REFRESH, {
        expiresIn: "7d",
    });
    return { accessToken, refreshToken };
}

const storeRefreshToken = async (userId, refreshToken) => {
    await redis.set(`refreshToken:${userId}`, refreshToken);
}

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
      
        // authenticate the user
        const {accessToken, refreshToken} = await generateToken(user._id);

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create a new user
        const user = User.create({ name, email, password : hashedPassword });
        res.status(201).json({ message: "User created successfully", user :{
            _id: user._id,
            name: user.name,
            email: user.email,
        } });

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const login = async (req, res) => {
    console.log("login controller");
}

export const logout = async (req, res) => {  
}
