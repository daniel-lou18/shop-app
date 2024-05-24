import { Params } from "@/db/queries/products";

export function splitCapitalizeUri(uri: string) {
  const [name, sex] = decodeURIComponent(uri).split("-");
  if (!sex) return name.at(0)?.toUpperCase() + name.slice(1);
  return name.at(0)?.toUpperCase() + name.slice(1) + " - " + sex;
}

export function capitalizeString(string: string | undefined) {
  if (!string) return null;
  return string.at(0)?.toUpperCase() + string.slice(1);
}

export function strNoAccent(string: string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

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

export function parsePathParams(pathname: string) {
  const parsedParams = { slug: "", brand: "" };
  parsedParams.slug = pathname.split("/")[2];
  parsedParams.brand = pathname.split("/")[3];
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
