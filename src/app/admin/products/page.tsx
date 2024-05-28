import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { paths } from "@/lib/paths";
import ProductsTable from "./_components/ProductsTable";

async function AdminProducts() {
  const session = await auth();
  // if (!session || !session.user) {
  //   redirect(paths.SignIn());
  // }
  return <ProductsTable />;
}

export default AdminProducts;
