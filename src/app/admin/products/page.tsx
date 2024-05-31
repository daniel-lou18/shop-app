import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ProductsTableItem from "./_components/ProductsTableItem";
import PageItemsCounter from "../../../components/ui/PageItemsCounter";
import ProductsTableHeader from "./_components/ProductsTableHeader";
import ProductsTableTabsList from "./_components/ProductsTableTabsList";
import ProductsTableActions from "./_components/ProductsTableActions";
import { fetchAllProductsWithTotalStock } from "@/db/queries/products";
import { Suspense } from "react";

export default async function ProductsTable() {
  const result = await fetchAllProductsWithTotalStock();
  if (!result.success) throw new Error(result.error);

  return (
    <main className="grid flex-1 items-start gap-4 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <ProductsTableTabsList />
          <Suspense>
            <ProductsTableActions />
          </Suspense>
        </div>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Produits</CardTitle>
              <CardDescription>
                Ici vous pouvez créer et modifier des produits
              </CardDescription>
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
            <CardFooter>
              <PageItemsCounter
                currentPage={1}
                itemsPerPage={10}
                totalItems={result.data.length}
              />
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
