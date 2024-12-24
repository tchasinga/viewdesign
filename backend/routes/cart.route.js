import express from "express";
import { addToCart, getCart, removeAllFromCart } from "../controllers/cart.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// route to add to cart
router.post("/add", protectRoute, addToCart);
router.get("/get", protectRoute, getCart);
router.delete("/remove", protectRoute, removeAllFromCart);


// exporting the router
export default router;