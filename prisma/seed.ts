import { PrismaClient, Brand, Category } from "@prisma/client";
const prisma = new PrismaClient();

const sizes = ["XS", "S", "M", "L", "XL"];
const brands = ["Adidas", "Puma", "Reebok", "New Balance", "Nike"];
const categories = [
  "Chaussures",
  "Pantalons",
  "T-Shirts",
  "Sweatshirts",
  "Pulls",
];
const colors = ["Blanc", "Bleu", "Beige", "Rose"];

async function main() {
  await prisma.productVariant.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();

  let nikeBrandId;
  let shoesCategoryId;

  for (const brand of brands) {
    const result = await prisma.brand.create({
      data: {
        name: brand,
      },
    });
    if (result.name === "Nike") {
      nikeBrandId = result.id;
    }
  }

  for (const category of categories) {
    const result = await prisma.category.create({
      data: {
        name: category,
      },
    });
    if (result.name === "Chaussures") {
      shoesCategoryId = result.id;
    }
  }

  const sneakers = await prisma.product.upsert({
    where: { id: "clus3jabi00003cspvmde28lz" },
    update: {},
    create: {
      id: "clus3jabi00003cspvmde28lz",
      name: "Nike Air Max 90",
      description:
        "Enfilez-la et entrez dans la légende. Avec sa conception à la croisée de l'art, de la musique et de la culture, cette chaussure de running vedette a contribué à forger le style des années 90. Portée par des présidents, révolutionnée par différentes collaborations et célébrée avec des coloris rares, elle présente des touches visuelles saisissantes, une semelle extérieure gaufrée et un amorti Air visible pour une chaussure qui sait se renouveler et rester stylée des décennies après sa sortie. Le coloris classique lui insuffle un look ultra-tendance, tandis que les renforts réfléchissants intégrés ornés de logos Swoosh dynamiques apportent une touche stylée.",
      price: 25000,
      imagePath: "/nike_air_max_90_1.png",
      brand: {
        connect: {
          id: nikeBrandId,
        },
      },
      category: {
        connect: {
          id: shoesCategoryId,
        },
      },
    },
  });

  let idx = 1;
  for (const color of colors) {
    for (const size of sizes) {
      await prisma.productVariant.create({
        data: {
          product: {
            connect: {
              id: sneakers.id,
            },
          },
          size,
          color: color,
          price: sneakers.price,
          stockQuantity: 100,
          sku: `${color}-${size}-${Date.now().toString()}`,
          imagePath: `/nike_air_max_90_${idx}.jpeg`,
        },
      });
    }
    idx++;
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (err: unknown) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
