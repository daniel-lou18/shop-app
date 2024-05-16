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
  login() {
    return "/login";
  },
  cart() {
    return "/cart";
  },
  storeSex(sex: string) {
    return `/store/${sex}-all/all`;
  },
  storeBrand(sex: string, brand: string) {
    return `/store/${sex}/${decodeURIComponent(brand)}`;
  },
  storeCategory(sex: string, category: string) {
    return `/store/${sex}-${decodeURIComponent(category)}/all`;
  },
};