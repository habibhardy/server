
//// IMPORTATION DES MODULES ////

const DB = require('../db')
const Group = DB.Group
const Event = DB.Event
const bcrypt = require('bcrypt')

//// LES DIFERRENTS ROUTAGES DE LA RESSOURCE GROUP ////


// GET GROUPS //

module.exports.getGroups = async(req,res) => {

    Group.findAll()
    .then(groups => res.json({ data: groups }))
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }))}




// GET GROUPS BY ONE EVENT //

module.exports.getGroupsByEvent = async(req,res) => {

    let eventId = parseInt(req.params.event_id)

    Group.findAll({ where:{ event_id: eventId }})
    .then(groups => res.json({ data: groups }))
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }))}







    // GET GROUP //

exports.getGroup = async (req, res) => {
    let groupId = parseInt(req.params.group_id)

    // Vérification si le champ id est présent et cohérent
    if (!groupId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de l'utilisateur et vérification
        let group = await Group.findOne({ where: { group_id: groupId }, attributes: ['group_id','group_name','group_logo'],include: {model: Event, attributes:['event_id','event_name']}})
        if (group === null) {
            return res.status(404).json({ message: 'This group does not exist !' })
        }

        return res.json({ data: group })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}




// ADD GROUP //

exports.addGroup = async (req, res) => {
    const { group_name, group_companyname, group_logo, group_color,event_id } = req.body

    // Validation des données reçues
    if (!group_name || !group_companyname || !group_logo || !group_color || !event_id) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si l'utilisateur existe déjà
        const group = await Group.findOne({ where: { group_name: group_name }, raw: true })
        if (group !== null) {
            return res.status(409).json({ message: `The group ${group_name} already exists !`})
        }

        // Hashage du mot de passe utilisateur
        //let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        //req.body.password = hash

        // Céation de l'utilisateur
        let groupc = await Group.create(req.body)
        return res.json({ message: 'Group Created', data: groupc })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}



// UPDATE GROUP //

exports.updateGroup = async (req, res) => {
    let groupId = parseInt(req.params.group_id)

    // Vérification si le champ id est présent et cohérent
    if (!groupId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche de l'utilisateur et vérification
        let group = await Group.findOne({ where: {group_id: groupId}, raw: true})
        if(group === null){
            return res.status(404).json({ message: 'This group does not exist !'})
        }

        // Mise à jour de l'utilisateur
        await Group.update(req.body, { where: {group_id: groupId}})
        return res.json({ message: 'Group Updated'})
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}


// DELETE GROUP

exports.deleteGroup =  (req, res) => {
    let groupId = parseInt(req.params.group_id)

    // Vérification si le champ id est présent et cohérent
    if (!groupId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Group.destroy({ where: {group_id: groupId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}