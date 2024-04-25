import { Navbar, NavLink, NavLinkMenu } from "@/components/ui/Navbar";
import HeaderCustomerRight from "./HeaderCustomerRight";
import HeaderCustomerLeft from "./HeaderCustomerLeft";
import {
  fetchMenCategories,
  fetchWomenCategories,
} from "@/db/queries/categories";
import { fetchMenBrands, fetchWomenBrands } from "@/db/queries/brands";

async function HeaderCustomer() {
  const categoriesMen = await fetchMenCategories();
  const categoriesWomen = await fetchWomenCategories();
  const brandsMen = await fetchMenBrands();
  const brandsWomen = await fetchWomenBrands();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b border-border/60 bg-background/90 backdrop-blur justify-between p-4 sm:px-16 sm:py-0">
      <HeaderCustomerLeft />
      <Navbar>
        <NavLink href="/products/categories/new">Nouveautés</NavLink>
        <NavLinkMenu
          categories={categoriesMen}
          brands={brandsMen}
          image="/homme.jpg"
        >
          Homme
        </NavLinkMenu>
        <NavLinkMenu
          categories={categoriesWomen}
          brands={brandsWomen}
          image="/femme.jpg"
        >
          Femme
        </NavLinkMenu>
        <NavLink href="/products/categories/special-offers">Promotions</NavLink>
      </Navbar>
      <HeaderCustomerRight />
    </header>
  );
}

export default HeaderCustomer;
