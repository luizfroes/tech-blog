const moment = require("moment");

const formatDate = (date) => {
  return moment(date).format("Do MMM, YYYY HH:mm");
};

module.exports = formatDate;
