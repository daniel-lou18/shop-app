// import DropdownCheckbox from "@/app/(shop)/store/[slug]/[brand]/_components/DropdownCheckbox";
// import DropdownFilter from "./DropdownFilter";
// import ProductsTotal from "./ProductsTotal";
// import { AvailableData } from "./ProductsList";
// import { usePathname } from "next/navigation";
// import { parsePathParams } from "@/helpers/helpers";

// type ProductsControlsProps = AvailableData;
// async function ProductsControls({
//   availableBrands,
//   availableCategories,
//   availableColors,
//   availableSizes,
//   count,
// }: ProductsControlsProps) {
//   const path = usePathname();
//   const params = parsePathParams(path);

//   return (
//     <div className="flex my-6 justify-between">
//       <div className="flex gap-4">
//         <DropdownCheckbox type="color" data={availableColors} />
//         <DropdownCheckbox type="size" data={availableSizes} />
//         {params.brand === "all" && params.slug.includes("all") && (
//           <>
//             <DropdownCheckbox type="brand" data={availableBrands} />
//             <DropdownCheckbox type="category" data={availableCategories} />
//           </>
//         )}
//         {params.brand === "all" && !params.slug.includes("all") && (
//           <DropdownCheckbox type="brand" data={availableBrands} />
//         )}
//         {params.brand !== "all" && (
//           <DropdownCheckbox type="category" data={availableCategories} />
//         )}
//       </div>
//       <div className="flex gap-4">
//         <ProductsTotal total={count} />
//         <DropdownFilter />
//       </div>
//     </div>
//   );
// }

// export default ProductsControls;
