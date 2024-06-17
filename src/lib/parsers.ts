import { Params } from "@/db/queries/products";
import { brandsMen } from "@/helpers/constants";
import { ShopifyProduct } from "@/types";
import { paths } from "./paths";

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

export function getProductCardVariables(
  type: "product" | "square",
  item: ShopifyProduct | (typeof brandsMen)[0]
) {
  let href = "";
  let title = "";
  let description = "";
  let imageHeight = 400;
  let imageWidth = 400;
  let imageSrc = "";
  let imageAlt = "";
  if (type === "product" && "featuredImage" in item) {
    href = paths.customerProduct(item.id);
    title = item.vendor;
    description = item.title;
    imageHeight = item.featuredImage.height;
    imageWidth = item.featuredImage.width;
    imageSrc = item.featuredImage.url || "/placeholder.svg";
    imageAlt = item.featuredImage.altText;
  }
  if (type === "square" && "imagePath" in item) {
    href = paths.storeBrand(item.sex, item.name);
    title = item.name;
    description = item.description;
    imageHeight = 400;
    imageWidth = 400;
    imageSrc = item?.imagePath || "/placeholder.svg";
    imageAlt = item.name;
  }
  return {
    href,
    title,
    description,
    imageHeight,
    imageWidth,
    imageSrc,
    imageAlt,
  };
}
