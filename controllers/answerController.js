
//// IMPORTATION DES MODULES ////

const DB = require('../db')
const Answer = DB.Answer
const Quiz = DB.Quiz
const bcrypt = require('bcrypt')

//// LES DIFERRENTS ROUTAGES DE LA RESSOURCE ANSWER ////


// GET QUIZS //

module.exports.getAnswers = async(req,res) => {

    Answer.findAll()
    .then(answers => res.json({ data: answers }))
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }))}


// GET QUIZ //

exports.getAnswer = async (req, res) => {
    let answerId = parseInt(req.params.answer_id)

    // Vérification si le champ id est présent et cohérent
    if (!answerId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de l'utilisateur et vérification
        let answer = await Answer.findOne({ where: { answer_id: answerId }, attributes: ['answer_id','answer_value','answer_group'],include: {model: Quiz, attributes:['quiz_id','quiz_name']}})
        if (answer === null) {
            return res.status(404).json({ message: 'This answer does not exist !' })
        }

        return res.json({ data: quiz })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

// ADD ANSWER //

exports.addAnswer = async (req, res) => {
    const { answer_value, answer_group } = req.body

    // Validation des données reçues
    if (!answer_value || !answer_group) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si l'utilisateur existe déjà
        const answer = await Answer.findOne({ where: { answer_group: answer_group }, raw: true })
        if (answer !== null) {
            return res.status(409).json({ message: `The answer ${answer_group} already exists !`})
        }

        // Hashage du mot de passe utilisateur
        //let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        //req.body.password = hash

        // Céation de l'utilisateur
        let answerc = await Answer.create(req.body)
        return res.json({ message: 'Answer Created', data: answerc })
    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}



// UPDATE QUIZ //

exports.updateAnswer = async (req, res) => {
    let answerId = parseInt(req.params.answer_id)
    // Vérification si le champ id est présent et cohérent
    if (!answerId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    try{
        // Recherche de l'utilisateur et vérification
        let answer = await Answer.findOne({ where: {answer_id: answerId}, raw: true})
        if(answer === null){
            return res.status(404).json({ message: 'This answer does not exist !'})
        }

        // Mise à jour de l'utilisateur
        await Quiz.update(req.body, { where: {answer_id: answerId}})
        return res.json({ message: 'Answer Updated'})
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}


// DELETE QUIZ

exports.deleteAnswer =  (req, res) => {
    let answerId = parseInt(req.params.answer_id)

    // Vérification si le champ id est présent et cohérent
    if (!answerId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Answer.destroy({ where: {answer_id: answerId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}