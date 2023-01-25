const dummy = (blogs) => (blogs ? 1 : 1);

const totalLikes = (blogs) => blogs.reduce((a, blog) => a + blog.likes, 0);

const favoriteBlog = (blogs) =>
  blogs.reduce((a, blog) => (a.likes > blog.likes ? a : blog));

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author);

  const freqMap = authors.reduce(
    (allAuthors, author) => ({
      ...allAuthors,
      [author]: (allAuthors[author] || 0) + 1,
    }),
    {}
  );

  const result = Object.keys(freqMap).map((key) => ({
    author: key,
    blogs: freqMap[key],
  }));

  return favoriteBlog(result);
};

const mostLikes = (blogs) => {
  const authors = blogs.map((blog) => ({
    author: blog.author,
    likes: blog.likes,
  }));

  const result = authors.reduce((acc, cur, i) => {
    const item = i > 0 && acc.find(({ author }) => author === cur.author);
    if (item) item.likes += cur.likes;
    else acc.push({ author: cur.author, likes: cur.likes }); // don't push cur here
    return acc;
  }, []);

  return favoriteBlog(result);
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
