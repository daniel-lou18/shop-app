import { OrderWithOrderItemsAndVariants } from "@/db/queries/users";
import { AllBrands } from "@/db/queries/brands";
import { AllCategories } from "@/db/queries/categories";
import { navigationInitialData } from "@/helpers/constants";
import { CartItem } from "@/context/cart-context";

export function centsToEuros(priceInCents: number) {
  return (priceInCents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}

export function calculateOrderPrice(order: OrderWithOrderItemsAndVariants) {
  const totalPrice = order.orderItems.reduce((acc, item) => {
    return acc + item.quantity * item.variant.price;
  }, 0);
  return totalPrice;
}

export function calculateOrdersPrice(orders: OrderWithOrderItemsAndVariants[]) {
  const totalPrice = orders.reduce((acc, order) => {
    if (order.isPaid) return acc + calculateOrderPrice(order);
    return acc;
  }, 0);
  return totalPrice;
}

export function calculateTotalCartPrice(cartItems: CartItem[]) {
  return cartItems.reduce((acc, item) => acc + item.price, 0);
}

export function mapCartPriceToMessage(price: number) {
  if (!price) return "Retours gratuits sous 14 jours";
  if (price < 30)
    return "Frais de livraison offerts à partir de 30€ de commandes";
  if (price >= 30)
    return "Code promo PROMO150 : 15 % de réduction sur toute commande supérieure à 150 €";
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

export function createNavigationData(
  data: {
    dataId: string;
    sections: { id: string; name: string; items: AllCategories | AllBrands }[];
  }[],
  initialData: typeof navigationInitialData
) {
  const result = initialData.map((initialDataItem) => {
    const newSections = data.find(
      ({ dataId }) => initialDataItem.id === dataId
    )?.sections;
    if (!newSections?.length) return initialDataItem;
    return {
      ...initialDataItem,
      sections: [...newSections],
    };
  });
  return result;
}
