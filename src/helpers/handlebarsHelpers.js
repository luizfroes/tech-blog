const moment = require("moment");

module.exports = {
  formatDate: function (date) {
    return moment(date).format("Do MMM YY");
  },

  checkUserId: (userId, userSessionId) => userId == userSessionId,
};
