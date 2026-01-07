const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/expense", require("./routes/expense"));
app.use("/admin", require("./routes/admin"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
