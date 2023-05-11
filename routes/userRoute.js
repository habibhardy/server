
//// IMPORTATION DES MODULES ////

const userController = require('../controllers/userController')
let router = require('express').Router()
const checkTokenMiddleware = require('../middlewares/checkingJwt')


//// ROUTAGE DE LA RESSOURCE USER ////

router.get('/users',userController.getUsers)
router.get('/user/:user_id',checkTokenMiddleware,userController.getUser)
router.post('/user',userController.addUser)
router.patch('/user/:user_id',checkTokenMiddleware,userController.updateUser)
router.delete('/user/:user_id',checkTokenMiddleware,userController.deleteUser)

module.exports = router