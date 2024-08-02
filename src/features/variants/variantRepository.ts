import { nextApiClient } from "@/app/api/nextApiClient";
import { VariantsWithProduct } from "@/db/queries/variants";
import { dtosToVariants } from "./transformDto";

async function findMany(url: string) {
  const data = await nextApiClient.get<VariantsWithProduct>(url);
  return dtosToVariants(data);
}

const VariantRepository = { findMany };

export default VariantRepository;
