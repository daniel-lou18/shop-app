import { ReadonlyURLSearchParams } from "next/navigation";
import { type IVariantRepository } from "./interface";

export class VariantService {
  constructor(private repo: IVariantRepository) {}

  getMany(path: string, searchParams: ReadonlyURLSearchParams) {
    return this.repo.findMany(`${path}?${searchParams.toString()}`);
  }
}
