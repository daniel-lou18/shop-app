import { Params } from "@/db/queries/products";
import { Slug } from "@/types";

export function splitCapitalizeUri(uri: string) {
  const [name, sex] = decodeURIComponent(uri).split("-");
  if (!sex) return name.at(0)?.toUpperCase() + name.slice(1);
  return name.at(0)?.toUpperCase() + name.slice(1) + " - " + sex;
}

export function capitalizeString(string: string | undefined) {
  if (!string) return null;
  return string.at(0)?.toUpperCase() + string.slice(1).toLowerCase();
}

export function strNoAccent(string: string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function formatSlugToTitle(slug: Slug) {
  const [sex, category, brand] = slug;
  const decodedCategory = category && decodeURIComponent(category);
  const decodedBrand = brand && decodeURIComponent(brand);
  let title;

  if (decodedBrand)
    title = `Brandstore ${capitalizeString(decodedBrand)} ${sex}`;
  else if (!decodedBrand && !decodedCategory) title = `Vêtemens ${sex}`;
  else title = `${capitalizeString(decodedCategory)} ${sex}`;

  return title;
}

export function parseApiParams(pathname: string) {
  return pathname
    .split("/")
    .slice(3)
    .map((chars) => decodeURIComponent(chars));
}

export function parsePathParams(pathname: string) {
  return pathname
    .split("/")
    .slice(2)
    .map((chars) => decodeURIComponent(chars));
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
