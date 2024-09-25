const express = require("express")
const router = express.Router()
const User = require('../models/Usuario')

router.get("/", (req,res) =>{
    res.send("Testando")
} )

router.post('/add', (req,res) =>{
    let{Nome,Email,Telefone, Password} = req.body

    User.create({
        Nome,Email,Telefone,Password
    }).then(() => res.redirect('/'))
    .catch(err =>{
        console.log(`Ocorreu um erro ${err}`)
    })
})


module.exports = router