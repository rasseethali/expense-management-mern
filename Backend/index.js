const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Root route for Render health check
app.get("/", (req, res) => {
  res.json("Backend is running");
});

app.use("/auth", require("./routes/auth"));
app.use("/expenses", require("./routes/expense"));
app.use("/admin", require("./routes/admin"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
