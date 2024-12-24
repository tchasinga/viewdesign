import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import linksToMogoDbUrl from "./db/linksToMogoDbUrl.js";
import authRoutes from "./routes/auth.route.js";
import productsRoutes from "./routes/productsroutes.route.js";
import cartRoutes from "./routes/cart.route.js";

dotenv.config();
const PORT = process.env.PORT || 8000;

// initialize express and other port app
const app = express();




app.listen(PORT,()=> {
  linksToMogoDbUrl();
  console.log(`Server is running on port ${PORT}`);
});

// middleware
app.use(express.json());
app.use(cookieParser());

// initialize endpoinds apis
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", cartCouponsRoutes);


