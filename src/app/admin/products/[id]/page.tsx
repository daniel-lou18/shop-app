import ProductEdit from "@/components/products/ProductEdit";

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
