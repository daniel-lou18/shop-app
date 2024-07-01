import Navbar from "@/components/layout/navigation/Navbar";
import HeaderCustomerRight from "./HeaderCustomerRight";
import { fetchCategories } from "@/db/queries/categories";
import { fetchBrands } from "@/db/queries/brands";
import NavbarMobile from "@/components/layout/navigation/NavbarMobile";
import { auth } from "@/auth";
import { fetchUserById } from "@/db/queries/user";
import HeaderLogo from "@/components/ui/HeaderLogo";

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

  return (
    <header className="sticky z-10 top-0 flex h-16 items-center gap-4 border border-b-border/60 border-t-background/90 bg-background/90 backdrop-blur justify-between p-4 md:px-0 md:py-0">
      <NavbarMobile
        categoriesMen={
          categoriesMenResult.success ? categoriesMenResult.data : []
        }
        categoriesWomen={
          categoriesWomenResult.success ? categoriesWomenResult.data : []
        }
        brandsMen={brandsMenResult.success ? brandsMenResult.data : []}
        brandsWomen={brandsWomenResult.success ? brandsWomenResult.data : []}
      />
      <Navbar
        fetchedData={{
          categoriesMen: categoriesMenResult.success
            ? categoriesMenResult.data
            : [],
          categoriesWomen: categoriesWomenResult.success
            ? categoriesWomenResult.data
            : [],
          brandsMen: brandsMenResult.success ? brandsMenResult.data : [],
          brandsWomen: brandsWomenResult.success ? brandsWomenResult.data : [],
        }}
      />
      <HeaderLogo className="md:hidden" />
      <HeaderCustomerRight
        currentUser={userData && userData.success ? userData.data : null}
      />
    </header>
  );
}

export default HeaderCustomer;
