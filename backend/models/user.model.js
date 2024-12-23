import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Please add a valid email address"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        trim: true,

    },
    cartItems:[{
        quantity:{
            type:Number,
            default:1
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    }],
    role: {
        type: String,
        required: true,
        enum: ["admin", "customer"],
        default: "customer",
    }
},{timestamps: true});

// create a model using the schema
const User = mongoose.model("User", userSchema);
export default User;
