const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    author: 1,
    title: 1,
    url: 1,
    likes: 1,
  });
  res.json(users);
});

router.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  if (!password || password.length < 3) {
    return res.status(400).json({ error: 'invalid password' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: 'username must be unique' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name: name || 'anonymous',
    passwordHash,
  });

  const savedUser = await user.save();

  return res.status(201).json(savedUser);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  }
  res.status(404).end();
});

module.exports = router;
