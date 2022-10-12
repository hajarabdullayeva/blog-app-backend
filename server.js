const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
//! Routes
const newsRouter = require("./routes/newsRouter");
const commentsRouter = require("./routes/commentRouter");

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/news", newsRouter);
app.use("/comments", commentsRouter);

app.use((req, res) => {
  res.json({
    success: false,
    message: `${req.originalUrl} does not exist`,
  });
});

//! Start application
const DB = process.env.DB_STRING.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(DB, (err) => {
  if (err) return console.log(err);

  console.log("MongoDb connected");
  const PORT = process.env.PORT;
  app.listen(PORT, () =>
    console.log(`Server in up and running in PORT: ${PORT}`)
  );
});
