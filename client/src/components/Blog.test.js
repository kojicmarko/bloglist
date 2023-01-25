import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  // BEFORE
  const blog = {
    title: 'Testing Blog',
    author: 'Tester',
    url: 'https://www.test.com/',
    likes: 0,
    user: {
      username: 'john',
      name: 'John Doe',
    },
  };

  let component;

  const likeMockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} like={likeMockHandler} />
    );
  });

  // TESTS
  test('renders only blogs title and author by default', () => {
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    expect(component.container).not.toHaveTextContent(blog.likes);
    expect(component.container).not.toHaveTextContent(blog.url);
  });

  test('after clicking the button url and likes are also displayed', async () => {
    fireEvent.click(component.getByText('view'));
    expect(component.container).toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(blog.likes);
  });

  test('calls like handler twice if like button is clicked twice', async () => {
    fireEvent.click(component.getByText('view'));
    fireEvent.click(component.getByText('like'));
    fireEvent.click(component.getByText('like'));

    expect(likeMockHandler.mock.calls).toHaveLength(2);
  });
});
