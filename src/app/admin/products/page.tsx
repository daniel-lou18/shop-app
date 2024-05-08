import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { paths } from "@/helpers/helpers";
import ProductsTable from "./_components/ProductsTable";

async function AdminProducts() {
  const session = await auth();
  if (!session || !session.user) {
    redirect(paths.login());
  }
  return <ProductsTable />;
}

export default AdminProducts;
