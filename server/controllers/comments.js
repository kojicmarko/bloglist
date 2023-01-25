const router = require('express').Router();
const Comment = require('../models/comment');
const Blog = require('../models/blog');

router.post('/:id/comments', async (req, res) => {
  const { content } = req.body;
  const blog = await Blog.findById(req.params.id);
  const comment = await new Comment({ content, blog: blog.id });

  const savedComment = await comment.save();

  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  return res.status(201).json(savedComment);
});

router.get('/:id/comments', async (req, res) => {
  const comments = await Comment.find({});
  res.json(comments);
});

module.exports = router;
