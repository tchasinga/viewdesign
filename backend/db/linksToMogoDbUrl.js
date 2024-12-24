import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

const linksToMogoDbUrl = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("💼 MongoDB is connected and ready for business!");
    } catch (error) {
        console.log("🚨 Alert: MongoDB connection attempt failed.", error.message);
    }
};

export default linksToMogoDbUrl