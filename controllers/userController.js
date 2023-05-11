
//// IMPORTATION DES MODULES ////

const DB = require('../db')
const User = DB.User
const Role = DB.Role
const bcrypt = require('bcrypt')

//// LES DIFERRENTS ROUTAGES DE LA RESSOURCE USER ////


// GET USERS //

module.exports.getUsers = async(req,res) => {

    User.findAll()
    .then(users => res.json({ data: users }))
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }))

}

// GET USERS //

exports.getUser = async (req, res) => {
    let userId = parseInt(req.params.user_id)

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de l'utilisateur et vérification
        let user = await User.findOne({ where: { user_id: userId }, attributes: ['user_id','username','password'],include: {model: Role, attributes:['code_role','type']}})
        if (user === null) {
            return res.status(404).json({ message: 'This user does not exist !' })
        }

        return res.json({ data: user })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

// ADD USER //

exports.addUser = async (req, res) => {
    const { firstname, lastname, username, password } = req.body

    // Validation des données reçues
    if (!firstname || !lastname || !username || !password) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si l'utilisateur existe déjà
        const user = await User.findOne({ where: { username: username }, raw: true })
        if (user !== null) {
            return res.status(409).json({ message: `The user ${username} already exists !`})
        }

        // Hashage du mot de passe utilisateur
        //let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        //req.body.password = hash

        // Céation de l'utilisateur
        let userc = await User.create(req.body)
        return res.json({ message: 'User Created', data: userc })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}



// UPDATE USER //

exports.updateUser = async (req, res) => {
    let userId = parseInt(req.params.user_id)

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche de l'utilisateur et vérification
        let user = await User.findOne({ where: {user_id: userId}, raw: true})
        if(user === null){
            return res.status(404).json({ message: 'This user does not exist !'})
        }

        // Mise à jour de l'utilisateur
        await User.update(req.body, { where: {user_id: userId}})
        return res.json({ message: 'User Updated'})
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}


// DELETE USER

exports.deleteUser =  (req, res) => {
    let userId = parseInt(req.params.user_id)

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    User.destroy({ where: {user_id: userId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}