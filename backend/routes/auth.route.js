import express from "express";
import {
  login,
  logout,
  profile,
  refreshToken,
  signup,
} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, profile);

// exporting the router
export default router;
