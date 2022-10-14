const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const registerRoute = require("./routes/register");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const commentRouter = require("./routes/commentRouter");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//! Routes
app.use("/api/auth", registerRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use('/api/comments', commentRouter);

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
