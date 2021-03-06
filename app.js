// require = require("esm")(module/*, options*/)
if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const route = require("./routes/index");
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
  
app.use(route)

const { connect } = require('./config/redis');

connect().then(async () => {
  app.listen(port, () => console.log(`Listen on http://localhost:${port}`));
});

// module.exports = app;
