import { Variant } from "./Variant";

export interface IVariantRepository {
  findMany: (url: string) => Promise<Variant[]>;
}
