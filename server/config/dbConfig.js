require("dotenv").config();
const mongoose = require("mongoose");
// console.log(process.env);

const port = process.env.PORT || 8000;
const DB = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);

mongoose.connect(DB, {}).then((con) => {
  console.log("DB Connection successful!");
});