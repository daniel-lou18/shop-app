import Navbar from "@/components/layout/navigation/Navbar";
import HeaderCustomerRight from "./HeaderCustomerRight";
import { fetchCategoriesAndBrands } from "@/db/queries/categories";
import NavbarMobile from "@/components/layout/navigation/NavbarMobile";
import { auth } from "@/auth";
import { fetchUserById } from "@/db/queries/user";

/* Get userId from user object in session
 * Fetch user from database with this userId
 * Pass current user to HeaderCustomerRight to display personalized message
 */

async function HeaderCustomer() {
  const session = await auth();
  const navigationData = await fetchCategoriesAndBrands();
  const userData = session?.user && (await fetchUserById(session?.user?.id));

  return (
    <header className="sticky z-10 top-0 flex h-16 items-center gap-4 border border-b-border/60 border-t-background/90 bg-background/90 backdrop-blur justify-between p-4 md:px-0 md:py-0">
      <NavbarMobile data={navigationData.success ? navigationData.data : []} />
      <Navbar data={navigationData.success ? navigationData.data : []} />
      <HeaderCustomerRight
        currentUser={userData && userData.success ? userData.data : null}
      />
    </header>
  );
}

export default HeaderCustomer;
