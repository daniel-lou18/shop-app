// "use client";

// import DropdownFilter from "@/components/ui/DropdownFilter";
// import { useCallback, useEffect, useState } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { Brand, Category } from "@prisma/client";
// import ProductList from "../../products/_components/ProductList";
// import { AllProductsWithVariants } from "@/db/queries/products";

// type FilterProductListProps = {
//   type: "category" | "brand";
//   data: {
//     products: AllProductsWithVariants;
//     availableBrands: Brand[];
//     availableCategories: Category[];
//     availableColors: string[];
//     availableSizes: string[];
//   };
// };

// type FilterValues = {
//   color?: string;
//   size?: string;
//   brand?: string;
//   category?: string;
// };

// const initialState = {
//   color: "all",
//   size: "all",
//   brand: "all",
//   category: "all",
// };

// function FilterProductList({ type, data }: FilterProductListProps) {
//   const [filterValues, setFilterValues] = useState<string>("");
//   const [filteredProducts, setFilteredProducts] =
//     useState<AllProductsWithVariants>(data.products);
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   useEffect(() => {
//     async function updateData() {
//       const result = await fetch(`/api/products?${filterValues}`);
//       const data = await result.json();
//       setFilteredProducts(data.products);
//     }
//     updateData();
//   }, [filterValues]);

//   useEffect(() => {
//     router.push(`${pathname}?${filterValues}`);
//   }, [filterValues, router, pathname]);

//   const handleFilterChange = useCallback(
//     (queryString: string) => {
//       setFilterValues(queryString);
//     },
//     [setFilterValues]
//   );

//   return (
//     <>
//       <div className="flex gap-4 my-6">
//         <DropdownFilter
//           type="color"
//           onFilterChange={handleFilterChange}
//           data={data.availableColors}
//         />
//         <DropdownFilter
//           type="size"
//           onFilterChange={handleFilterChange}
//           data={data.availableSizes}
//         />
//         {type === "category" && (
//           <DropdownFilter
//             type="brand"
//             onFilterChange={handleFilterChange}
//             data={data.availableBrands}
//           />
//         )}
//         {type === "brand" && (
//           <DropdownFilter
//             type="category"
//             onFilterChange={handleFilterChange}
//             data={data.availableCategories}
//           />
//         )}
//       </div>
//       <ProductList products={filteredProducts} />
//     </>
//   );
// }

// export default FilterProductList;
