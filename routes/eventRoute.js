
//// IMPORTATION DES MODULES ////

const eventController = require('../controllers/eventController')
let router = require('express').Router()
const checkTokenMiddleware = require('../middlewares/checkingJwt')
const bodyParser = require('body-parser')






//// ROUTAGE DE LA RESSOURCE USER ////

router.use(bodyParser.json({
    parameterLimit: 100000,
    limit: '50mb'
  }))

router.get('/events',eventController.getEvents)
router.get('/event/:event_id',eventController.getEvent)
router.post('/event',eventController.addEvent)
router.put('/event/:event_id',eventController.updateEvent)
router.delete('/event/:event_id',eventController.deleteEvent)

module.exports = router