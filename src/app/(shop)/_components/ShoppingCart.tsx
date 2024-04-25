import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CartItem as CartItemType, useCart } from "@/context/cart-context";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { paths } from "@/helpers/helpers";
import { useToast } from "@/components/ui/use-toast";

type ShoppingCartProps = {
  open: boolean;
  setOpen: (prevState: boolean) => void;
};

function ShoppingCart({ open, setOpen }: ShoppingCartProps) {
  const { items, removeItem } = useCart();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <CartHeader setOpen={setOpen} />

                      <CartContent items={items} removeItem={removeItem} />
                    </div>

                    <CartFooter items={items} setOpen={setOpen} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function CartHeader({ setOpen }: { setOpen: (prevState: boolean) => void }) {
  return (
    <div className="flex items-start justify-between">
      <Dialog.Title className="text-lg font-medium text-gray-900">
        Mon panier
      </Dialog.Title>
      <div className="ml-3 flex h-7 items-center">
        <button
          type="button"
          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
          onClick={() => setOpen(false)}
        >
          <span className="absolute -inset-0.5" />
          <span className="sr-only">Close panel</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function CartContent({
  items,
  removeItem,
}: {
  items: CartItemType[];
  removeItem: (id: string) => void;
}) {
  const { toast } = useToast();

  if (items.length === 0) {
    return (
      <div className="flex h-[90%] items-center justify-center">
        <p>Aucun article dans le panier</p>
      </div>
    );
  }
  function handleDeleteItem(id: string) {
    removeItem(id);
    toast({
      description: "Le produit a été supprimé du panier",
    });
  }
  return (
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {items.map((item) => (
            <CartItem item={item} key={item.id} onDelete={handleDeleteItem} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function CartItem({
  item,
  onDelete,
}: {
  item: CartItemType;
  onDelete: (id: string) => void;
}) {
  return (
    <li key={item.id} className="flex py-6">
      <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={item.imagePath || "/placeholder.png"}
          alt={item.sku}
          className="h-full w-full object-cover object-center"
          width={96}
          height={96}
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={`/products/${item.product.id}`}>
                {item.product.name.split(" ").slice(0, 3).join(" ")}
              </Link>
            </h3>
            <p className="ml-4">{item.price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{`Taille: ${item.size}`}</p>
          <p className="mt-1 text-sm text-gray-500">{`Couleur: ${item.color}`}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">{`Quantité: ${item.orderQuantity}`}</p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-primary hover:text-primary/75"
              onClick={(e) => onDelete(item.id)}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

function CartFooter({
  items,
  setOpen,
}: {
  items: CartItemType[];
  setOpen: (prevState: boolean) => void;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Sous-total</p>
        <p>{items.reduce((acc, item) => acc + item.price, 0)}</p>
      </div>
      <p className="mt-0.5 text-sm text-gray-500">
        Les frais de livraison seront calculés au moment de l&apos;achat.
      </p>
      <div className="mt-6">
        <Button className="w-full text-base">
          <Link href={paths.cart()}>Mon panier</Link>
        </Button>
      </div>
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          ou{" "}
          <button
            type="button"
            className="font-medium text-primary hover:text-primary/75"
            onClick={() => setOpen(false)}
          >
            Continuer mon shopping
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </p>
      </div>
    </div>
  );
}

export default ShoppingCart;
