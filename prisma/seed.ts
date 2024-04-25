import { BRANDS, CATEGORIES } from "../src/helpers/constants";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colorsMen = ["blanc", "bleu"];
const colorsWomen = ["beige", "marron"];

async function main() {
  await prisma.productVariant.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();

  let balenciagaId;
  let claudieId;
  let pullsCategoryId;
  let manteauxId;

  for (const brand of BRANDS.men) {
    const result = await prisma.brand.create({
      data: {
        name: brand,
        sex: "homme",
      },
    });
    if (result.name === "Balenciaga") {
      balenciagaId = result.id;
    }
  }

  for (const brand of BRANDS.women) {
    const result = await prisma.brand.create({
      data: {
        name: brand,
        sex: "femme",
      },
    });
    if (result.name === "Claudie Pierlot") {
      claudieId = result.id;
    }
  }

  for (const category of CATEGORIES.men) {
    const result = await prisma.category.create({
      data: {
        name: category,
        sex: "homme",
      },
    });
    if (result.name === "pulls et gilets") {
      pullsCategoryId = result.id;
    }
  }

  for (const category of CATEGORIES.women) {
    const result = await prisma.category.create({
      data: {
        name: category,
        sex: "femme",
      },
    });
    if (result.name === "vestes et manteaux") {
      manteauxId = result.id;
    }
  }

  const balenciagaPull = await prisma.product.create({
    data: {
      name: "Hoodie Ripped Pocket Tape Type Fit Large en molleton bouclé",
      description:
        "Découvrez notre sweat-shirt en molleton bouclé, un modèle unisexe confortable et tendance, idéal pour un look décontracté. Avec sa coupe large et ses épaules tombantes, ce sweat-shirt offre une allure détendue et stylée. La capuche sans cordon coulissant ajoute une touche de simplicité et de praticité, tandis que la poche déchirée à l'avant apporte une note d'originalité. Les deux poches fendues de chaque côté sont parfaites pour garder vos mains au chaud ou pour ranger vos essentiels. Le logo Tape Type est fièrement affiché à l'avant et à l'arrière, ajoutant une touche de personnalité à ce modèle. L'effet usé et délavé donne à ce sweat-shirt une apparence vintage et tendance. Fabriqué au Portugal avec soin, ce sweat-shirt est un choix idéal pour les journées décontractées ou pour compléter votre tenue de rue. Pour préserver la qualité et l'apparence de ce modèle, nous vous recommandons de le laver à la main.",
      price: 120000,
      imagePath: "/balenciaga_blanc.jpg",
      sex: "homme",
      brand: {
        connect: {
          id: balenciagaId,
        },
      },
      category: {
        connect: {
          id: pullsCategoryId,
        },
      },
    },
  });

  const claudieManteau = await prisma.product.create({
    data: {
      name: "Manteau mi-long Gema en laine mélangée",
      description:
        "Ce manteau mi-long de la marque Claudie Pierlot est un véritable bijou de style et de confort. Confectionné avec soin à partir d'un mélange de laines de qualité supérieure, il offre une chaleur et une douceur incomparables pour affronter les journées les plus fraîches. Son design élégant et intemporel se distingue par un col revers qui ajoute une touche de sophistication à l'ensemble. La taille ceinturée vient subtilement marquer la silhouette, apportant une note de féminité et de raffinement. Les trois poches avant, pratiques et fonctionnelles, sont parfaites pour y glisser vos mains ou vos petits essentiels du quotidien. Quant aux manches longues, elles assurent une protection optimale contre le froid tout en prolongeant la ligne élégante du manteau. Ce manteau Claudie Pierlot est un choix parfait pour celles qui recherchent un vêtement d'extérieur à la fois chic et confortable. Il s'accordera facilement avec toutes vos tenues, des plus décontractées aux plus habillées.",
      price: 45000,
      imagePath: "/224gema_beige.webp",
      sex: "femme",
      brand: {
        connect: {
          id: claudieId,
        },
      },
      category: {
        connect: {
          id: manteauxId,
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
              id: balenciagaPull.id,
            },
          },
          size,
          color: color,
          price: balenciagaPull.price,
          stockQuantity: 100,
          sku: `${color}-${size}-${Date.now().toString()}`,
          imagePath: `/balenciaga_${color}.jpg`,
        },
      });
    }
  }

  for (const color of colorsWomen) {
    for (const size of sizes) {
      await prisma.productVariant.create({
        data: {
          product: {
            connect: {
              id: claudieManteau.id,
            },
          },
          size,
          color: color,
          price: claudieManteau.price,
          stockQuantity: 100,
          sku: `${color}-${size}-${Date.now().toString()}`,
          imagePath: `/224gema_beige.webp`,
        },
      });
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
