import { Suspense } from "react";
import SignUpFormCustomer from "./SignUpFormCustomer";

async function SignUpPageCustomer() {
  return (
    <Suspense>
      <SignUpFormCustomer />
    </Suspense>
  );
}

export default SignUpPageCustomer;
