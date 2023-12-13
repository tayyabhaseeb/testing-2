import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

function renderComponent() {
  const arr = [
    { name: "tayyab", email: "tayyabhaseeb5@gmail.com" },
    { name: "humza", email: "humzahaseeb5@gmail.com" },
  ];

  render(<UserList userData={arr} />);

  return {
    arr,
  };
}

// Test 1
test("checking the correct number of cells", () => {
  renderComponent();
  const cells = screen.getAllByRole("cell");

  expect(cells).toHaveLength(4);
});

// Test 2

test("checking the correct number of rows", () => {
  renderComponent();

  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  expect(rows).toHaveLength(2);
});

// Test 2 (Alternative Method instead of test-id)

test("testing the correct number of rows of the  table", () => {
  const arr = [
    { name: "tayyab", email: "tayyabhaseeb5@gmail.com" },
    { name: "humza", email: "humzahaseeb5@gmail.com" },
  ];

  const { container } = render(<UserList userData={arr} />);

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const rows = container.querySelectorAll("tbody tr");

  expect(rows).toHaveLength(2);
});

// Test 3

test("render the email and name of each user", () => {
  renderComponent();

  const [firstName, firstEmail, secondName, secondEmail] =
    screen.getAllByRole("cell");

  //   expect(firstName).toHaveTextContent("tayyab");
  //   expect(firstEmail).toHaveTextContent("tayyabhaseeb5@gmail.com");
  //   expect(secondName).toHaveTextContent("humza");
  //   expect(secondEmail).toHaveTextContent("humzahaseeb5@gmail.com");

  expect(firstName).toBeInTheDocument();
  expect(firstEmail).toBeInTheDocument();
  expect(secondName).toBeInTheDocument();
  expect(secondEmail).toBeInTheDocument();
});

// screen.logTestingPlaygroundURL()

// Test 3 (By instructor what he actually wants)

test("render the name and email and they should be present in document", () => {
  const { arr } = renderComponent();

  for (const obj of arr) {
    const name = screen.getAllByRole("cell", { name: obj.name }); // returns an array // [tayyab , humza]
    const email = screen.getAllByRole("cell", { email: obj.email });

    name.forEach((item) => {
      expect(item).toBeInTheDocument();
    });

    email.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  }
});
