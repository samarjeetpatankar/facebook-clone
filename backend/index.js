const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();

// Set the 'strictQuery' option to 'false' to suppress the Mongoose deprecation warning
mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());
const corsOptions = {
  origin: 'https://facebook-clone-three-pi.vercel.app', // Replace with the actual origin of your front-end application
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
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
