import React from "react";
import { NavLink } from "./Navbar";
import { capitalizeString } from "@/lib/parsers";

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
        <h4 className="mb-2 font-semibold">{title}</h4>
        {items.map((item) => (
          <NavLink
            href={`/store/${children.toLowerCase()}/${
              title === "Catégories" ? `${item.name}` : ""
            }${title === "Marques" ? `brandstore/${item.name}` : ""}`}
            className="text-gray-500 text-sm hover:text-gray-950 w-fit"
            key={item.id}
          >
            {capitalizeString(item.name)}
          </NavLink>
        ))}
      </ul>
    </li>
  );
}

export default SubNav;
