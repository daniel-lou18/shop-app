import { PrismaClient, Brand, Category } from "@prisma/client";
const prisma = new PrismaClient();

const sizes = ["XS", "S", "M", "L", "XL"];

async function main() {
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
          id: "7f7fa6af-3daf-426f-b572-1b3fd4c9e7ca",
        },
      },
      category: {
        connect: {
          id: "3e95026e-cd0a-4c1b-b794-11e4374a6b2b",
        },
      },
    },
  });
  await prisma.productVariant.deleteMany();

  for (const size of sizes) {
    await prisma.productVariant.create({
      data: {
        product: {
          connect: {
            id: sneakers.id,
          },
        },
        size,
        stockQuantity: 100,
        color: "blanc",
        sku: `blanc-${size}-${Date.now().toString()}`,
      },
    });
  }
  //   sizes.forEach(async (size) => {
  //     await prisma.productVariant.create({
  //       data: {
  //         product: {
  //           connect: {
  //             id: sneakers.id,
  //           },
  //         },
  //         size,
  //         stockQuantity: 100,
  //         color: "beige",
  //         sku: `beige-${size}-${Date.now().toString()}`,
  //       },
  //     });
  //   });
  //   sizes.forEach(async (size) => {
  //     await prisma.productVariant.create({
  //       data: {
  //         product: {
  //           connect: {
  //             id: sneakers.id,
  //           },
  //         },
  //         size,
  //         stockQuantity: 100,
  //         color: "bleu",
  //         sku: `bleu-${size}-${Date.now().toString()}`,
  //       },
  //     });
  //   });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (err: unknown) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
