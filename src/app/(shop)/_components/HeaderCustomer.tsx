import { Navbar, NavLink, NavLinkMenu } from "@/components/ui/Navbar";
import HeaderCustomerRight from "./HeaderCustomerRight";
import HeaderCustomerLeft from "./HeaderCustomerLeft";
import { fetchAllCategories } from "@/db/queries/categories";

async function HeaderCustomer() {
  const categories = await fetchAllCategories();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 bg-background justify-between p-4 sm:px-16 sm:py-0">
      <HeaderCustomerLeft />
      <Navbar>
        <NavLink href="/">Nouveautés</NavLink>
        <NavLinkMenu categories={categories}>Homme</NavLinkMenu>
        <NavLinkMenu categories={categories}>Femme</NavLinkMenu>
        <NavLink href="/cart">Promotions</NavLink>
      </Navbar>
      <HeaderCustomerRight />
    </header>
  );
}

export default HeaderCustomer;
