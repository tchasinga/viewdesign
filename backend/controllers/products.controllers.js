import Product from "../models/products.model.js";




export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
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
