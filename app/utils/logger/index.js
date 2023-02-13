const Pino = require("pino");
const { APP_NAME, LOG_LEVEL } = require("../../constants");

const options = {
  name: APP_NAME,
  level: LOG_LEVEL,
  formatters: {
    level: (label) => ({ level: label }),
  },
};

const Logger = Pino(options);

module.exports = Logger;
