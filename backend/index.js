const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();

mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());

app.use( 
  fileUpload({
    useTempFiles: true,
  })
);  

// Routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

app.get("/", (req, res) => {
  res.send("Welcome to the home page of your application!");
});

// Database connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}..`);
});
