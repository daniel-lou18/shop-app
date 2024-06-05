"use client";

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
import PageItemsCounter from "../ui/PageItemsCounter";
import TableTabsList from "@/components/admin/TableTabsList";
import TableActions from "@/components/admin/TableActions";
import TableHeaderRow from "@/components/admin/TableHeaderRow";
import React, { useState } from "react";

const checkboxItems = [
  { value: "femme", text: "Femme" },
  { value: "homme", text: "Homme" },
  { value: "vip", text: "VIP" },
];

type TableContainerProps = {
  children: React.ReactNode & { props: { data: [] } };
  title: string;
  subtitle: string;
  tableHeaderItems: string[];
  data: any[];
  tabsTriggers: { value: string; text: string }[];
  filterFunction: (data: any[], value: string) => any[];
};

function TableContainer({
  children,
  title,
  subtitle,
  tableHeaderItems,
  data,
  tabsTriggers,
  filterFunction,
}: TableContainerProps) {
  const [value, setValue] = useState<string>("all");
  const filteredData = filterFunction(data, value);

  return (
    <Tabs value={value} onValueChange={setValue}>
      <div className="flex items-center">
        <TableTabsList tabsTriggers={tabsTriggers} />
        <React.Suspense>
          <TableActions
            checkboxItems={checkboxItems}
            buttonText={`Ajouter ${title.slice(0, -1).toLowerCase()}`}
          />
        </React.Suspense>
      </div>
      <TabsContent value={value} className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeaderRow tableHeaderItems={tableHeaderItems} />
              {React.Children.map(children, (child) =>
                React.isValidElement(child)
                  ? React.cloneElement(child, { data: filteredData })
                  : child
              )}
            </Table>
          </CardContent>
          <CardFooter>
            <PageItemsCounter
              currentPage={1}
              itemsPerPage={10}
              totalItems={data.length}
              text={title.toLowerCase()}
            />
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default TableContainer;
