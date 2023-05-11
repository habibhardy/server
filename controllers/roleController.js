
//// IMPORTATION DES MODULES ////

const DB = require('../db')
const Role = DB.Role
const bcrypt = require('bcrypt')

//// LES DIFERRENTS ROUTAGES DE LA RESSOURCE USER ////


// GET ROLES //

exports.getRoles = (req, res) => {
    Role.findAll({paranoid: false})
        .then(role => res.json({ data: role }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

// GET Role //

exports.getRole = async (req, res) => {
    let roleId = parseInt(req.params.code_role)

    // Vérification si le champ id est présent et cohérent
    if (!roleId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de l'utilisateur et vérification
        let role = await Role.findOne({ where: { code_role: roleId }, attributes: ['code_role','type']})
        if (role === null) {
            return res.status(404).json({ message: 'This user does not exist !' })
        }

        return res.json({ data: role })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

// ADD ROLE //

exports.addRole = async (req, res) => {
    const { type } = req.body

    // Validation des données reçues
    if (!type) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si l'utilisateur existe déjà
        const role = await Role.findOne({ where: { type: type }, raw: true })
        if (role !== null) {
            return res.status(409).json({ message: `The role ${type} already exists !`})
        }

        // Hashage du mot de passe utilisateur
        //let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        //req.body.password = hash

        // Céation de l'utilisateur
        let rolec = await Role.create(req.body)
        return res.json({ message: 'Role Created', data: rolec })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}



// UPDATE ROLE //

exports.updateRole = async (req, res) => {
    let roleId = parseInt(req.params.code_role)

    // Vérification si le champ id est présent et cohérent
    if (!roleId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche de l'utilisateur et vérification
        let role = await Role.findOne({ where: {code_role: roleId}, raw: true})
        if(role === null){
            return res.status(404).json({ message: 'This user does not exist !'})
        }

        // Mise à jour de l'utilisateur
        await Role.update(req.body, { where: {code_role: roleId}})
        return res.json({ message: 'Role Updated'})
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}



// DELETE ROLE

exports.deleteRole =  (req, res) => {
    let roleId = parseInt(req.params.code_role)

    // Vérification si le champ id est présent et cohérent
    if (!roleId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Role.destroy({ where: {code_role: roleId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}
