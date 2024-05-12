import { Params } from "@/db/queries/products";

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

export function splitCapitalizeUri(uri: string) {
  const [name, sex] = decodeURIComponent(uri).split("-");
  if (!sex) return name.at(0)?.toUpperCase() + name.slice(1);
  return name.at(0)?.toUpperCase() + name.slice(1) + " - " + sex;
}

export function capitalizeString(string: string | undefined) {
  if (!string) return null;
  return string.at(0)?.toUpperCase() + string.slice(1);
}

export const hashMap = {
  color: "Couleur",
  size: "Taille",
  brand: "Marque",
  category: "Catégorie",
};

export function formatParamsToString(params: Params) {
  const [slug, brand] = Object.values(params);
  const [decodedSex, decodedCategory] = decodeURIComponent(slug).split("-");
  const decodedBrand = decodeURIComponent(brand);

  return `${
    decodedCategory !== "all" && decodedCategory
      ? capitalizeString(decodedCategory)
      : ""
  } ${decodedBrand !== "all" ? capitalizeString(decodedBrand) : ""} ${
    decodedCategory === "all" && decodedBrand === "all"
      ? `Vêtements ${decodedSex}`
      : decodedSex
  }`;
}

export function parseApiParams(pathname: string) {
  const parsedParams = { slug: "", brand: "" };
  parsedParams.slug = pathname.split("/")[3];
  parsedParams.brand = pathname.split("/")[4];
  return parsedParams;
}

export function parseApiSearchParams(searchParams: URLSearchParams) {
  const parsedSearchParams: { [key: string]: string | string[] } = {};
  Array.from(searchParams.entries()).forEach(([key, value]) => {
    if (!parsedSearchParams[key]) parsedSearchParams[key] = value;
    else if (typeof parsedSearchParams[key] === "string")
      parsedSearchParams[key] = [parsedSearchParams[key] as string, value];
    else if (Array.isArray(parsedSearchParams[key]))
      (parsedSearchParams[key] as string[]).push(value);
  });
  return parsedSearchParams;
}
