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

//public routes can be access by any one
app.use("/frontendHotel", require("./routes/frontendRoute/hotelDataRoute"));
app.use("/frontendRestaurant", require("./routes/frontendRoute/itemDataRoute"));

//protected with middleware verifyOwner for owner side
app.use("/hotel", require("./routes/hotelRoute"));
app.use("/upload", require("./routes/uploadRoute"));
app.use("/item", require("./routes/itemRoute"));

//for authentication
app.use("/auth", require("./routes/authRoute"));

mongoose.connection.once("open", () => {
  console.log("connected to DB");
  app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
