const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

// routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

// database
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.log("Error:", err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

