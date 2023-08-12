require("express-async-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/config");
require("dotenv").config();
const connectDB = require("./config/dbConn");

const app = express();
const PORT = config.port;

connectDB();

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(cookieParser());

//protected with middleware verifyJWT for owner side
app.use("/hotel", require("./routes/hotelRoute"));
app.use("/upload", require("./routes/uploadRoute"));

//for authentication
app.use("/auth", require("./routes/authRoute"));

mongoose.connection.once("open", () => {
  console.log("connected to DB");
  app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
