const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();

mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());
const corsOptions = {
  origin: 'https://facebook-hptu.onrender.com', 
  optionsSuccessStatus: 200, 
}; 

app.use(cors(corsOptions));
app.use( 
  fileUpload({
    useTempFiles: true,
  })
);

// Routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

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
