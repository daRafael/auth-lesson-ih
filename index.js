require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const isAuthenticated = require("./middleware/jwt");

mongoose
  .connect("mongodb://localhost:27017/auth-demo")
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const protectedRoutes = require("./routes/protected.routes");
app.use("/protected", isAuthenticated, protectedRoutes);

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});