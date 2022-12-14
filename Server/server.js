require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
// const bodyParser = require("body-parser");

const connection = require("./DB");

//import routers by creating constant variables
const userRouter = require("./Routes/userRoutes");
const purchaseRouter = require("./Routes/purchaseRoutes");
const siteRouter = require("./Routes/siteRoutes");
const supplierRouter = require("./Routes/supplierRoutes");
const orderRouter = require("./Routes/orderRoutes");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// routes
app.use("/api/user", userRouter);
app.use("/api/purchase", purchaseRouter);
app.use("/api/site", siteRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || 3001;

app.listen(port, (err) => {
  if (err) console.log("Error ocuured in starting the server:", err);
  console.log(`DevX Server is listening on port ${port}...`);
});
