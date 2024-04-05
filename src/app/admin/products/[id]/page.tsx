import ProductEdit from "@/components/product/ProductEdit";

type ProductDetailsProps = {
  params: {
    id: string;
  };
};

function ProductDetailsAdmin({ params }: ProductDetailsProps) {
  console.log(params.id);
  return <ProductEdit id={params.id} />;
}

export default ProductDetailsAdmin;
