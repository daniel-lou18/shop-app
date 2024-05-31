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
  adminCustomers() {
    return "/admin/customers";
  },
  adminSettings() {
    return "/admin/settings";
  },
  adminSettingsAccount() {
    return "/admin/settings/account";
  },
  adminSettingsShop() {
    return "/admin/settings/shop";
  },
  adminSignIn(queryParams?: string) {
    if (queryParams) return `/login?${queryParams}`;
    return "/auth/admin/login";
  },
  adminSignUp() {
    return "/auth/admin/signup";
  },
  customerSignIn(queryParams?: string) {
    if (queryParams) return `/login?${queryParams}`;
    return "/auth/user/login";
  },
  customerSignUp() {
    return "/auth/user/signup";
  },
  customerSettings() {
    return "/settings";
  },
  customerSettingsAccount() {
    return "/settings/account";
  },
  customerSettingsAddresses() {
    return "/settings/addresses";
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
