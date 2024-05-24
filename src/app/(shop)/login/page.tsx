import { Suspense } from "react";
import SignInForm from "./SignInForm";

async function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}

export default SignInPage;
