import express from "express";
import dotenv from "dotenv";
import linksToMogoDbUrl from "./db/linksToMogoDbUrl.js";

dotenv.config();
const PORT = process.env.PORT || 8000;

// initialize express and other port app
const app = express();




app.listen(PORT,()=> {
  linksToMogoDbUrl();
  console.log(`Server is running on port ${PORT}`);
});

// middleware


