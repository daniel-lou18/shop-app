// import ProductsCarousel from "@/components/ui/ProductsCarousel";
// import { fetchMenBrands, fetchWomenBrands } from "@/db/queries/brands";
// import {
//   fetchMenCategories,
//   fetchWomenCategories,
// } from "@/db/queries/categories";
// import { fetchAllProductsWithData } from "@/db/queries/products";
// import React from "react";

// async function MainContent() {
//   const products = (await fetchAllProductsWithData()).filter(
//     (product) => product.sex === "femme"
//   );
//   const brandsMen = await fetchMenBrands();
//   const brandsWomen = await fetchWomenBrands();
//   const categoriesMen = await fetchMenCategories();
//   const categoriesWomen = await fetchWomenCategories();

//   return (
//     <div className="sm:px-8">
//       <ProductsCarousel
//         type="product"
//         title="Nos bestsellers"
//         products={products}
//       />
//       <ProductsCarousel
//         type="square"
//         title="Marques hommes incontournables"
//         products={brandsMen}
//       />
//       <ProductsCarousel
//         type="square"
//         title="Marques femmes incontournables"
//         products={brandsWomen}
//       />
//       <ProductsCarousel
//         type="circle"
//         title="Catégories femmes populaires"
//         products={categoriesWomen}
//       />
//       <ProductsCarousel
//         type="circle"
//         title="Catégories hommes populaires"
//         products={categoriesMen}
//       />
//     </div>
//   );
// }

// export default MainContent;
