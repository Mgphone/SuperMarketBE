const mongoose = require("mongoose");
const connection = process.env.MONGO_URL;
const databaseConnect = mongoose
  .connect(connection)
  .then(() => console.log("Database is connected"))
  .catch((errors) => console.error("Can not connect to database", errors));

module.exports = databaseConnect;
