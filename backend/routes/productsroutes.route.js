import express from "express";
import { getAllProducts } from "../controllers/products.controllers";

// initialize express and other port app
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


export default router;
