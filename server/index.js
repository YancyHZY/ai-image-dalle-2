import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
// allows us to pull env variables from dotenv file
dotenv.config();

// initilize express application, by call it as a function
const app = express();
// add addition middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// create api endpoints that we can hook on to from front end side
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

// first api route
app.get("/", async (req, res) => {
  res.send("Hello from DALL-E");
});

// A way to run above basic express setup
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("server has started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

// call startServer fn
startServer();
