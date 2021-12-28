const seedUsers = require("./userSeeds");
const seedPosts = require("./PostSeeds");
const seedComments = require("./CommentSeeds");

const connection = require("../config/connection");

const { logError } = require("../src/helpers/logger");

const seedAll = async () => {
  try {
    await connection.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");
  } catch (error) {
    logError("BD connection", error.message);
  }

  await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  await seedPosts();
  console.log("\n----- POSTS SEEDED -----\n");

  await seedComments();
  console.log("\n----- COMMENTS SEEDED -----\n");

  process.exit(0);
};

seedAll();
