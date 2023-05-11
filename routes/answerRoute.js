
//// IMPORTATION DES MODULES ////

const answerController = require('../controllers/answerController')
let router = require('express').Router()
const checkTokenMiddleware = require('../middlewares/checkingJwt')


//// ROUTAGE DE LA RESSOURCE ANSWER ////

router.get('/answers',checkTokenMiddleware,answerController.getAnswers)
router.get('/answer/:answer_id',checkTokenMiddleware,answerController.getAnswer)
router.post('/answer',checkTokenMiddleware,answerController.addAnswer)
router.patch('/answer/:answer_id',checkTokenMiddleware,answerController.updateAnswer)
router.delete('/answer/:answer_id',checkTokenMiddleware,answerController.deleteAnswer)

module.exports = router