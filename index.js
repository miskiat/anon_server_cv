const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

const { dbUri, port } = require("./config");
const apiRoutes = require("./components/componentRoutes");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "5kb", extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect(dbUri, (err) => {
  if (err) console.error("DB Connection failed");
});

app.use("/v1", apiRoutes);

app.get("*", (_req, res) => {
  res.json({
    message: "Server is working 🚀",
  });
});

app.listen(port, () => {
  console.log("Server is up on http://localhost:4040");
});
