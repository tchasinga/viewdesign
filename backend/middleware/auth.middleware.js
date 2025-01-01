import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
	try {
		const accessToken = req.cookies.accessToken;

		if (!accessToken) {
			return res.status(401).json({ message: "Unauthorized - No access token provided" });
		}

		try {
			const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
			const user = await User.findById(decoded.userId).select("-password");

			if (!user) {
				return res.status(401).json({ message: "User not found" });
			}

			req.user = user;

			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				return res.status(401).json({ message: "Unauthorized - Access token expired" });
			}
			throw error;
		}
	} catch (error) {
		console.log("Error in protectRoute middleware", error.message);
		return res.status(401).json({ message: "Unauthorized - Invalid access token" });
	}
};

export const adminRoute = (req, res, next) => {
	try {
        if (req.user && req.user.role === "admin") {
            res.status(200).json({ message: "Admin route accessed successfully" });
            next();
        }

        if (req.user && req.user.role === "customer") {
            res.status(401).json({ message: "Unauthorized - Customers cannot access this route" });
        }

        if (!req.user) {
            res.status(401).json({ message: "Unauthorized - No user found" });
        }
    } catch (error) {
        console.log("Error in adminRoute middleware", error.message);
        res.status(401).json({ message: "Unauthorized - Invalid user" });
    }
};