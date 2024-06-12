// export async function fetchProductsByCategory(
//   slug: string
// ): Promise<AllProductsWithData> {
//   const [name, sex]: [string, Sex] = decodeURIComponent(slug).split("-") as [
//     string,
//     Sex
//   ];
//   if (name === "femme" || name === "homme") {
//     return await db.product.findMany({
//       where: { sex: name },
//       include: { brand: true, category: true },
//     });
//   }

//   return await db.product.findMany({
//     where: { category: { name, sex } },
//     include: {
//       brand: true,
//       category: true,
//     },
//   });
// }

// export async function fetchProductsByBrand(
//   slug: string
// ): Promise<AllProductsWithData> {
//   const [name, sex]: [string, Sex] = decodeURIComponent(slug).split("-") as [
//     string,
//     Sex
//   ];

//   return await db.product.findMany({
//     where: { brand: { name, sex } },
//     include: {
//       brand: true,
//       category: true,
//     },
//   });
// }

// export async function fetchAllProductsWithVariants(): Promise<
//   FetchResult<AllProductsWithVariants>
// > {
//   try {
//     const result = await db.product.findMany({
//       include: {
//         brand: true,
//         category: true,
//         variants: true,
//       },
//     });
//     if (!result || result.length === 0)
//       throw new Error("Nous n'avons trouvé aucun produit");
//     return {
//       success: true,
//       data: result,
//     };
//   } catch (err) {
//     return handleFetchError(
//       err,
//       "Une erreur est survenue lors de la récupération des produits"
//     );
//   }
// }

// export async function fetchAllProductsWithTotalStock(searchParams?: {}): Promise<
//   FetchResult<AllProductsWithStock>
// > {
//   try {
//     const result = await db.product.findMany({
//       include: {
//         brand: true,
//         category: true,
//         variants: true,
//       },
//       orderBy: searchParams,
//     });

//     if (!result || result.length === 0)
//       throw new Error("Nous n'avons retrouvé aucun produit");
//     const data = addTotalStockToProducts(result);
//     return {
//       success: true,
//       data,
//     };
//   } catch (err) {
//     return handleFetchError(
//       err,
//       "Une erreur est survenue lors de la récupération des produits"
//     );
//   }
// }
