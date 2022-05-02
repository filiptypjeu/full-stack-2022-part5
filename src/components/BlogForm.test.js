import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("BlogForm", () => {
  const handleCreateBlog = jest.fn();

  beforeEach(() => {
    render(<BlogForm handleCreateBlog={handleCreateBlog} />);
  });

  test("blog creation", () => {
    const title = screen.getByPlaceholderText("title");
    const author = screen.getByPlaceholderText("author");
    const url = screen.getByPlaceholderText("url");
    const button = screen.getByText("create");

    userEvent.type(title, "blog title");
    userEvent.type(author, "blog author");
    userEvent.type(url, "blog url");
    userEvent.click(button);

    expect(handleCreateBlog.mock.calls).toHaveLength(1);
    expect(handleCreateBlog.mock.calls[0]).toHaveLength(1);
    expect(handleCreateBlog.mock.calls[0][0]).toEqual({
      title: "blog title",
      author: "blog author",
      url: "blog url",
    });
  });
});

