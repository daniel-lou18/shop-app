import ItemsCarousel from "@/components/ui/ItemsCarousel";
import { fetchMenBrands, fetchWomenBrands } from "@/db/queries/brands";
import {
  fetchMenCategories,
  fetchWomenCategories,
} from "@/db/queries/categories";
import { fetchAllProductsWithData } from "@/db/queries/products";
import React from "react";
import MainTop from "./_components/MainTop";

async function MainContent() {
  const products = (await fetchAllProductsWithData()).filter(
    (product) => product.sex === "femme"
  );
  const brandsMen = await fetchMenBrands();
  const brandsWomen = await fetchWomenBrands();
  const categoriesMen = await fetchMenCategories();
  const categoriesWomen = await fetchWomenCategories();

  return (
    <main className="sm:px-8">
      <MainTop />
      <ItemsCarousel type="product" title="Nos bestsellers" items={products} />
      <ItemsCarousel
        type="square"
        title="Marques hommes incontournables"
        items={brandsMen}
      />
      <ItemsCarousel
        type="square"
        title="Marques femmes incontournables"
        items={brandsWomen}
      />
      <ItemsCarousel
        type="circle"
        title="Catégories femmes populaires"
        items={categoriesWomen}
      />
      <ItemsCarousel
        type="circle"
        title="Catégories hommes populaires"
        items={categoriesMen}
      />
    </main>
  );
}

export default MainContent;
