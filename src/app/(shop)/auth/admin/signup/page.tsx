import { Suspense } from "react";
import SignUpFormAdmin from "./SignUpFormAdmin";

async function SignUpPageAdmin() {
  return (
    <Suspense>
      <SignUpFormAdmin />
    </Suspense>
  );
}

export default SignUpPageAdmin;
