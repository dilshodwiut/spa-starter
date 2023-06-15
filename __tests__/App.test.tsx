import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import App from "@/App";

afterEach(() => {
  cleanup();
});

test("increments the count", () => {
  render(<App />);

  // query* functions will return the element or null if it cannot be found
  // get* functions will return the element or throw an error if it cannot be found
  expect(screen.getByRole("button").textContent).toBe("count is 0");

  // the queries can accept a regex to make your selectors more resilient to content tweaks and changes.
  fireEvent.click(screen.getByRole("button"));

  // .toBeInTheDocument() is an assertion that comes from jest-dom
  // otherwise you could use .toBeDefined()
  expect(screen.getByRole("button").textContent).toBe("count is 1");
});
