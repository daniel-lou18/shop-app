// "use client";

// import { Button } from "@/components/ui/button";
// import ProductDetails, { ProductDetailsProps } from "./ProductDetails";
// import ProductImages from "./ProductImages";
// import ProductVariants from "./ProductVariants";
// import { type AddData, type EditData } from "../page";
// import ProductHeader from "./ProductHeader";

// function ProductForm({ type, id, data }: ProductDetailsProps) {
//   return (
//     <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
//       <ProductHeader type={type} />
//       <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
//         <ProductDetails type={type} data={data} id={id} />
//         <ProductImages
//           imagePaths={
//             type === "edit"
//               ? (data as EditData)?.variantsByColor.map(
//                   (variant) => variant.imagePath
//                 )
//               : null
//           }
//           type={type}
//         />
//         <ProductVariants data={type === "edit" ? data : null} />
//       </div>
//       <div className="flex items-center justify-center gap-2 md:hidden">
//         <Button type="button" variant="outline" size="sm">
//           Annuler
//         </Button>
//         <Button type="submit" size="sm">
//           Sauvegarder
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default ProductForm;
