"use client";

import { ExtendedUser } from "@/auth";
import ButtonSubmit from "@/components/ui/ButtonSubmit";
import { useCart } from "@/context/cart-context";
import { centsToEuros } from "@/helpers/helpers";
import { paths } from "@/lib/paths";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, MouseEvent, useEffect } from "react";
import { toast } from "sonner";

export type CartOrder = {
  orderData: {
    variantId: string;
    quantity: number;
  }[];
  userId?: string;
};

function CartSummary({ user }: { user: ExtendedUser | undefined }) {
  const { items, totalPrice } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      toast.success("Votre commande a été validée");
    } else if (searchParams.get("payment") === "cancel") {
      toast.error("Une erreur est survenue lors du paiement");
    }
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) {
      router.push(paths.customerSignIn("redirect=/cart"));
      return;
    }
    if (!items?.length) return;

    const orderData = items.map((item) => {
      return { variantId: item.id, quantity: item.orderQuantity };
    });

    try {
      const res = await fetch(paths.apiCheckout(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderData, userId: user?.id }),
      });
      if (!res.ok)
        throw new Error(
          "Une erreur est survenue lors de l'envoi de la commande"
        );
      const data = await res.json();
      router.push(data.url);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Une erreur est survenue");
    }
  }

  function handleVoucher(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    toast.error("Ce code n'est pas valable");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full"
    >
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <p className="text-xl font-semibold text-gray-950 dark:text-white">
          Récapitulatif
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Total commande : {items.length} articles
              </dt>
              <dd className="text-base font-medium text-gray-950 dark:text-white">
                {centsToEuros(totalPrice)}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Réduction
              </dt>
              <dd className="text-base font-medium text-green-600">0,00 €</dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Frais de livraison
              </dt>
              <dd className="text-base font-medium text-gray-950 dark:text-white">
                Offerts
              </dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
            <dt className="text-base font-bold text-gray-950 dark:text-white">
              Total
            </dt>
            <dd className="text-base font-bold text-gray-950 dark:text-white">
              {centsToEuros(totalPrice)}
            </dd>
          </dl>
        </div>

        <ButtonSubmit className="flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          Payer
        </ButtonSubmit>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {" "}
            ou{" "}
          </span>
          <a
            href="#"
            title=""
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
          >
            poursuivre mes achats
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <form className="space-y-4">
          <div>
            <label
              htmlFor="voucher"
              className="mb-2 block text-sm font-medium text-gray-950 dark:text-white"
            >
              Code promo ou carte cadeau
            </label>
            <input
              type="text"
              id="voucher"
              className="block w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-950 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              placeholder=""
              required
            />
          </div>
          <button
            onClick={handleVoucher}
            type="button"
            className="flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Utiliser code
          </button>
        </form>
      </div>
    </form>
  );
}

export default CartSummary;
