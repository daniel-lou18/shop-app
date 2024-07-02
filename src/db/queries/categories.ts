import { db } from "@/db";
import { Category, Sex } from "@prisma/client";
import { FetchResult } from "./products";
import { handleFetchError } from "@/lib/errors";
import { NavbarData } from "@/components/layout/navigation/Navbar";
import { fetchBrands } from "./brands";
import { createNavigationData } from "@/helpers/helpers";
import { navigationInitialData } from "@/helpers/constants";

export type AllCategories = Category[];

export async function fetchCategoriesAndBrands(): Promise<
  FetchResult<ReturnType<typeof createNavigationData>>
> {
  try {
    const [
      categoriesMenResult,
      categoriesWomenResult,
      brandsMenResult,
      brandsWomenResult,
    ] = await Promise.all([
      fetchCategories("homme"),
      fetchCategories("femme"),
      fetchBrands("homme"),
      fetchBrands("femme"),
    ]);

    if (
      !categoriesMenResult.success ||
      !categoriesWomenResult.success ||
      !brandsMenResult.success ||
      !brandsWomenResult.success
    ) {
      throw Error(
        "Une erreur est survenue lors de la récupération des categories et/ou des marques"
      );
    }
    const data = createNavigationData(
      [
        {
          dataId: "femme",
          sections: [
            {
              id: "categories",
              name: "Catégories",
              items: [...categoriesWomenResult.data],
            },
            {
              id: "brands",
              name: "Marques",
              items: [...brandsWomenResult.data],
            },
          ],
        },
        {
          dataId: "homme",
          sections: [
            {
              id: "categories",
              name: "Catégories",
              items: [...categoriesMenResult.data],
            },
            {
              id: "brands",
              name: "Marques",
              items: [...categoriesWomenResult.data],
            },
          ],
        },
      ],
      navigationInitialData
    );
    return {
      success: true,
      data,
    };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des categories et des marques"
    );
  }
}

export async function fetchCategories(
  sex?: Sex
): Promise<FetchResult<AllCategories>> {
  try {
    const result = await db.category.findMany({
      where: { sex },
      orderBy: { name: "asc" },
    });
    return { success: true, data: result };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des categories"
    );
  }
}

export async function fetchCategoriesByBrands(
  sex?: Sex,
  brands?: string[] | undefined
): Promise<FetchResult<AllCategories>> {
  try {
    const result = await db.category.findMany({
      where: {
        sex,
        products: { some: { brand: { name: { in: brands } } } },
      },
      orderBy: { name: "asc" },
    });
    return { success: true, data: result };
  } catch (err) {
    return handleFetchError(
      err,
      "Une erreur est survenue lors de la récupération des categories"
    );
  }
}
