import {
  Navbar,
  NavLink,
  NavLinkMenu,
} from "@/components/layout/navigation/Navbar";
import HeaderCustomerRight from "./HeaderCustomerRight";
import HeaderLogo from "@/components/ui/HeaderLogo";
import { fetchCategories } from "@/db/queries/categories";
import { fetchBrands } from "@/db/queries/brands";
import NavbarMobile from "@/components/layout/navigation/NavbarMobile";
import { auth } from "@/auth";
import { fetchUserById } from "@/db/queries/user";

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
  const userData = session?.user && (await fetchUserById(session?.user?.id));

  if (!categoriesMenResult.success) throw new Error(categoriesMenResult.error);
  if (!categoriesWomenResult.success)
    throw new Error(categoriesWomenResult.error);
  if (!brandsMenResult.success) throw new Error(brandsMenResult.error);
  if (!brandsWomenResult.success) throw new Error(brandsWomenResult.error);

  const images = [
    {
      name: "Collection d'été",
      imageSrc: "/short_homme.jpg",
      href: "#",
    },
    {
      name: "Collection d'été",
      imageSrc: "/short_homme.jpg",
      href: "#",
    },
    {
      name: "Collection d'été",
      imageSrc: "/short_homme.jpg",
      href: "#",
    },
  ];

  return (
    <header className="sticky z-10 top-0 flex h-16 items-center gap-4 border-b border-border/60 bg-background/90 backdrop-blur justify-between p-4 sm:px-0 sm:py-0">
      <NavbarMobile
        categoriesMen={categoriesMenResult.data}
        categoriesWomen={categoriesWomenResult.data}
        brandsMen={brandsMenResult.data}
        brandsWomen={brandsWomenResult.data}
      />
      <Navbar>
        <HeaderLogo className="mr-8" />
        <NavLinkMenu
          categories={categoriesMenResult.data}
          brands={brandsMenResult.data}
          images={images}
        >
          Homme
        </NavLinkMenu>
        <NavLinkMenu
          categories={categoriesWomenResult.data}
          brands={brandsWomenResult.data}
          images={images}
        >
          Femme
        </NavLinkMenu>
        <NavLinkMenu categories={[]} brands={[]} images={images}>
          Nouveautés
        </NavLinkMenu>
        <NavLinkMenu categories={[]} brands={[]} images={images}>
          Promotions
        </NavLinkMenu>
      </Navbar>
      <HeaderCustomerRight
        currentUser={userData && userData.success ? userData.data : null}
      />
    </header>
  );
}

export default HeaderCustomer;
