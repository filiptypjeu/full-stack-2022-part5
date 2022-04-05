import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Blog", () => {
  let b;
  const handleLike = jest.fn();

  beforeEach(() => {
    const blog = {
      title: "blog title",
      author: "blog author",
      url: "blog URL",
      likes: 42,
      user: "user id",
    };

    const user = {
      name: "user name",
      username: "user username",
      id: "user id",
    };

    const { container } = render(<Blog
      blog={blog}
      user={user}
      handleLike={handleLike}
      handleRemove={() => {}}
    />);
    b = container.querySelector(".blog");
  });

  test("default content", () => {
    expect(b).toHaveTextContent("blog title");
    expect(b).toHaveTextContent("blog author");
    expect(b).not.toHaveTextContent("blog URL");
    expect(b).not.toHaveTextContent("42");
  });

  test("extendend content after click", () => {
    const button = screen.getByText("view");
    userEvent.click(button);

    expect(b).toHaveTextContent("blog title");
    expect(b).toHaveTextContent("blog author");
    expect(b).toHaveTextContent("blog URL");
    expect(b).toHaveTextContent("42");
  });

  test("like button", () => {
    userEvent.click(screen.getByText("view"));

    expect(handleLike.mock.calls).toHaveLength(0);

    const button = screen.getByText("like");

    userEvent.click(button);
    expect(handleLike.mock.calls).toHaveLength(1);

    userEvent.click(button);
    expect(handleLike.mock.calls).toHaveLength(2);
  });
});

