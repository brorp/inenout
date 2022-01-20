if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const route = require("./routes/index");
const cors = require("cors")

app.use([
    cors(),
    express.json(),
    express.urlencoded({ extended: false })
  ]);
  
app.use(route)

module.exports = app;
