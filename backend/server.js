import express from "express";
import dotenv from "dotenv";
import linksToMogoDbUrl from "./db/linksToMogoDbUrl.js";
import authRoutes from "./routes/auth.route.js";

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

// initialize endpoinds apis
app.use("/api/auth", authRoutes);


