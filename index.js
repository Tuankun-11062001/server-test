const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/connect");
const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoute");
const ideaRouter = require("./routes/ideaRoute");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

connectDB.connection();

app.use("/", userRouter);
app.use("/posts", postRouter);
app.use("/ideas", ideaRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log("running");
});
