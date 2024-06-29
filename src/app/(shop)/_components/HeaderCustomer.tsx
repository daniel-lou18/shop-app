import { Navbar } from "@/components/layout/navigation/Navbar";
import HeaderCustomerRight from "./HeaderCustomerRight";
import { fetchCategories } from "@/db/queries/categories";
import { fetchBrands } from "@/db/queries/brands";
import NavbarMobile from "@/components/layout/navigation/NavbarMobile";
import { auth } from "@/auth";
import { fetchUserById } from "@/db/queries/user";
import { createNavigationData } from "@/helpers/helpers";
import { navigationInitialData } from "@/helpers/constants";

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

  const navigationData = createNavigationData(
    [
      {
        dataId: "femme",
        sections: [
          {
            id: "categories",
            name: "Catégories",
            items: [...categoriesWomenResult.data],
          },
          { id: "brands", name: "Marques", items: [...brandsWomenResult.data] },
        ],
      },
      {
        dataId: "homme",
        sections: [
          {
            id: "categories",
            name: "Catégories",
            items: [...categoriesMenResult.data],
          },
          { id: "brands", name: "Marques", items: [...brandsMenResult.data] },
        ],
      },
    ],
    navigationInitialData
  );

  return (
    <header className="sticky z-10 top-0 flex h-16 items-center gap-4 border-b border-border/60 bg-background/90 backdrop-blur justify-between p-4 sm:px-0 sm:py-0">
      <NavbarMobile
        categoriesMen={categoriesMenResult.data}
        categoriesWomen={categoriesWomenResult.data}
        brandsMen={brandsMenResult.data}
        brandsWomen={brandsWomenResult.data}
      />
      <Navbar data={navigationData} />
      <HeaderCustomerRight
        currentUser={userData && userData.success ? userData.data : null}
      />
    </header>
  );
}

export default HeaderCustomer;
