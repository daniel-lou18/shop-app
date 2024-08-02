import VariantRepository from "./variantRepository";
import { VariantService } from "./VariantService";

const variantService = new VariantService(VariantRepository);
export default variantService;
