import { paths } from "@/lib/paths";

export const BRANDS = {
  men: [
    "Gucci",
    "Boss",
    "K-Way",
    "Lacoste",
    "Levi's",
    "Tommy Hilfiger",
    "Jack & Jones",
    "Polo Ralph Lauren",
    "Balenciaga",
    "Marvin&Co",
    "Schott",
    "Sandro",
  ],
  women: [
    "Maje",
    "Sandro",
    "Claudie Pierlot",
    "The Kooples",
    "American Vintage",
    "Zadig&Voltaire",
    "Soeur",
    "Sessùn",
    "Tommy Hilfiger",
    "Morgan",
    "IKKS Women",
  ],
};

export const CATEGORIES = {
  men: [
    "t-shirts et polos",
    "vestes et manteaux",
    "pantalons",
    "jeans",
    "chemises",
    "sweats",
    "pulls et gilets",
    "sous-vêtements",
    "tenues de sport",
    "doudounes",
    "shorts et bermudas",
    "shorts et slips de bain",
  ],
  women: [
    "chemises et blouses",
    "jeans",
    "jupes",
    "lingerie",
    "maillots de bain",
    "pantalons",
    "pulls et gilets",
    "robes",
    "sweats et hoodies",
    "tops et t-shirts",
    "vestes et manteaux",
  ],
};

export const mainHero = {
  name: "Jusqu'à -40% sur une sélection d'articles",
  imagePath: "/Top.webp",
  buttonsData: [
    { name: "Femme", href: paths.storeSex("femme") },
    { name: "Homme", href: paths.storeSex("homme") },
  ],
};

export const brandBanner = {
  title: "MARQUE DU MOMENT",
  name: "Tommy Hilfiger",
  description:
    "Une des marques de lifestyle les plus reconnues au monde. Depuis 1985 elle célèbre l'essence du style américain classique.",
  imagePath: "/D-Converse-WE-Homepage-Tenniscore-P1.jpg",
  buttonsData: [
    { name: "Femme", href: paths.storeBrand("femme", "Tommy Hilfiger") },
    { name: "Homme", href: paths.storeBrand("homme", "Tommy Hilfiger") },
  ],
};

export const oceanBanner = {
  title: "NOTRE MISSION",
  name: "Développement durable",
  description:
    "Nous nous efforçons de réduire constamment l'empreinte environnementale de nos produits. Nous investissons une partie de nos revenus dans des projets de captation du carbone qui protègent la biodiversité.",
  imagePath: "/frank-mckenna-OD9EOzfSOh0-unsplash.jpg",
};

export const brandsMen = [
  {
    id: 1,
    name: "Lacoste",
    sex: "homme",
    imagePath: "/HOMME_Lacoste.jpg",
    description:
      "Fondée en 1933 par le tennisman René Lacoste, surnommé le crocodile, Lacoste s’est imposée comme un symbole du fashion-sport.",
  },
  {
    id: 2,
    name: "Tommy Hilfiger",
    sex: "homme",
    imagePath: "/HOMME_Tommy.jpg",
    description:
      "Une des marques de lifestyle les plus reconnues au monde. Depuis 1985 elle célèbre l'essence du style américain classique.",
  },
  {
    id: 3,
    name: "Marvin&Co",
    sex: "homme",
    imagePath: "/Homme_Marvin.jpg",
    description:
      "Marvin&Co est une marque parisienne, qui se distingue au travers de collections à la fois raffinées et décalées.",
  },
];

export const brandsWomen = [
  {
    id: 1,
    name: "IKKS Women",
    sex: "femme",
    imagePath: "/Femme_IKKS.jpg",
    description:
      "IKKS, c’est d’abord une allure. Décomplexée, naturelle et spontanée. Des pièces fortes, des détails boyish et une attitude dont on se souvient.",
  },
  {
    id: 2,
    name: "The Kooples",
    sex: "femme",
    imagePath: "/FEMME_The_Kooples.jpg",
    description:
      "En ouvrant la voie du luxe accessible avec ses silhouettes très identifiables et ses campagnes inoubliables, The Kooples a marqué le style des années 2000.",
  },
  {
    id: 3,
    name: "Georgia Rose",
    sex: "femme",
    imagePath: "/Femme_Georgia-Rose.jpg",
    description:
      "Sara Johnson, fondatrice et directrice de la création impose un nouvel esthétisme : des vêtements modernes et sophistiqués. ",
  },
];

export const tableHeaderItemsProducts = [
  { value: "name", text: "Nom" },
  { value: "", text: "Marque" },
  { value: "", text: "Catégorie" },
  { value: "", text: "Statut" },
  { value: "price", text: "Prix" },
  { value: "", text: "Stock" },
];

export const tableHeaderItemsCustomers = [
  { value: "lastName", text: "Nom" },
  { value: "firstName", text: "Prénom" },
  { value: "", text: "Genre" },
  { value: "", text: "Statut" },
  { value: "", text: "Commandes" },
  { value: "", text: "Montant total" },
];

export const tableHeaderItemsOrders = [
  { value: "id", text: "N°" },
  { value: "lastName", text: "Nom" },
  { value: "firstName", text: "Prénom" },
  { value: "createdAt", text: "Date" },
  { value: "isPaid", text: "Statut" },
  { value: "products", text: "Produits" },
  { value: "total", text: "Montant" },
];

export const tabsTriggersProducts = [
  { value: "all", text: "Tous" },
  { value: "active", text: "Actifs" },
  { value: "non-active", text: "Brouillons" },
  { value: "archived", text: "Archivés" },
];

export const tabsTriggersCustomers = [
  { value: "all", text: "Tous" },
  { value: "active", text: "Actifs" },
  { value: "non-active", text: "Non-actifs" },
];

export const tabsTriggersOrders = [
  { value: "all", text: "Tous" },
  { value: "paid", text: "Payées" },
  { value: "not-paid", text: "Annulées" },
];

export const headerAdminLinks = [
  { href: paths.adminHome(), text: "Dashboard" },
  { href: paths.adminProducts(), text: "Produits" },
  { href: paths.adminOrders(), text: "Commandes" },
  { href: paths.adminCustomers(), text: "Clients" },
  { href: paths.adminSettingsAccount(), text: "Paramètres" },
];
