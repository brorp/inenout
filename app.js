const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require("./routers/index");
const cors = require("cors")
if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(route)

// USER INTERFACE ROUTE
// auth
app.post('/login')
app.post('/register')
app.post('/forgot-password')
app.post('/reset-password/:userId/:token')
app.post('/verification/:userId/:token')

// articles
app.get('/articles')
app.get('/articles/:articleId')
app.get('/comments/:articleId')
app.post('/comments/:articleId')
app.patch('/like-comment/:commentId')
app.get('/subcategories')
app.post('/submit-articles')


// CMS ROUTE


app.listen(port, () => console.log(`App running.. port: ${port}`));