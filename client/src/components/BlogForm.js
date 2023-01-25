import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = () => {
  const dispatch = useDispatch();

  const addBlog = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const url = e.target.url.value;
    e.target.title.value = '';
    e.target.author.value = '';
    e.target.url.value = '';

    const blog = {
      title,
      author,
      url,
    };

    dispatch(createBlog(blog));
  };

  return (
    <div className="max-w-xs">
      <h2 className="text-center font-semibold">Submit a blog</h2>
      <form onSubmit={addBlog} className="">
        <div className="mb-1">
          <label className="inline-block w-1/6 text-left mr-4 font-medium">
            Title:
          </label>
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="title border border-black"
          />
        </div>
        <div className="mb-1">
          <label className="inline-block w-1/6 text-left mr-4 font-medium">
            Author:
          </label>
          <input
            name="author"
            type="text"
            placeholder="Author"
            className="author border border-black"
          />
        </div>
        <div className="mb-0.5">
          <label className="inline-block w-1/6 text-left mr-4 font-medium">
            URL:
          </label>
          <input
            name="url"
            type="url"
            placeholder="URL"
            className="url border border-black"
          />
        </div>
        <button
          type="submit"
          className="create-btn bg-orange-400 text-orange-50 hover:bg-orange-500 font-semibold text-sm px-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
