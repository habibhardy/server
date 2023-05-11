
//// IMPORTATION DES MODULES ////

const roleController = require('../controllers/roleController')
let router = require('express').Router()
const checkTokenMiddleware = require('../middlewares/checkingJwt')


//// ROUTAGE DE LA RESSOURCE USER ////

router.get('/roles',checkTokenMiddleware,roleController.getRoles)
router.get('/role/:code_role',checkTokenMiddleware,roleController.getRole)
router.post('/role',checkTokenMiddleware,roleController.addRole)
router.patch('/role/:code_role',checkTokenMiddleware,roleController.updateRole)
router.delete('/role/:code_role',checkTokenMiddleware,roleController.deleteRole)


module.exports = router