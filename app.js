const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require("./routers/index");
const cors = require("cors")
if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}
const AuthController = require('./controllers/web/auth')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(route)

// USER INTERFACE ROUTE
// auth
app.post('/login', AuthController.userLogin)
app.post('/register', AuthController.registerUser)
app.post('/verification/:id/:token', AuthController.verifyUser)
app.post('/forgot-password', AuthController.forgotPassword)
app.post('/reset-password/:userId/:token', AuthController.resetPassword)

// articles
app.get('/articles')
app.get('/articles/:articleId')
app.get('/comments/:articleId')
app.post('/comments/:articleId')
app.patch('/like/:commentId')
app.get('/subcategories')
app.post('/submit')
app.get('/profile')
app.post('/profile')
app.post('/change-password')
app.patch('/subscribe')


// CMS ROUTE


app.listen(port, () => console.log(`App running.. port: ${port}`));