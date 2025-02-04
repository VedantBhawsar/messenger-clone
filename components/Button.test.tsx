import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

test("renders button with correct text", () => {
  render(
    <Button secondary onClick={() => {}}>
      Click me
    </Button>,
  );
  expect(screen.getByText("Click me")).toBeInTheDocument();
});

test("calls onClick when clicked", () => {
  const handleClick = jest.fn();
  render(<Button danger onClick={handleClick} />);
  fireEvent.click(screen.getByText("Click me"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
