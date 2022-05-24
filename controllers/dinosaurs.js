const express = require('express')

const router = express.Router()

const fs = require('fs')
// Index Route
router.get('/', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    let nameFilter = req.query.nameFilter
    if (nameFilter) {
        dinoData = dinoData.filter(dino => dino.name.toLowerCase()===nameFilter.toLowerCase())
    }
    res.render('dinosaurs/index.ejs', {myDinos: dinoData})
})
// new dino form route
router.get('/new', (req, res) => {
    res.render('dinosaurs/new.ejs')
})

// Show Route (a specific dinosuar)
router.get('/:id', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // indentify the index of th dino in question
    let dinoIndex = req.params.id
    console.log(`the dino is ${dinoIndex}`)
    // isolate the dino in question
    console.log(dinoData[dinoIndex])
    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})
// post a new dino
router.post('/', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // add to the array
    dinoData.push(req.body)

    // save the dinosaurs to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to the index route
    res.redirect('/dinosaurs')
})


// get /dinosaurs/edit/:id -- a view of a form to edit a specifir dino @ id
    router.get('/edit/:id', (req, res) => {
        //res.send(`show an edit form a dino @ ${req.params.id}`)
        // get the dino data render it
        const dinosaurs = fs.readFileSync('./dinosaurs.json')
        const dinoData = JSON.parse(dinosaurs)
        res.render('dinosaurs/edit.ejs', {
            dinoId: req.params.id,
            dino: dinoData[req.params.id]
        })
    })
// put .dinosaurs/:id -- update dino @ :id in the database
    router.put('/:id' , (req, res) => {

        // get the dinos from dino json
        const dinosaurs = fs.readFileSync('./dinosaurs.json')
        const dinoData = JSON.parse(dinosaurs)
        console.log(req.params.id, req.body)
        // update the dino based on the req.params.id and the req.body
        //req.params = which dino
        // req.body = dino data to updated
        dinoData[req.params.id].name = req.body.name
        dinoData[req.params.id].type = req.body.type
        // write the json file
        fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
        //redirecr to some place that has interesting data
        res.redirect('/dinosaurs')
        //res.send(`update a dino @ ${req.params.id}`)
    })
// delete /dinosaurs/:id -- destroy a dino @ :id
router.delete('/:id' , (req, res) => {
    //get the dinos from the dino json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    //splice dino out of the array (index from the req.params)
    dinoData.splice(req.params.id, 1)
    //save the dino json
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    //redirect to see all dinos

    //res.send(`destroy a dino @ ${req.params.id}`)
    res.redirect(`/dinosaurs`)
})

module.exports = router
