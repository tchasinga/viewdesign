import express from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import cors from "cors";

import linksToMogoDbUrl from "./db/linksToMogoDbUrl.js";
import authRoutes from "./routes/auth.route.js";
import productsRoutes from "./routes/productsroutes.route.js";
import cartRoutes from "./routes/cart.route.js";
import cartCouponsRoutes from "./routes/cartcoupons.route.js";

import payementRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

dotenv.config();
const PORT = process.env.PORT || 8000;

// initialize express and other port app
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: "*", // or list specific headers if needed
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
  })
);


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
app.use("/api/payment", payementRoutes);
app.use("/api/analytics", analyticsRoutes);

