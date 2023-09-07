const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests only from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify the allowed HTTP methods
    credentials: true, // Allow cookies to be sent with the request
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Define a home route
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}..`);
});
