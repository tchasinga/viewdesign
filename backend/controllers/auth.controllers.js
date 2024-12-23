import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const signup = async (req, res) => {
    console.log("signup controller");
}

export const login = async (req, res) => {
    console.log("login controller");
}

export const logout = async (req, res) => {
    console.log("logout controller");
    res.send("logout controller");
}

