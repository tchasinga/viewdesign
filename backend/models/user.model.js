import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
        default: "admin",
    }
},{timestamps: true});


userSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (error) {
        return false;
    }
};

// create a model using the schema
const User = mongoose.model("User", userSchema);
export default User;
