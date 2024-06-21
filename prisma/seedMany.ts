import { capitalizeString } from "../src/lib/parsers";
import { BRANDS, CATEGORIES } from "../src/helpers/constants";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colorsMen = ["blanc", "bleu"];
const colorsWomen = ["rouge", "bleu", "noir"];

async function main() {
  await prisma.product.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();

  let brandIdsMen = [];
  let categoryIdsMen = [];
  let brandIdsWomen = [];
  let categoryIdsWomen = [];

  for (const brand of BRANDS.men) {
    const result = await prisma.brand.create({
      data: {
        name: brand,
        sex: "homme",
      },
    });
    brandIdsMen.push(result.id);
  }

  for (const brand of BRANDS.women) {
    const result = await prisma.brand.create({
      data: {
        name: brand,
        sex: "femme",
      },
    });
    brandIdsWomen.push(result.id);
  }

  for (const category of CATEGORIES.men) {
    const result = await prisma.category.create({
      data: {
        name: category,
        sex: "homme",
      },
    });
    categoryIdsMen.push(result.id);
  }

  for (const category of CATEGORIES.women) {
    const result = await prisma.category.create({
      data: {
        name: category,
        sex: "femme",
      },
    });
    categoryIdsWomen.push(result.id);
  }

  for (let i = 0; i < 100; i++) {
    const categoryIdx = Math.floor(Math.random() * categoryIdsMen.length);
    const result = await prisma.product.create({
      data: {
        name: `${capitalizeString(
          CATEGORIES.men[categoryIdx]?.split(" ")?.[0].slice(0, -1)
        )} en cotton bio`,
        description: `Découvrez notre ${CATEGORIES.men[categoryIdx]}, un modèle confortable et tendance, idéal pour un look décontracté. Avec sa coupe large et ses épaules tombantes, ce sweat-shirt offre une allure détendue et stylée. La capuche sans cordon coulissant ajoute une touche de simplicité et de praticité, tandis que la poche déchirée à l'avant apporte une note d'originalité. Les deux poches fendues de chaque côté sont parfaites pour garder vos mains au chaud ou pour ranger vos essentiels. Le logo Tape Type est fièrement affiché à l'avant et à l'arrière, ajoutant une touche de personnalité à ce modèle. L'effet usé et délavé donne à ce sweat-shirt une apparence vintage et tendance. Fabriqué au Portugal avec soin, ce sweat-shirt est un choix idéal pour les journées décontractées ou pour compléter votre tenue de rue. Pour préserver la qualité et l'apparence de ce modèle, nous vous recommandons de le laver à la main.`,
        price: Math.floor((Math.random() * (500000 - 50000)) / 50) * 50 + 50000,
        imagePath: "/sweat_bleu_1.jpg",
        sex: "homme",
        brand: {
          connect: {
            id: brandIdsMen[Math.floor(Math.random() * brandIdsMen.length)],
          },
        },
        category: {
          connect: {
            id: categoryIdsMen[categoryIdx],
          },
        },
      },
    });

    for (const color of colorsMen) {
      for (const size of sizes) {
        await prisma.productVariant.create({
          data: {
            product: {
              connect: {
                id: result.id,
              },
            },
            size,
            color: color,
            price: result.price,
            stockQuantity: 100,
            sku: `${color}-${size}-${Date.now().toString()}`,
            images: [
              `/sweat_${color}_1.jpg`,
              `/sweat_${color}_2.jpg`,
              `/sweat_${color}_3.jpg`,
              `/sweat_${color}_4.jpg`,
            ],
          },
        });
      }
    }
  }

  for (let i = 0; i < 100; i++) {
    const categoryIdx = Math.floor(Math.random() * categoryIdsWomen.length);
    const result = await prisma.product.create({
      data: {
        name: `${capitalizeString(
          CATEGORIES.women[categoryIdx]?.split(" ")?.[0].slice(0, -1)
        )} Gala en lin mélangé`,
        description: `Ce ${CATEGORIES.women[categoryIdx]} est un véritable bijou de style et de confort. Confectionné avec soin à partir d'un mélange de laines de qualité supérieure, il offre une chaleur et une douceur incomparables pour affronter les journées les plus fraîches. Son design élégant et intemporel se distingue par un col revers qui ajoute une touche de sophistication à l'ensemble. La taille ceinturée vient subtilement marquer la silhouette, apportant une note de féminité et de raffinement. Les trois poches avant, pratiques et fonctionnelles, sont parfaites pour y glisser vos mains ou vos petits essentiels du quotidien. Quant aux manches longues, elles assurent une protection optimale contre le froid tout en prolongeant la ligne élégante du manteau. Ce manteau Claudie Pierlot est un choix parfait pour celles qui recherchent un vêtement d'extérieur à la fois chic et confortable. Il s'accordera facilement avec toutes vos tenues, des plus décontractées aux plus habillées.`,
        price: Math.floor((Math.random() * (500000 - 50000)) / 50) * 50 + 50000,
        imagePath: "/robe_rouge_1.jpg",
        sex: "femme",
        brand: {
          connect: {
            id: brandIdsWomen[Math.floor(Math.random() * brandIdsWomen.length)],
          },
        },
        category: {
          connect: {
            id: categoryIdsWomen[categoryIdx],
          },
        },
      },
    });

    for (const color of colorsWomen) {
      for (const size of sizes) {
        await prisma.productVariant.create({
          data: {
            product: {
              connect: {
                id: result.id,
              },
            },
            size,
            color: color,
            price: result.price,
            stockQuantity: 100,
            sku: `${color}-${size}-${Date.now().toString()}`,
            images: [
              `/robe_${color}_1.jpg`,
              `/robe_${color}_2.jpg`,
              `/robe_${color}_3.jpg`,
              `/robe_${color}_4.jpg`,
            ],
          },
        });
      }
    }
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (err: unknown) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
