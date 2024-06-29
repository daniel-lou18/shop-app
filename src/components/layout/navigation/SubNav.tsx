import React from "react";
import { NavLink } from "./Navbar";
import { capitalizeString } from "@/lib/parsers";
import { navigationInitialData } from "@/helpers/constants";

type SubNavProps = {
  section: (typeof navigationInitialData)[number]["sections"][number];
};

function SubNav({ section }: SubNavProps) {
  return (
    <li className="col-span-1">
      <ul className="grid gap-2">
        <h4 className="mb-2 font-semibold">{section.name}</h4>
        {section.items.map((item) => (
          <NavLink
            href={`/store/${item.sex.toLowerCase()}/${
              section.id === "categories" ? `${item.name}` : ""
            }${section.id === "brands" ? `brandstore/${item.name}` : ""}`}
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
