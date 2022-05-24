const express = require('express')

const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const fs = require('fs')
const app = express()

app.set('view engine', 'ejs')

app.use(ejsLayouts)
app.use(methodOverride('_method'))
// allow non get post method from an html form
app.use(express.urlencoded({extended: false}))












app.get('/', (req, res)=> {
    res.render('home.ejs')
})








// controllers

app.use('/dinosaurs', require('./controllers/dinosaurs'))

app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))

app.listen(3000, () => {
    console.log('t')
})
