import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import PageItemsCounter from "../../../components/ui/PageItemsCounter";
import { Suspense } from "react";
import TableTabsList from "@/components/admin/TableTabsList";
import TableActions from "@/components/admin/TableActions";
import TableHeaderRow from "@/components/admin/TableHeaderRow";
import CustomersTableContent from "./_components/CustomersTableContent";
import { fetchUsers } from "@/db/queries/users";

const tabsTriggers = [
  { value: "all", text: "Tous" },
  { value: "active", text: "Actifs" },
  { value: "non-active", text: "Non-actifs" },
];

const checkboxItems = [
  { value: "femme", text: "Femme" },
  { value: "homme", text: "Homme" },
  { value: "vip", text: "VIP" },
];

const tableHeaderItems = ["Prénom", "Genre", "Statut", "Commandes", "Total"];

async function CustomersTable() {
  const result = await fetchUsers();
  if (!result.success) throw new Error(result.error);

  return (
    <main className="grid flex-1 items-start gap-4 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TableTabsList tabsTriggers={tabsTriggers} />
          <Suspense>
            <TableActions
              checkboxItems={checkboxItems}
              buttonText="Ajouter client"
            />
          </Suspense>
        </div>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Clients</CardTitle>
              <CardDescription>
                Gérer les utilisateurs actifs en non-actifs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeaderRow tableHeaderItems={tableHeaderItems} />
                <CustomersTableContent customers={result.data} />
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

export default CustomersTable;
