import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs);

  return (
    <div className="mx-2">
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} className="font-normal">
            <Link
              className="text-lg font-sans hover:text-orange-500"
              to={`/blogs/${blog.id}`}
            >
              {blog.title} <span className="text-sm">by</span> {blog.author}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default BlogList;
