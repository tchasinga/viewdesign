import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();


// exporting the router
export default router;