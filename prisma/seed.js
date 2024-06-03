const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Crear usuarios con perfiles y ventas asociadas
  const user1 = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
      profile: {
        create: {
          bio: "Software Developer",
          role: "ADMIN",
        },
      },
      sales: {
        create: [
          {
            amount: 100.0,
            product: {
              create: {
                name: "Product A",
                price: 25.0,
              },
            },
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
      profile: {
        create: {
          bio: "Sales Manager",
          role: "WORKER",
        },
      },
      sales: {
        create: [
          {
            amount: 200.0,
            product: {
              create: {
                name: "Product B",
                price: 50.0,
              },
            },
          },
        ],
      },
    },
  });

  // Crear productos adicionales
  const productC = await prisma.product.create({
    data: {
      name: "Product C",
      price: 30.0,
    },
  });

  console.log({ user1, user2, productC });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
