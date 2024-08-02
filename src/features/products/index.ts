import ProductRepository from "./productRepository";
import { ProductService } from "./ProductService";

const productService = new ProductService(ProductRepository);

export default productService;
