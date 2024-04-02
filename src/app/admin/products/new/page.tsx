import ProductForm from "@/components/products/ProductForm";
import PageHeading1 from "@/components/ui/PageHeading1";

function NewProduct() {
  return (
    <>
      <PageHeading1>Ajouter produit</PageHeading1>
      <ProductForm />
    </>
  );
}

export default NewProduct;
