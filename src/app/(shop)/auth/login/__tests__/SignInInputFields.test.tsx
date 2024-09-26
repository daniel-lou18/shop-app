import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignInInputFields from "../_components/SignInInputFields";

const mockFormState = {
  errors: {
    email: ["Invalid email"],
    password: ["String must contain at least 8 character(s)"],
    _form: [],
  },
};

describe("SignInInputFields component", () => {
  test("displays user input correctly", async () => {
    render(<SignInInputFields formState={{}} />);

    const user = userEvent.setup();

    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/mot de passe/i);

    await user.type(emailField, "user@mail.com");
    await user.type(passwordField, "secretpassword");

    expect(emailField).toHaveValue("user@mail.com");
    expect(passwordField).toHaveValue("secretpassword");
  });

  test("displays error messages for each field if formState object contains errors", () => {
    render(<SignInInputFields formState={mockFormState} />);

    const emailErrorMessage = screen.getByText(/invalid email/i);
    const passwordErrorMesssage = screen.getByText(
      /string must contain at least 8 character.*/i
    );

    expect(emailErrorMessage).toBeInTheDocument();
    expect(passwordErrorMesssage).toBeInTheDocument();
  });
});
