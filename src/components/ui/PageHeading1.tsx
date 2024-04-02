import { ReactNode } from "react";

function PageHeading1({ children }: { children: ReactNode }) {
  return <h1 className="text-3xl font-bold mb-8">{children}</h1>;
}

export default PageHeading1;
