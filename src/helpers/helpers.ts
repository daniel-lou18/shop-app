import { OrderWithItems } from "@/db/queries/orders";
import { OrderWithOderItemsAndVariants } from "@/db/queries/users";

export function centsToEuros(priceInCents: number) {
  return (priceInCents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}

export function calculateOrderPrice(order: OrderWithOderItemsAndVariants) {
  const totalPrice = order.orderItems.reduce((acc, item) => {
    return acc + item.quantity * item.variant.price;
  }, 0);
  return totalPrice;
}

export function calculateOrdersPrice(orders: OrderWithOderItemsAndVariants[]) {
  const totalPrice = orders.reduce((acc, order) => {
    if (order.isPaid) return acc + calculateOrderPrice(order);
    return acc;
  }, 0);
  return totalPrice;
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
