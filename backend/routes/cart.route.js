import express from "express";
import { addToCart, getCartProduct, removeAllFromCart, updateQuantity } from "../controllers/cart.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// route to add to cart
router.post("/add", protectRoute, addToCart);
router.get("/get", protectRoute, getCartProduct);
router.delete("/remove", protectRoute, removeAllFromCart);
router.put("/:id", protectRoute, updateQuantity);


// exporting the router
export default router;