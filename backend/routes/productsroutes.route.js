import express from "express";
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts } from "../controllers/products.controllers.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

// initialize express and other port app
const router = express.Router();

router.get("/",protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/recommended",protectRoute, getRecommendedProducts);

// I'll add the free vesion of get recommended products later

router.post("/createproductasadmin", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

// router.get("/:id", getProductById);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);


export default router;
