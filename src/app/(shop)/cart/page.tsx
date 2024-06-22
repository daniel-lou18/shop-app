import { auth } from "@/auth";
import CartItems from "./_components/CartItems";
import CartSummary from "./_components/CartSummary";
import PageHeading1 from "@/components/ui/PageHeading1";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
async function CartPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <section className="py-8 antialiased dark:bg-gray-950">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <Breadcrumbs slug={["Mon panier", "", ""]} />
        <PageHeading1>Mon panier</PageHeading1>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <CartItems />
          <CartSummary user={user} />
        </div>
      </div>
    </section>
  );
}

export default CartPage;
