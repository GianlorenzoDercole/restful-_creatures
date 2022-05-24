const express = require('express')

const router = express.Router()

const fs = require('fs')



router.get('/', (req, res) => {
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(prehistoric_creatures)

    let nameFilter = req.query.nameFilter
    if (nameFilter) {
        creatureData = creatureData.filter(creature => creature.type===nameFilter)
    }
    res.render('prehistoric_creatures/index.ejs', {myCreatures: creatureData})
})
// new dino form route
router.get('/new', (req, res) => {
    res.render('prehistoric_creatures/new.ejs')
})

// Show Route (a specific dinosuar)
router.get('/:id', (req, res) => {
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(prehistoric_creatures)
    // indentify the index of th dino in question
    let creatureIndex = req.params.id
    console.log(`the dino is ${creatureIndex}`)
    // isolate the dino in question
    console.log(creatureData[creatureIndex])
    res.render('prehistoric_creatures/show.ejs', {myCreatures: creatureData[creatureIndex]})
})
// post a new dino
router.post('/', (req, res) => {
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(prehistoric_creatures)
    // add to the array
    creatureData.push(req.body)

    // save the dinosaurs to the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    // redirect to the index route
    res.redirect('/prehistoric_creatures')
})



// get /dinosaurs/edit/:id -- a view of a form to edit a specifir dino @ id
router.get('/edit/:id', (req, res) => {
    //res.send(`show an edit form a dino @ ${req.params.id}`)
    // get the dino data render it
    const prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(prehistoric_creatures)
    res.render('prehistoric_creatures/edit.ejs', {
        creatureId: req.params.id,
        creature: creatureData[req.params.id]
    })
})
// put .dinosaurs/:id -- update dino @ :id in the database
router.put('/:id' , (req, res) => {

    // get the dinos from dino json
    const prehistoric_creatures= fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(prehistoric_creatures)
    console.log(req.params.id, req.body)
    // update the dino based on the req.params.id and the req.body
    //req.params = which dino
    // req.body = dino data to updated
    creatureData[req.params.id].name = req.body.name
    creatureData[req.params.id].type = req.body.type
    // write the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    //redirecr to some place that has interesting data
    res.redirect('/prehistoric_creatures')
    //res.send(`update a dino @ ${req.params.id}`)
})
// delete /dinosaurs/:id -- destroy a dino @ :id
router.delete('/:id' , (req, res) => {
//get the dinos from the dino json
const prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
const creatureData = JSON.parse(prehistoric_creatures)
//splice dino out of the array (index from the req.params)
creatureData.splice(req.params.id, 1)
//save the dino json
fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
//redirect to see all dinos

//res.send(`destroy a dino @ ${req.params.id}`)
res.redirect(`/prehistoric_creatures`)
})

module.exports = router
