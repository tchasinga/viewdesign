import Product from "../models/products.model.js";
import {redis} from "../db/redis.js";
import cloudinary from "../db/cloudinary.js";



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


export const createProduct = async (req, res) => {
    try {
		const { name, description, price, image, category } = req.body;

		let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
		}

		const product = await Product.create({
			name,
			description,
			price,
			image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
			category,
		});

		res.status(201).json(product);
	} catch (error) {
		console.log("Error in createProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}

}

export const deleteProduct = async (req, res) => {
    try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
}

export const getRecommendedProducts = async (req, res) => {}