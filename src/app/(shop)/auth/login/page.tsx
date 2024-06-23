import { Suspense } from "react";
import SignInFormCustomer from "./SignInFormCustomer";

async function SignInPageCustomer() {
  return (
    <Suspense>
      <SignInFormCustomer />
    </Suspense>
  );
}

export default SignInPageCustomer;
