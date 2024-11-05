import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ContactForm from "./ContactForm";

describe("ContactForm", () => {
  let addContactMock;

  beforeEach(() => {
    addContactMock = jest.fn();
  });

  test("renders form fields correctly", () => {
    render(<ContactForm addContact={addContactMock} editContact={null} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add contact/i })
    ).toBeInTheDocument();
  });

  test("shows error messages when fields are empty and submitted", () => {
    render(<ContactForm addContact={addContactMock} editContact={null} />);
    fireEvent.click(screen.getByRole("button", { name: /add contact/i }));

    // Expect to see validation messages for empty fields
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/phone is required/i)).toBeInTheDocument();
  });

  test("calls addContact with correct data when form is submitted", () => {
    render(<ContactForm addContact={addContactMock} editContact={null} />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "123-456-7890" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /add contact/i }));

    // Check that addContact was called with the correct data
    expect(addContactMock).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      id: expect.any(Number), // Expecting a number for the generated ID
    });
  });

  test("fills form with editContact data when provided", () => {
    const editContact = {
      id: 1,
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "098-765-4321",
    };
    render(
      <ContactForm addContact={addContactMock} editContact={editContact} />
    );

    // Check that the form fields are pre-filled with the edit contact data
    expect(screen.getByLabelText(/name/i).value).toBe("Jane Doe");
    expect(screen.getByLabelText(/email/i).value).toBe("jane@example.com");
    expect(screen.getByLabelText(/phone/i).value).toBe("098-765-4321");
    expect(
      screen.getByRole("button", { name: /update contact/i })
    ).toBeInTheDocument();
  });
});
