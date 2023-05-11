
//// IMPORTATION DES MODULES ////

const DB = require('../db')
const User = DB.User
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//// LES DIFERRENTS ROUTAGES DE LA RESSOURCE ANSWER ////


// AUTHENTIFICATION ET CREATION DU TOKEN //

module.exports.login = async(req,res) => {

    const { username, password } = req.body

    // VERIFICATION DES DONNEES ENTREES
    if(!username || !password){
        return res.json({
             message: 'Bad email or password',
             status:400
            })
    }

    try{
        // VERIFICATION SI L'UTILISATEUR EXISTE

        let user = await User.findOne({ where: {username: username}, raw: true})
        if(user === null){
            return res.json({ 
                message: 'This account does not exists !',
                status:401
                                                })
        }

        // VERIFICATION DU MOT DE PASSE
         
        let test = await User.checkPassword(password, user.password)
        if(!test){
            return res.json({ 
                message: 'Wrong password',
                status:401
        })
        }

        // GENERATION DU TOKEN
        const token = jwt.sign({
            id: user.user_id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
        }, "lkzndckbjl89HIU%¨µ_çèé", { expiresIn: 2*60}) // Expire dans 1 minute
        
        return res.json({
            access_token: token,
            status:200
        })
    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Login process failed', error: err})        
    }

}