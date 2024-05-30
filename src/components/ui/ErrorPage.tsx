"use client";

import Link from "next/link";
import { Button } from "./button";
import { paths } from "@/lib/paths";

export type ErrorPageProps = {
  error: Error;
  reset?: () => void;
};

function ErrorPage({ error, reset }: ErrorPageProps) {
  console.log(error);
  return (
    <section className="dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary dark:text-primary/60">
            Oups !
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            {error.message}
          </p>
          <p className="mb-6 text-lg font-light text-gray-500 dark:text-gray-400">
            Appuyez sur le bouton ci-dessous pour réessayer ou retournez à{" "}
            <Link
              href={paths.customerHome()}
              className="font-medium hover:underline"
            >
              la page d&apos;accueil
            </Link>
            .
          </p>
          {reset && <Button onClick={reset}>Réessayer</Button>}
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
