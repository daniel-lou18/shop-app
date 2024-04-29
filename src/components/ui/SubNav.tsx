import Link from "next/link";
import React from "react";

type SubNavProps = {
  children: string;
  items: {
    id: string;
    name: string;
  }[];
  title: string;
};

function SubNav({ children, items, title }: SubNavProps) {
  return (
    <li className="col-span-1">
      <ul className="grid gap-2">
        <h4 className="font-medium mb-4">{title.toUpperCase()}</h4>
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`/store/${children.toLowerCase()}${
                title === "Catégories" ? `-${item.name}/all` : ""
              }${title === "Marques" ? `/${item.name}` : ""}`}
              className="border-b-2 border-solid border-transparent hover:border-gray-950 w-fit"
            >
              {item.name.at(0)?.toUpperCase() + item.name.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default SubNav;