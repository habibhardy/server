
//// IMPORTATION DES MODULES ////

const DB = require('../db')
const Event = DB.Event
const bcrypt = require('bcrypt')
const fs = require('fs')

const multer = require('multer')

const path = require('path')


//// LES DIFERRENTS ROUTAGES DE LA RESSOURCE EVENT ////


// GET EVENTS //

module.exports.getEvents = async(req,res) => {

    Event.findAll()
    .then(events => res.json({ data: events,status:200 }))
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }))

}

// GET EVENT //

exports.getEvent = async (req, res) => {
    let eventId = parseInt(req.params.event_id)

    // Vérification si le champ id est présent et cohérent
    if (!eventId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de l'utilisateur et vérification
        let event = await Event.findOne({ where: { event_id: eventId }, attributes: ['event_id','event_name','event_parainage','event_image']})
        if (event === null) {
            return res.status(404).json({ message: 'This event does not exist !' })
        }

        return res.json({ data: event })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

// ADD EVENT //

exports.addEvent = async (req, res) => {
    const { event_name,
           event_place,
           event_parainage,
           event_praticalinfos,
           event_gamespirits,
           event_rolesgame,
           event_timeinterval,
           event_date,
           event_image
     } = req.body



    const dataEvent = JSON.stringify({
          "event_name":req.body.event_name,
          "event_place":req.body.event_place,
          "event_parainage":req.body.event_parainage,
          "event_praticalinfos":req.body.event_praticalinfos,
          "event_gamespirits":req.body.event_gamespirits,
          "event_rolesgame":req.body.event_rolesgame,
          "event_timeinterval":req.body.event_timeinterval,
          "event_date":req.body.event_date,
          "event_image":req.file,
         
        })

    // Validation des données reçues
    if (!event_name || !event_place || !event_parainage || !event_praticalinfos
        || !event_gamespirits || !event_rolesgame || !event_timeinterval || !event_date || !event_image ) {
        return res.json({ message: 'Missing Data',status:400 })
    }

    try{
        // Vérification si l'utilisateur existe déjà
        const event = await Event.findOne({ where: { event_name: event_name }, raw: true })
        if (event !== null) {
             res.status(409).json({ message: `The event ${event_name} already exists !`,status:409 })
             return;
        }

        // Hashage du mot de passe utilisateur
        //let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        //req.body.password = hash

        // Céation de l'utilisateur
        let eventc = await Event.create(req.body)
        return res.json({ message: 'Event Created', data: eventc,status:200 })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
            return;
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})  
        return;      
    }
}



// UPDATE EVENT //

exports.updateEvent = async (req, res) => {
    let eventId = parseInt(req.params.event_id)

    // Vérification si le champ id est présent et cohérent
    if (!eventId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche de l'utilisateur et vérification
        let event = await Event.findOne({ where: {event_id: eventId}, raw: true})
        if(event === null){
            return res.status(404).json({ message: 'This event does not exist !'})
        }
event
        // Mise à jour de l'utilisateur
        await Event.update(req.body, { where: {event_id: eventId}})
        return res.json({ message: 'Event Updated'})
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}


// DELETE EVENT

exports.deleteEvent =  (req, res) => {
    let eventId = parseInt(req.params.event_id)

    // Vérification si le champ id est présent et cohérent
    if (!eventId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Event.destroy({ where: {event_id: eventId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}