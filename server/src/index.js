const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const middlewares = require("./middlewares");
const logs = require("./api/logs");

if (process.env.NODE_ENV !== "PRODUCTION") require("dotenv").config();

const app = express();
/* eslint-disable no-undef */
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 1337;
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(cors({
//   origin: process.env.CORS_ORIGIN,
// }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "Hello World" });
});
app.use("/api/logs", logs);

// app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../client/build/index.html"));
  });
}

app.listen(port, () => {
  console.log(`Listening to ${port}!`);
});
