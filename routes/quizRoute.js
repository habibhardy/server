
//// IMPORTATION DES MODULES ////

const quizController = require('../controllers/quizController')
let router = require('express').Router()
const checkTokenMiddleware = require('../middlewares/checkingJwt')


//// ROUTAGE DE LA RESSOURCE GROUP ////

router.get('/quizs',checkTokenMiddleware,quizController.getQuizs)
router.get('/quiz/:quiz_id',checkTokenMiddleware,quizController.getQuiz)
router.post('/quiz',checkTokenMiddleware,quizController.addQuiz)
router.patch('/quiz/:quiz_id',checkTokenMiddleware,quizController.updateQuiz)
router.delete('/quiz/:quiz_id',checkTokenMiddleware,quizController.deleteQuiz)

module.exports = router