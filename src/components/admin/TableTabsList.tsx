"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";

type TableTabsListProps = {
  tabsTriggers: { value: string; text: string }[];
};

function TableTabsList({ tabsTriggers }: TableTabsListProps) {
  return (
    <TabsList>
      {tabsTriggers.map(({ value, text }) => (
        <TabsTrigger key={value} value={value}>
          {text}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}

export default TableTabsList;
