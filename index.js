const express = require("express");
const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const blogsRouter = require("./controllers/blogs");

app.use(express.json());

app.get("/ping", (req, res) => {
  res.json("pong");
});

app.use("/api/blogs", blogsRouter);

const start = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server available on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("something went wrong", err);
  }
};

start();
