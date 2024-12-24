import express from "express";
import { getAllProducts, getFeaturedProducts } from "../controllers/products.controllers.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

// initialize express and other port app
const router = express.Router();

router.get("/",protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.post("/createproductasadmin", protectRoute, adminRoute, createProduct);

// router.get("/:id", getProductById);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);


export default router;
