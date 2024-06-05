import ProductsTableHeader from "@/app/admin/products/_components/ProductsTableHeader";
import ProductsTableItem from "@/app/admin/products/_components/ProductsTableItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { fetchProductsWithTotalStockByIds } from "@/db/queries/products";
async function OrderProductsTableAdmin({
  productIds,
}: {
  productIds: string[];
}) {
  const result = await fetchProductsWithTotalStockByIds(productIds);
  if (!result.success) throw new Error(result.error);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produits</CardTitle>
        <CardDescription>Détails des produits commandés</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <ProductsTableHeader />
          <TableBody>
            {result.data.length > 0 &&
              result.data.map((product) => (
                <ProductsTableItem {...product} key={product.id} />
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default OrderProductsTableAdmin;
