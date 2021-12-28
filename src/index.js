require("dotenv").config();

const { logInfo, logError } = require("./helpers/logger");

const path = require("path");

const express = require("express");

const routes = require("./routes");
const connection = require("../config/connection");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
const init = async () => {
  try {
    await connection.sync({ force: false });
    logInfo("DB connection", "Success");

    app.listen(PORT, () =>
      logInfo("Server connection", `http://localhost:${PORT}`)
    );
  } catch (error) {
    logError("DB connection", error.message);
  }
};

init();
