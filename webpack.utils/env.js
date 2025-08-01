const dotenv = require("dotenv");
const path = require("path");

module.exports = function getDefineEnv(mode = "development", env) {
  const envPath = mode ? ".env.production" : ".env";
  const defineEnv = {
    "process.env.NODE_ENV": JSON.stringify(mode),
    ...Object.entries(env).reduce((acc, [key, val]) => {
      acc[`process.env.${key}`] = JSON.stringify(val);
      return acc;
    }, {}),
  };

  return defineEnv;
};
