/* eslint-disable testing-library/no-unnecessary-act */
// 1 there should be two inputs and one button
// 2 when we click the btn the function should be called
// test() is provided by the test runner which is  jest

import { act, render, screen } from "@testing-library/react";
import UserForm from "./UserForm";
import userEvent from "@testing-library/user-event";

test("it shows two inputs and a button", () => {
  // Step-1 Render the component
  render(<UserForm />);
  // Step-2 Manipulate the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // Step-3 Assertion-make sure the component is doing what we expect it to do

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

// Test 2

test("Checking the addUser function is called", () => {
  const mock = jest.fn();
  // Try to render the component
  render(<UserForm addUser={mock} />);
  // Find the two inputs
  const name = screen.getByLabelText("Name");
  const email = screen.getByLabelText("Email");

  // Simulate typing in name
  userEvent.click(name);
  userEvent.keyboard("tayyab");
  //  Simulate typing in email
  userEvent.click(email);
  userEvent.keyboard("tayyabhaseeb5@gmail.com");
  // Find the button
  const button = screen.getByRole("button");
  // Simulate Clicking the button
  userEvent.click(button);
  // Assertion to make sure addUser function is called
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({
    name: "tayyab",
    email: "tayyabhaseeb5@gmail.com",
  });
});

// Test 3 Check that when we click the button the input goes empty string

test("Check that when we click the button the input goes empty string", () => {
  const mock = jest.fn();

  render(<UserForm addUser={mock} />);

  const name = screen.getByLabelText("Name");
  const email = screen.getByLabelText("Email");
  const button = screen.getByRole("button");

  act(() => {
    userEvent.click(name);
    userEvent.keyboard("tayyab");
  });

  act(() => {
    userEvent.click(email);
    userEvent.keyboard("tayyabhaseeb5@gmail.com");
  });

  act(() => {
    userEvent.click(button);
  });

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({
    name: "tayyab",
    email: "tayyabhaseeb5@gmail.com",
  });

  expect(name).toHaveValue("");
  expect(email).toHaveValue("");
});
