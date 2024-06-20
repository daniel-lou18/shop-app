import React from "react";
import { NavLink } from "./Navbar";

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
        <h4 className="font-base mb-4">{title.toUpperCase()}</h4>
        {items.map((item) => (
          <NavLink
            href={`/store/${children.toLowerCase()}/${
              title === "Catégories" ? `${item.name}` : ""
            }${title === "Marques" ? `brandstore/${item.name}` : ""}`}
            className="border-b border-solid border-transparent hover:border-gray-950 w-fit"
            key={item.id}
          >
            {item.name.at(0)?.toUpperCase() + item.name.slice(1)}
          </NavLink>
        ))}
      </ul>
    </li>
  );
}

export default SubNav;
