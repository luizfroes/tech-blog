const { User } = require("../src/models");

const userData = [
  {
    username: "bobsmith",
    email: "bobsmith@email.com",
    password: "Password123",
    first_name: "Bob",
    last_name: "Smith",
  },
  {
    username: "jamesjr",
    email: "jamesjr@email.com",
    password: "Password456",
    first_name: "James",
    last_name: "Jr",
  },
  {
    username: "gracekelly",
    email: "gracekelly@email.com",
    password: "Password789",
    first_name: "Grace",
    last_name: "Kelly",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
