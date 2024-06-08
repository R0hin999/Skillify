const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();
async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "IT & Software" },
        { name: "Business" },
        { name: "Art & Design" },
        { name: "Music" },
        { name: "Film & Photography" },
        { name: "Health & Fitness" },
        { name: "Accounting" },
      ],
    });
    console.log("SUCCESS");
  } catch (error) {
    console.log("Error sedding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
