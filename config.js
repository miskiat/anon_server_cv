require("dotenv").config();

module.exports = {
  dbUri: process.env.DB_URL,
  tokenSecret: process.env.TOKEN_SECRET || "JINI98zn8m998",
  port: process.env.PORT || 4040,
};
