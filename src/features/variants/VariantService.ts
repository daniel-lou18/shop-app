import { ReadonlyURLSearchParams } from "next/navigation";
import { type IVariantRepository } from "./interface";

export class VariantService {
  constructor(private repo: IVariantRepository) {}

  // example url: store/homme?brand=Balenciaga&category=chemises&color=bleu&size=M
  getMany(path: string, searchParams: ReadonlyURLSearchParams) {
    return this.repo.findMany(`${path}?${searchParams.toString()}`);
  }
}
