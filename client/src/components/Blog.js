import { useNavigate, useMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { remove, like, createComment } from '../reducers/blogReducer';

const Blog = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const blogs = useSelector(({ blogs }) => blogs);
  const username = useSelector(({ loggedUser }) => loggedUser.username);

  const match = useMatch('/blogs/:id');
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const removeAndNotify = (blog) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
    if (ok) {
      dispatch(remove(blog));
      dispatch(setNotification(`Removed ${blog.title}`, 5));
      navigate('/');
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    const content = e.target.comment.value;
    e.target.comment.value = '';

    const comment = {
      content,
      blog: blog.id,
    };

    dispatch(createComment(comment));
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="mx-2">
      <div>
        <h2>
          {blog.title} <span className="text-sm">by</span> {blog.author}
        </h2>
        <a href={blog.url} className="url underline hover:no-underline">
          {blog.url}
        </a>

        <div className="like">
          {blog.likes}
          <button
            type="button"
            className="like-btn bg-orange-400 text-orange-50 hover:bg-orange-500 font-semibold text-sm px-2"
            onClick={() => dispatch(like(blog))}
          >
            Like
          </button>
        </div>
        <div>
          Posted <span className="text-sm">by</span> {blog.user.name}
        </div>
        {blog.user.username === username && (
          <button
            type="button"
            className="remove-btn bg-orange-400 text-orange-50 hover:bg-orange-500 font-semibold text-sm px-2"
            onClick={() => removeAndNotify(blog)}
          >
            Remove
          </button>
        )}
      </div>
      <form onSubmit={addComment} className="my-4">
        <textarea
          name="comment"
          rows="8"
          className="comment border border-black mr-2 block w-1/2"
        ></textarea>
        <button
          type="submit"
          className="comment-btn bg-orange-400 text-orange-50 hover:bg-orange-500 font-semibold text-sm px-2"
        >
          Add comment
        </button>
      </form>
      <ul>
        {blog.comments.map((c) => (
          <li key={c.id} className="">
            {c.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
