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
import React, { ReactNode } from "react";
import { useTabsFilter } from "@/hooks/useTabsFilter";

export type TableHeaderItems = {
  value: string;
  text: string;
}[];

type TableContainerProps<T> = {
  children: ReactNode & { props: { data: T } };
  title: string;
  subtitle: string;
  tableHeaderItems: TableHeaderItems;
  data: T;
  tabsTriggers: { value: string; text: string }[];
  filterFunction: (data: T, value: string) => T;
  handleSort: (searchParams: string) => void;
};

function TableContainer<T>({
  children,
  title,
  subtitle,
  tableHeaderItems,
  data,
  tabsTriggers,
  filterFunction,
  handleSort,
}: TableContainerProps<T>) {
  const { filteredData, tabsValue, setTabsValue } = useTabsFilter(
    data,
    filterFunction
  );

  return (
    <Tabs value={tabsValue} onValueChange={setTabsValue}>
      <div className="flex items-center">
        <TableTabsList tabsTriggers={tabsTriggers} />
        <React.Suspense>
          <TableActions
            buttonText={`Ajouter ${title.slice(0, -1).toLowerCase()}`}
          />
        </React.Suspense>
      </div>
      <TabsContent value={tabsValue} className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeaderRow
                tableHeaderItems={tableHeaderItems}
                handleSort={handleSort}
              />
              {React.Children.map(children, (child) =>
                React.isValidElement(child)
                  ? React.cloneElement(child, {
                      data: filteredData,
                    })
                  : child
              )}
            </Table>
          </CardContent>
          <CardFooter>
            <PageItemsCounter
              currentPage={1}
              itemsPerPage={10}
              totalItems={(data as {}[]).length}
              text={title.toLowerCase()}
            />
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default TableContainer;
