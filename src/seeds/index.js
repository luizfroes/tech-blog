const seedUser = require("./userSeeds");
const seedPost = require("./PostSeeds");
const seedComment = require("./CommentSeeds");

const { logError } = require("../helpers/logger");
const connection = require("../../config/connection");

const seedAll = async () => {
  try {
    await connection.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");
  } catch (error) {
    logError("DB connection", error.message);
  }

  await seedUser();
  console.log("\n----- USERS SEEDED -----\n");

  await seedPost();
  console.log("\n----- POSTS SEEDED -----\n");

  await seedComment();
  console.log("\n----- COMMENTS SEEDED -----\n");

  process.exit(0);
};

seedAll();
