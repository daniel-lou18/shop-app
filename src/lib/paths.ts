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
  adminProducts(queryParams?: string) {
    if (queryParams) return `/admin/products?${queryParams}`;
    return "/admin/products";
  },
  customerProduct(productId: string) {
    return `/products/${productId}`;
  },
  adminProduct(productId: string, queryParams?: string) {
    if (queryParams) return `/admin/products/${productId}?${queryParams}`;
    return `/admin/products/${productId}`;
  },
  adminProductAdd() {
    return "/admin/products/new";
  },
  adminLogin() {
    return "/admin/login";
  },
  adminSuper() {
    return "/admin/signup";
  },
  customerLogin(queryParams?: string) {
    if (queryParams) return `/login?${queryParams}`;
    return "/login";
  },
  customerSignup() {
    return "/signup";
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
