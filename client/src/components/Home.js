import Togglable from './Togglable';
import BlogForm from './BlogForm';
import BlogList from './BlogList';

const Home = () => (
  <>
    <h2 className="text-black text-3xl font-black text-center font-mono">
      Blogs
    </h2>
    <Togglable buttonLabel={'Submit blog-link'}>
      <BlogForm />
    </Togglable>
    <BlogList />
  </>
);

export default Home;
