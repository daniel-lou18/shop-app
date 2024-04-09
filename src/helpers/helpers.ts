export function centsToEuros(priceInCents: number) {
  return (priceInCents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}

export const paths = {
  customerHome() {
    return "/";
  },
  adminHome() {
    return "/admin";
  },
  customerProducts() {
    return "/products";
  },
  adminProducts() {
    return "/admin/products";
  },
  customerProduct(productId: string) {
    return `/products/${productId}`;
  },
  adminProduct(productId: string) {
    return `/admin/products/${productId}`;
  },
  adminProductAdd() {
    return "/admin/products/new";
  },
  adminLogin() {
    return "/admin/login";
  },
};
