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
        default: "customer",
    }
},{timestamps: true});


// hash the password before saving it to the database
userSchema.pre("save", async function (next) {
    if (this.isModified("password"))return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

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
