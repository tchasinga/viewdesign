import express from "express";
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProductByIdCategory, getRecommendedProducts, toggleFeaturedProduct } from "../controllers/products.controllers.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

// initialize express and other port app
const router = express.Router();

router.get("/",protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/recommended", getRecommendedProducts);
router.get("/category/:id", getProductByIdCategory);

router.post("/createproductasadmin", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);


// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);


export default router;
