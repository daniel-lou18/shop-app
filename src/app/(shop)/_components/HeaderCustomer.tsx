import { Navbar, NavLink, NavLinkMenu } from "@/components/ui/Navbar";
import HeaderCustomerRight from "./HeaderCustomerRight";
import HeaderLogo from "@/components/ui/HeaderLogo";
import { fetchCategories } from "@/db/queries/categories";
import { fetchBrands } from "@/db/queries/brands";
import NavbarMobile from "@/components/ui/NavbarMobile";
import { auth } from "@/auth";

async function HeaderCustomer() {
  const session = await auth();
  const [
    categoriesMenResult,
    categoriesWomenResult,
    brandsMenResult,
    brandsWomenResult,
  ] = await Promise.all([
    fetchCategories("homme"),
    fetchCategories("femme"),
    fetchBrands("homme"),
    fetchBrands("femme"),
  ]);
  console.log({ sessionServer: session });

  if (!categoriesMenResult.success) throw new Error(categoriesMenResult.error);
  if (!categoriesWomenResult.success)
    throw new Error(categoriesWomenResult.error);
  if (!brandsMenResult.success) throw new Error(brandsMenResult.error);
  if (!brandsWomenResult.success) throw new Error(brandsWomenResult.error);

  return (
    <header className="sticky z-10 top-0 flex h-16 items-center gap-4 border-b border-border/60 bg-background/90 backdrop-blur justify-between p-4 sm:px-16 sm:py-0">
      <NavbarMobile
        categoriesMen={categoriesMenResult.data}
        categoriesWomen={categoriesWomenResult.data}
        brandsMen={brandsMenResult.data}
        brandsWomen={brandsWomenResult.data}
      />
      <HeaderLogo className="w-[30%]" />
      <Navbar>
        <NavLink href="#">Nouveautés</NavLink>
        <NavLinkMenu
          categories={categoriesMenResult.data}
          brands={brandsMenResult.data}
          image="/homme.jpg"
        >
          Homme
        </NavLinkMenu>
        <NavLinkMenu
          categories={categoriesWomenResult.data}
          brands={brandsWomenResult.data}
          image="/femme.jpg"
        >
          Femme
        </NavLinkMenu>
        <NavLink href="#">Promotions</NavLink>
      </Navbar>
      <HeaderCustomerRight currentUser={session?.user} />
    </header>
  );
}

export default HeaderCustomer;
