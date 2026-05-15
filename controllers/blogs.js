const router = require("express").Router();
const { Blog } = require("../models/index");

// middleware to avoide repeating
const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    return res.status(404).json({ error: "blog not found" });
  }
  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  console.log("fetched", JSON.stringify(blogs, null, 2));
  res.json(blogs);
});

router.get("/:id", blogFinder, async (req, res) => {
  const blog = req.blog;
  console.log(blog.toJSON());
  res.json(blog);
});

router.post("/", async (req, res) => {
  const blog = await Blog.create({ ...req.body });
  console.log(blog.toJSON());
  res.json(blog);
});

router.delete("/:id", blogFinder, async (req, res) => {
  const blog = req.blog;
  await blog.destroy();
  res.json(blog);
});

router.put("/:id", blogFinder, async (req, res) => {
  const blog = req.blog;
  blog.likes = req.body.likes;
  await blog.save();
  console.log(blog);
  res.json(blog);
});

module.exports = router;
