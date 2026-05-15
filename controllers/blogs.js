const router = require("express").Router();
const { Blog } = require("../models/index");

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    console.log("fetched", JSON.stringify(blogs, null, 2));
    res.json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    console.log(blog.toJSON());
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body });
    console.log(blog.toJSON());
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    await blog.destroy();
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    blog.likes = req.body.likes;
    await blog.save();
    console.log(blog);
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update blog" });
  }
});

module.exports = router;
