"use client";

import { TAKE } from "@/db/queries/products";
import { SkeletonCard } from "@/components/skeletons/SkeletonCard";
import { Variant } from "@/features/variants/Variant";
import VariantCard from "@/components/common/card/VariantCard";
import BaseComponent from "@/components/ui/BaseComponent";

type ProductsListProps = {
  data: Variant[];
  isLoading: boolean;
};

/* Presentational component:
 * presenting a list of products
 */

function ProductsList({ data, isLoading }: ProductsListProps) {
  return (
    <BaseComponent
      tag="ul"
      className={`${
        isLoading ? "opacity-30" : ""
      } grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8`}
    >
      {data?.length === 0 &&
        Array.from({ length: TAKE }, (_, i) => <SkeletonCard key={i} />)}
      {data?.length > 0 &&
        data.map((variant) => (
          <VariantCard
            item={variant}
            key={variant.id}
            className="border border-solid border-gray-100 rounded-sm"
          />
        ))}
      {data?.length === 0 && !isLoading && <p>Aucun produit à afficher</p>}
    </BaseComponent>
  );
}

export default ProductsList;
