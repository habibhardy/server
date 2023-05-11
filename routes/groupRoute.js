
//// IMPORTATION DES MODULES ////

const groupController = require('../controllers/groupController')
let router = require('express').Router()
const checkTokenMiddleware = require('../middlewares/checkingJwt')


//// ROUTAGE DE LA RESSOURCE GROUP ////

router.get('/groups',groupController.getGroups)
router.get('/groups/:event_id',groupController.getGroupsByEvent)
router.get('/group/:group_id',checkTokenMiddleware,groupController.getGroup)
router.post('/group',groupController.addGroup)
router.put('/group/:group_id',groupController.updateGroup)
router.delete('/group/:group_id',checkTokenMiddleware,groupController.deleteGroup)

module.exports = router