const { logInfo, logError } = require("./helpers/logger");

require("dotenv").config();

const express = require("express");
const session = require("express-session");
const expressHandlebars = require("express-handlebars");
const path = require("path");
const sequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./routes");
const connection = require("../config/connection");

const PORT = process.env.PORT || 3000;

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 86400 * 1000,
  },
  resave: false,
  saveUninitialized: false,
  store: new sequelizeStore({
    db: connection,
  }),
};

const hbs = expressHandlebars.create({});
const app = express();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(session(sessionOptions));
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
