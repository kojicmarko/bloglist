const router = require('express').Router();
const Blog = require('../models/blog');

router.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 });
  res.json(blogs);
});

router.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const { title, author, url, likes } = req.body;
  const { user } = req;

  const blog = await new Blog({
    title,
    author: author || 'anonymous',
    url,
    likes: likes || 0,
    user: user.id,
  }).populate('user', { username: 1, name: 1 });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return res.status(201).json(savedBlog);
});

router.delete('/:id', async (req, res) => {
  const blogToDelete = await Blog.findById(req.params.id);
  if (!blogToDelete) {
    return res.status(204).end();
  }

  if (blogToDelete.user && blogToDelete.user.toString() !== req.user.id) {
    return res.status(401).json({
      error: 'only the creator can delete a blog',
    });
  }

  await Blog.findByIdAndRemove(req.params.id);

  return res.status(204).end();
});

router.put('/:id', async (req, res) => {
  const blog = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 });

  res.json(updatedBlog);
});

router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('comments', {
    content: 1,
  });
  if (blog) {
    res.json(blog);
  }
  res.status(404).end();
});

module.exports = router;
