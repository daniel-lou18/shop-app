import { Suspense } from "react";
import SignInFormAdmin from "./SignInFormAdmin";

async function SignInPageAdmin() {
  return (
    <Suspense>
      <SignInFormAdmin />
    </Suspense>
  );
}

export default SignInPageAdmin;
