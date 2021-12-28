const { Comments } = require("../src/models");

const commentsData = [
  {
    comment: "Very nice!!",
    user_id: 1,
    post_id: 1,
  },
  {
    comment: "Amazing!!",
    user_id: 1,
    post_id: 2,
  },
  {
    comment: "Awesome!!",
    user_id: 2,
    post_id: 1,
  },
  {
    comment: "I really liked!!!!",
    user_id: 2,
    post_id: 3,
  },
  {
    comment: "Spectacular!!",
    user_id: 3,
    post_id: 3,
  },
  {
    comment: "Great Article!!",
    user_id: 3,
    post_id: 2,
  },
];

const seedComments = () => Comments.bulkCreate(commentsData);

module.exports = seedComments;
