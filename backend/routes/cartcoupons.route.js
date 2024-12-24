import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getCoupon } from "../controllers/coupon.controllers.js";

const router = express.Router();

router.get("/", protectRoute, getCoupon)
router.post("/validate", protectRoute, validateCoupon)


// exporting the router
export default router;