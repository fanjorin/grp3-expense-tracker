import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.budget.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.user.deleteMany();

  // Create demo users
  const user1 = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "bob@example.com",
      name: "Bob",
    },
  });

  // Create demo expenses
  await prisma.expense.create({
    data: {
      userId: user1.id,
      category: "Food",
      amount: 25.5,
      description: "Lunch at cafe",
    },
  });

  await prisma.expense.create({
    data: {
      userId: user1.id,
      category: "Transport",
      amount: 15.0,
      description: "Taxi ride",
    },
  });

  await prisma.expense.create({
    data: {
      userId: user2.id,
      category: "Food",
      amount: 45.0,
      description: "Dinner at restaurant",
    },
  });

  // Create demo budgets
  await prisma.budget.create({
    data: {
      userId: user1.id,
      category: "Food",
      limit: 500.0,
    },
  });

  await prisma.budget.create({
    data: {
      userId: user1.id,
      category: "Transport",
      limit: 200.0,
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
