const express = require('express')
const mongoose = require('mongoose')
const Reviews = require('./models/reviews')
const reviewsRouter = require('./routes/reviews')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb+srv://madeline:madeline123@cluster0.xcx8u.mongodb.net/reviews?retryWrites=true&w=majority', { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const reviews = await Reviews.find().sort({created: 'desc'})
    res.render('reviews/home', {reviews: reviews})
})

app.use('/reviews', reviewsRouter)

app.listen(5000)