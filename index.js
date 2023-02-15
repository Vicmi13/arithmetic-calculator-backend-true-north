const express = require("express");
require("dotenv").config();
const cors = require("cors");
const Logger = require("./app/utils/logger");
const compression = require("compression");
const helmet = require("helmet");
const sequelizeConnection = require("./config/sequelize");
const { onErrorListener } = require("./app/utils/helpers");
const { URL_BASE_BACKEND } = require("./app/constants");
const UserRoutes = require("./app/routes/user");
const AuthRoutes = require("./app/routes/auth");
const OperationRoutes = require("./app/routes/operation");
const RecorRoutess = require("./app/routes/record");

const app = express();

app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());

console.log(`Database host ${process.env.DB_HOST}`);

sequelizeConnection
  .authenticate()
  .then(() => console.log(`Database connected ${process.env.DB_HOST}`))
  .catch((err) => console.log(`Error connection ${err}`));

app.get("/", (_, res) => {
  res.status(200).json({
    message: "health checK API trio  🚀",
  });
});

app.use(`${URL_BASE_BACKEND}/user`, UserRoutes);
app.use(`${URL_BASE_BACKEND}/login`, AuthRoutes);
app.use(`${URL_BASE_BACKEND}/operation`, OperationRoutes);
app.use(`${URL_BASE_BACKEND}/record`, RecorRoutess);
// app.use(`${BASE_URL_BACKEND}/records`, mailChimpRouter);

app.listen(process.env.PORT || 3000, () => {
  Logger.info(`Server running in port ${process.env.PORT || 3000}`);
});
app.on("error", onErrorListener);
