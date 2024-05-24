export function centsToEuros(priceInCents: number) {
  return (priceInCents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}

export const hashMap = {
  color: "Couleur",
  size: "Taille",
  brand: "Marque",
  category: "Catégorie",
};

export const mapToFrench = {
  name: "Nom",
  description: "Description",
  price: "Prix",
  quantity: "Quantité",
  category: "Catégorie",
  brand: "Marque",
  color: "Couleur",
  size: "Taille",
  image: "Image",
  firstName: "Prénom",
  lastName: "Nom",
  email: "Email",
  country: "Pays",
  address: "Adresse",
  city: "Ville",
  state: "Département",
  zip: "Code postal",
};
