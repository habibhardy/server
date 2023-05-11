//// IMPORTATION DES MODULES ////

const authenticationController = require('../controllers/authenticationController')
let router = require('express').Router()

//// ROUTAGE DE LA RESSOURCE AUTHENTICATION ////

router.post('/login',authenticationController.login)

module.exports = router