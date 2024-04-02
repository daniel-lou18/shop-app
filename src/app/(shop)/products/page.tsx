import ProductCard from "@/components/products/ProductCard";

async function getProducts() {
  await new Promise((res) => setTimeout(res, 1500));
  const res = await fetch("https://dummyjson.com/products", {
    cache: "no-store",
  });
  const products = await res.json();
  return products.products;
}

type Products = {
  id: number;
  title: string;
  description: string;
  images: string[];
};

async function CustomerProducts() {
  const products: Products[] = await getProducts();
  return (
    <>
      <h2>CustomerProducts</h2>
      <div className="grid grid-cols-3">
        {products.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </>
  );
}

export default CustomerProducts;
