import Product from "../models/products.model.js";
import {redis} from "../db/redis.js";



export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ });
        res.json(products);

        if (products.length === 0) {
            res.status(404).json({ message: "No products found" });
        }

        if (products.length > 0) {
            res.status(200).json({ message: "Products found", products });
        }
    } catch (error) {
        console.log("Error in getAllProducts controller", error.message);
        res.status(500).json({ 
            message: error.message,
            error: error.message,
            success : false
        });
    }
}

export const getFeaturedProducts = async (req, res) => {
    try {

        let featuredProducts = await redis.get("featured_products");
		if (featuredProducts) {
			return res.json(JSON.parse(featuredProducts));
		}

        const products = await Product.find({ isFeatured: true }).lean();
        res.status(200).json({ message: "Featured products found", products });
        res.json(products);

        if (products.length === 0) {
            res.status(404).json({ message: "No featured products found" });
        }

        if (products.length > 0) {
            res.status(200).json({ message: "Featured products found", products });
        }

        if(!featuredProducts){
            res.status(404).json({ message: "No featured products found" });
        }

        // store in redis for future quick access

		await redis.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("Error in getFeaturedProducts controller", error.message);
        res.status(500).json({ 
            message: error.message,
            error: error.message,
            success : false
        });
    }
}