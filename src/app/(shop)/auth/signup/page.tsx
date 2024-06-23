import { Suspense } from "react";
import SignUpFormCustomer from "./SignUpFormCustomer";
import { Loader } from "lucide-react";

async function SignUpPageCustomer() {
  return (
    <Suspense fallback={<Loader />}>
      <SignUpFormCustomer />
    </Suspense>
  );
}

export default SignUpPageCustomer;
