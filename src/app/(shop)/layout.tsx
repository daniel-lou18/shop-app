import { Navbar, NavLink, NavLinkMenu } from "@/components/ui/Navbar";
import { ReactNode } from "react";

const navLinkMenu = [
  {
    href: "/products",
    title: "Tous nos produits",
    description: "Retrouvez tous les produits de notre boutique ici.",
  },
  {
    href: "/products/special-offers",
    title: "Promotions",
    description: "Les bonnes affaire, c'est par ici !",
  },
  {
    href: "/products/new",
    title: "Nouveautés",
    description:
      "Découvrez notre sélection de nouveautés, spécialement choisies pour illuminer votre quotidien. Laissez-vous tenter par l'inédit et le tendance.",
  },
];

function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar>
        <NavLink href="/">Page d&apos;accueil</NavLink>
        <NavLinkMenu data={navLinkMenu} />
        <NavLink href="/cart">Mon panier</NavLink>
      </Navbar>
      {children}
    </>
  );
}

export default CustomerLayout;
