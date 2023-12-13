/* eslint-disable testing-library/no-unnecessary-act */
import {
  render,
  screen,
  act,
  getByRole,
  queryByRole,
  findByRole,
} from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("can receive a new user and show it on the list", () => {
  act(() => {
    render(<App />);
  });

  const nameInput = screen.getByLabelText("Name");
  const emailInput = screen.getByLabelText("Email");

  act(() => {
    userEvent.click(nameInput);
    userEvent.type(nameInput, "tayyab");
  });

  act(() => {
    userEvent.click(emailInput);
    userEvent.type(emailInput, "tayyabhaseeb5@gmail.com");
  });

  const button = screen.getByRole("button");

  act(() => {
    userEvent.click(button);
  });

  // Use getAllByRole instead of getByRole
  const nameRows = screen.getByRole("cell", { name: "tayyab" });
  const emailRows = screen.getByRole("cell", {
    name: "tayyabhaseeb5@gmail.com",
  });

  // Make assertions based on the length of the arrays
  expect(nameRows).toBeInTheDocument();
  expect(emailRows).toBeInTheDocument();
});

// test run ==> node
// fake browser is created and html is rendered on it ==> screen.

// aria-label put it on element if they have same svg or empty svg inside pf them

// Button 1

// <button aria-label='closeBtn'>
// <svg />
//</button>

// Button 2

// <button aria-label='openBtn'>
// <svg />
//</button>

// ===============> Query Functions <===================== //

// getBy , getAllBy, queryBy , queryAllBy, findBy, findAllBy

// getByRole ====> if not present or present but > 1 then it will throw an error
// queryByRole ===> if element not present than it will return null
// findByRole ====> check after async 1 sec after componnet ===> watch your component with a span of 1 second by default

// Second Method
// GetALLBY , QUERYALLBY, FINDALLBY

//queryAllBy ===> if the expected length is  not found it will throw [] not error

// So the main problem is when to use them
// Prove an element exists ====> getBy, getAllBy
// Prove an element doesn't exists =====> queryBy, queryAllBy
// Make sure an element eventually exists =======> findBy , findAllBy

// ==============> Matchers <================= //
