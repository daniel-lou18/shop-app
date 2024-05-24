import { Suspense } from "react";
import SignUpForm from "./SignUpForm";

async function SignUpPage() {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
}

export default SignUpPage;
