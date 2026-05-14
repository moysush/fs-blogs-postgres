require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");

const app = express();
app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL);

const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
  },
);
Blog.sync();

app.get("/ping", (req, res) => {
  res.json("pong");
});

app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    console.log("fetched", JSON.stringify(blogs, null, 2));
    res.json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    console.log(blog.toJSON());
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

app.post("/api/blogs", async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body });
    console.log(blog.toJSON());
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    await blog.destroy();
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server available on http://localhost:${PORT}`);
});
