
import mongoose from "mongoose";


const cartcouponsSchema = new mongoose.Schema({
    couponCode:{
        type:String,
        required:true,
        unique:true
    },
    discount:{
        type:Number,
        required:true
    },
    expiryDate:{
        type:Date,
        required:true
    }

},{timestamps: true});

const Cartcoupons = mongoose.model("Cartcoupons", cartcouponsSchema);
export default Cartcoupons;