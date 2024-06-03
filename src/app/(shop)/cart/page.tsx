import { auth } from "@/auth";
import CartItems from "./_components/CartItems";
import CartSummary from "./_components/CartSummary";
async function CartPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Mon panier
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <CartItems />
          <CartSummary user={user} />
        </div>
      </div>
    </section>
  );
}

export default CartPage;
