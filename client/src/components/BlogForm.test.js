import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm createBlog={createBlog} />);

  const title = container.querySelector('.title');
  const author = container.querySelector('.author');
  const url = container.querySelector('.url');

  const submitBtn = screen.getByText('create');

  await user.type(title, 'Testing Blog');
  await user.type(author, 'John Doe');
  await user.type(url, 'https://www.test.com');
  await user.click(submitBtn);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('Testing Blog');
  expect(createBlog.mock.calls[0][0].author).toBe('John Doe');
  expect(createBlog.mock.calls[0][0].url).toBe('https://www.test.com');
});
