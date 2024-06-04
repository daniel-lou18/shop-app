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
  adminOrders() {
    return "/admin/orders";
  },
  adminCustomers() {
    return "/admin/customers";
  },
  adminCustomer(customerId: string) {
    return `/admin/customers/${customerId}`;
  },
  adminCustomerAccount(customerId: string) {
    return `/admin/customers/${customerId}/account`;
  },
  adminCustomerAddresses(customerId: string) {
    return `/admin/customers/${customerId}/addresses`;
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
    if (queryParams) return `/auth/user/login?${queryParams}`;
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
  customerOrders(params?: string) {
    if (params) return `/orders/${params}`;
    return "/orders";
  },
  cart(queryParams?: string) {
    if (queryParams) return `/cart?${queryParams}`;
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
  apiCheckout() {
    return "/api/checkout";
  },
};
